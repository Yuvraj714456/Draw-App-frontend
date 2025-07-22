import { useEffect, useState } from 'react';
// MODIFIED: Replaced lucide-react with react-icons
import { IoCopyOutline, IoClose } from 'react-icons/io5';

const ShareModal = ({setShareModal,roomId}) => {
    const [isCopied, setIsCopied] = useState(false);
    const shareUrl = `${window.location.origin}/draw/${roomId}`;

    const handleCopy = () => {
        // Use the Clipboard API to copy the text
        navigator.clipboard.writeText(shareUrl).then(() => {
            setIsCopied(true);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };
     
    const onClose = ()=>{
        setShareModal(false);
    } 

    return (
        // Modal Overlay
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
            onClick={onClose} // Close modal when clicking the overlay
        >
            {/* Modal Content */}
            <div 
                className="relative bg-[#2D2D3A] text-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    {/* MODIFIED: Replaced X with IoClose */}
                    <IoClose size={24} />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold mb-2 text-center">Share this board</h2>
                <p className="text-gray-400 mb-6 text-center">Anyone with the link can view and edit.</p>

                {/* Share Link Input */}
                <div className="flex items-center space-x-2 bg-[#1E1E28] p-3 rounded-lg border border-gray-600">
                    <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="flex-grow bg-transparent text-gray-300 outline-none truncate"
                    />
                    <button
                        onClick={handleCopy}
                        className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center justify-center transition-all duration-200 ${
                            isCopied 
                            ? 'bg-green-600' 
                            : 'bg-[#6a6499] hover:bg-[#5a5489]'
                        }`}
                    >
                        {/* MODIFIED: Replaced Copy with IoCopyOutline */}
                        <IoCopyOutline size={16} className={`mr-2 ${isCopied ? 'hidden' : 'inline-block'}`} />
                        {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
