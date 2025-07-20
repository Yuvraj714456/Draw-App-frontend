import { CHAT } from '../constant/events';
import { addShape, setShapes } from '../redux/reducers/misc';
import { getShapesFromDB } from '../utils/getShapesFromDB';

const initDraw= async (canvas,socket,getSelectedTool)=>{
          const roomId = localStorage.getItem("roomId");
          const ctx = canvas.getContext("2d");

          if(!ctx) return;
          ctx.fillStyle = 'rgba(0,0,0)';
          ctx.fillRect(0,0,canvas.width,canvas.height);

          const shapesFromDB =await getShapesFromDB(roomId);
          
          const Shapes=[...shapesFromDB];

          let clicked = false;
          let startX=0;
          let startY=0;
          let currentTool = "pointer";

          canvas.addEventListener("mousedown",(e)=>{
               clicked =true;
               startX=e.offsetX;
               startY=e.offsetY;
               currentTool = getSelectedTool()();
          })

          canvas.addEventListener("mouseup",(e)=>{
               clicked=false;

               let width = e.offsetX-startX;
               let height= e.offsetY-startY;

               let newShape = {type:currentTool,x:startX,y:startY,width:width,height:height};

               if(height || width){
                    if(currentTool==="line")
                         newShape = {type:"line",x:startX,y:startY,endX:e.offsetX,endY:e.offsetY};
                    Shapes.push(newShape);
                    drawShape(Shapes,canvas,ctx);
                    socket.emit(CHAT,{roomId,content:newShape});
               }

          })

          canvas.addEventListener("mousemove",(e)=>{
                if(clicked){
                    let width = e.offsetX-startX;
                    let height= e.offsetY-startY;
                    
                    // handleCircle(startX,startY,width,height,ctx,);
                    // clearCanvas(canvas,ctx);
                    drawShape(Shapes,canvas,ctx)
                    if(currentTool ==="circle"){
                         handleCircle(startX,startY,width,height,ctx);
                    }else if(currentTool === "line"){
                         handleLine(startX,startY,e.offsetX,e.offsetY,ctx);
                    }else if(currentTool==="rectangle"){
                         ctx.strokeRect(startX,startY,width,height);
                    }else if(currentTool === "pointer"){
                         ctx.strokeRect(startX,startY,height,width)
                    }
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
     clearCanvas(canvas,ctx);


     ctx.strokeStyle="rgba(255,255,255)"
     for(const shape of shapes){
          if(shape.type==="circle"){
               handleCircle(shape.x,shape.y,shape.width,shape.height,ctx);
          }else if(shape.type === "line"){
               handleLine(shape.x,shape.y,shape.endX,shape.endY,ctx);
          }else if(shape.type==="rectangle"){
               ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
          }
     }
}


const handleCircle = (startX,startY,width,height,ctx)=>{
     const heightCenter = startY+height/2;
     const widthCenter = startX+width/2;
     const radius = Math.sqrt(width*width + height*height)/2;

     ctx.beginPath();
     ctx.arc(widthCenter,heightCenter,radius,0,Math.PI*2);
     ctx.stroke();
     ctx.closePath();
}


const handleLine = (startX,startY,endPointX,endPointY,ctx)=>{
     ctx.beginPath();
     ctx.moveTo(startX,startY);
     ctx.lineTo(endPointX,endPointY);
     ctx.stroke();
     ctx.closePath();
}

const clearCanvas =(canvas,ctx)=>{
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.fillStyle = "rgba(0,0,0)";
     ctx.fillRect(0, 0, canvas.width, canvas.height);
}    

export { initDraw };



