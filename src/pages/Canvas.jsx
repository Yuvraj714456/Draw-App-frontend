import { useEffect, useRef, useState } from 'react';
import { BiPointer } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { PiRectangleLight } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { CHAT, JOIN_ROOM, LEAVE_ROOM } from '../constant/events';
import { initDraw } from '../Draw/Draw';
import { useSocket } from '../socket';



const CanvasComponent = () => {
    const canvasRef=useRef(null);
    const drawInstanceRef = useRef(null);
    const getToolRef = useRef(() => "pointer");

    const roomId = localStorage.getItem("roomId");
    const socket = useSocket();
    const [selectedTool,setSelectedTool] = useState("pointer");
    const dispatch=useDispatch();

    useEffect(() => {
      getToolRef.current = () => selectedTool;
    }, [selectedTool]);


    useEffect(()=>{
      if(canvasRef.current){
        socket.emit(JOIN_ROOM,roomId);

        initDraw(
              canvasRef.current,
              socket,
              ()=>getToolRef.current,
              setSelectedTool
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
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-6 bg-[#232329] px-4 py-2 rounded-md z-10 text-white items-center">
                <div
                  onClick={() => setSelectedTool("pointer")}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl relative ${
                    selectedTool === "pointer" ? "bg-[#6a6499]" : "hover:bg-white/10"
                  }`}
                >
                  <BiPointer size={20} />
                </div>

                {/* Rectangle Tool */}
                <div
                  onClick={() => setSelectedTool("rectangle")}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl relative ${
                    selectedTool === "rectangle" ? "bg-[#6a6499]" : "hover:bg-white/10"
                  }`}
                >
                  <PiRectangleLight size={20} />
                </div>

                {/* Circle Tool */}
                <div
                  onClick={() => setSelectedTool("circle")}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl relative ${
                    selectedTool === "circle" ? "bg-[#6a6499]" : "hover:bg-white/10"
                  }`}
                >
                  <FaRegCircle size={18} />
                </div>
                <div 
                    onClick={() => setSelectedTool("line")}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl relative ${
                        selectedTool === "line" ? "bg-[#6a6499]" : "hover:bg-white/10"
                      }`}
                    >
                    <div
                        className={`w-6 h-0.5 bg-white cursor-pointer rounded-sm ${selectedTool ? 'bg-blue-500' : 'bg-gray-500'}`}
                      />
                </div>
          </div>
    </div>
  )
}

export default CanvasComponent