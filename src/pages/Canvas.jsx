import { useEffect, useRef, useState } from 'react';
import { BiPointer } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { PiRectangleLight } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { CHAT, JOIN_ROOM, LEAVE_ROOM } from '../constant/events';
import { initDraw } from '../Draw/Draw';
import { useExistingShapes } from '../hooks/hooks';
import { useSocket } from '../socket';
import { setShapes } from '../redux/reducers/misc';
import store from '../redux/store'



const CanvasComponent = () => {
    const canvasRef=useRef(null);
    const drawInstanceRef = useRef(null);
    const getToolRef = useRef(() => "pointer");

    const roomId = localStorage.getItem("roomId");
    const socket = useSocket();
    const [selected,setSelected] = useState("pointer");
    const dispatch=useDispatch();

    useEffect(() => {
      getToolRef.current = () => selected;
    }, [selected]);


    useEffect(()=>{
      if(canvasRef.current){
        socket.emit(JOIN_ROOM,roomId);

        initDraw(
              canvasRef.current,
              socket,
              ()=>getToolRef.current,
            ).then((drawer)=>
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
    },[canvasRef,socket]);

  
  return (
    <div className='relative w-screen h-screen overflow-hidden'>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight } className='border-gray-300 z-0'/>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4 bg-black/50 px-4 py-2 rounded-md z-10 text-white">
                <BiPointer size={20} onClick={()=>setSelected("pointer")} />
                <PiRectangleLight size={20} onClick={()=>setSelected("rectangle")}/>
                <FaRegCircle size={20} onClick={()=>setSelected("circle")}/>
                <MdArrowOutward size={20} onClick={()=>setSelected("line")}/>
          </div>
    </div>
  )
}

export default CanvasComponent