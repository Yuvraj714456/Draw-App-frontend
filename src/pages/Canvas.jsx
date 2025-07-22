import { useEffect, useRef, useState } from 'react';
import { BiPointer } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa6";
import { PiRectangleLight } from "react-icons/pi";
import { SlPencil } from "react-icons/sl";
import { CHAT, JOIN_ROOM, LEAVE_ROOM } from '../constant/events';
import { initDraw } from '../Draw/Draw';
import { useSocket } from '../socket';
import ShareModal from '../component/roomShareModel';

const CanvasComponent = () => {
    const canvasRef = useRef(null);
    const drawInstanceRef = useRef(null);
    const getToolRef = useRef(() => "pointer");
    const [shareModal,setShareModal] = useState(false);

    const roomId = localStorage.getItem("roomId");
    const socket = useSocket();
    const [selectedTool, setSelectedTool] = useState("pointer");


    useEffect(() => {
      getToolRef.current = () => selectedTool;
    }, [selectedTool]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !socket) return;
        
        const handleResize = () => {
           
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            
            
            if (drawInstanceRef.current) {
                drawInstanceRef.current.draw();
            }
        };

        window.addEventListener('resize', handleResize);

        socket.emit(JOIN_ROOM, roomId);

        initDraw(
            canvas,
            socket,
            () => getToolRef.current,
            setSelectedTool
        ).then((drawer) => {
            drawInstanceRef.current = drawer;
            handleResize();
        });
        
        const onNewShape = (({ content }) => {
            try {
                if (drawInstanceRef.current) {
                    drawInstanceRef.current.addShape(content);
                }
            } catch (error) {
                console.log("Failed to parse shape", content);
            }
        });

        socket.on(CHAT, onNewShape);

        return () => {
            window.removeEventListener('resize', handleResize);
            socket.emit(LEAVE_ROOM, roomId);
            socket.off(CHAT, onNewShape);
        };
    }, [socket, roomId]);

    return (
        <div className='relative w-screen h-screen overflow-hidden  bg-[#232329]'>
            <canvas ref={canvasRef} className='w-full h-full z-0'/>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-6 bg-[#232329] px-4 py-2 rounded-md z-10 text-white items-center">
                <div
                    onClick={() => setSelectedTool("pointer")}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl relative ${
                        selectedTool === "pointer" ? "bg-[#6a6499]" : "hover:bg-white/10"
                    }`}
                >
                    <BiPointer size={20} />
                </div>

                <div
                    onClick={() => setSelectedTool("rectangle")}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl relative ${
                        selectedTool === "rectangle" ? "bg-[#6a6499]" : "hover:bg-white/10"
                    }`}
                >
                    <PiRectangleLight size={20} />
                </div>

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
                        className="w-6 h-0.5 bg-white"
                    />
                </div>

                <div
                    onClick={() => setSelectedTool("pencil")}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl relative ${
                        selectedTool === "pencil" ? "bg-[#6a6499]" : "hover:bg-white/10"
                    }`}
                >
                    <SlPencil size={18} />
                </div>
            </div>

            <div className='absolute right-0 mr-20 top-6 rounded-md px-4 py-2.5 bg-[#6a6499] hover:bg-[#5a5489] text-white' onClick={()=>setShareModal(true)}>
                Share 
                {shareModal &&<ShareModal setShareModal={setShareModal} roomId={roomId}/>}
            </div>
        </div>
    );
};

export default CanvasComponent;
