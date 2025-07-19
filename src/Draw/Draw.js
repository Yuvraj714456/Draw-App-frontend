import { CHAT } from '../constant/events';

const initDraw= async (canvas,shapes,socket)=>{
          const roomId = localStorage.getItem("roomId");
     
          const ctx = canvas.getContext("2d");

          ctx.fillStyle = 'rgba(0,0,0)';
          ctx.fillRect(0,0,canvas.width,canvas.height);

          if(!ctx) return;

          let clicked = false;
          

          let startX=0;
          let startY=0;

          const Shapes =[...shapes];


          canvas.addEventListener("mousedown",(e)=>{
                clicked =true;
                startX=e.clientX;
                startY=e.clientY;
          })

          canvas.addEventListener("mouseup",(e)=>{
                clicked=false;

               let width = e.clientX-startX;
               let height= e.clientY-startY;

               const newShape = {x:startX,y:startY,width:width,height:height};

               if(height || width){
                    Shapes.push(newShape);
                    drawShape(Shapes,canvas,ctx);
                    socket.emit(CHAT,{roomId,content:newShape});
               }
          })

          canvas.addEventListener("mousemove",(e)=>{
                if(clicked){
                    let width = e.clientX-startX;
                    let height= e.clientY-startY;
                    
                    drawShape(Shapes,canvas,ctx);
                    ctx.strokeStyle = "rgba(255,255,255)"
                    ctx.strokeRect(startX,startY,width,height);
                }
          })

          drawShape(Shapes,canvas,ctx);
          return {
               addShape:(shape)=>{
                    Shapes.push(shape);
                    drawShape(Shapes,canvas,ctx);
               }
          }    
}


const drawShape =(shapes,canvas,ctx)=>{
     ctx.clearRect(0,0,canvas.width,canvas.height);
     ctx.fillStyle= "rgba(0,0,0)"
     ctx.fillRect(0,0,canvas.width,canvas.height);


     for(const shape of shapes){
          ctx.strokeStyle="rgba(255,255,255)"
          ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
     }
}



export { initDraw };



