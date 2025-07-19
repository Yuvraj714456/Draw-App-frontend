import { useEffect, useRef } from 'react';
import { CHAT, JOIN_ROOM, LEAVE_ROOM } from '../constant/events';
import { initDraw } from '../Draw/Draw';
import { useExistingShapes } from '../hooks/hooks';
import { useSocket } from '../socket';



const CanvasComponent = () => {
    const canvasRef=useRef(null);
    const roomId = localStorage.getItem("roomId");
    const socket = useSocket();
    const drawInstanceRef = useRef(null);

    const {shapes=[],isLoading}= useExistingShapes(roomId);
    useEffect(()=>{
      if(canvasRef.current&& !isLoading){
        socket.emit(JOIN_ROOM,roomId);
        initDraw(canvasRef.current,shapes,socket).then((drawer)=>
            drawInstanceRef.current=drawer);
        
        const onNewShape = (({content})=>{
            try {
              drawInstanceRef.current.addShape(content);
            } catch (error) {
              console.log("Failed to parse shape",content);
            }
        })

        socket.on(CHAT,onNewShape);

        return ()=>{
          socket.emit(LEAVE_ROOM,roomId);
          socket.off(CHAT,onNewShape);
        }
      }
    },[canvasRef,isLoading,shapes,socket]);

  return (
    <div>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight } className='border-gray-300'/>
    </div>
  )
}

export default CanvasComponent