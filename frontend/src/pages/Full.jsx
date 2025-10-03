import React, { useState, useRef, useEffect } from 'react';
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { BsMicMuteFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsFillCameraVideoOffFill } from "react-icons/bs";
import { IoPlaySkipForward } from "react-icons/io5";
import { MdOutlineCallEnd } from "react-icons/md";
import { MdOutlineFullscreen } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';

function Full({ localStream, remoteStream, chatMessages, chatInput, setChatInput, sendMessage, handleSkip, endCall, toggleCamera, toggleMic, isCameraOn, isMicOn }) {
    const navigate = useNavigate();


    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const containerRef = useRef(null);

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [zoom, setZoom] = useState("");
    const [isConnecting, setIsConnecting] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [emojiPicker, setEmojiPicker] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState("Connecting...");

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev);
    };


    // Fix camera toggle issue - ensure video stream is properly attached
    useEffect(() => {
        if (videoRef1.current && localStream) {
            videoRef1.current.srcObject = isCameraOn ? localStream : null;
        }
    }, [localStream, isCameraOn, zoom]);

    useEffect(() => {
        if (videoRef2.current && remoteStream) {
            videoRef2.current.srcObject = remoteStream;
        }
    }, [remoteStream, zoom]);


    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [chatMessages]);


    // Simulate connection process
    useEffect(() => {
        if (localStream) {
            setIsConnecting(false);
            setConnectionStatus("Connected");

            // Simulate searching for stranger
            if (!remoteStream) {
                setIsSearching(true);
                setConnectionStatus("Searching for stranger...");

                const searchTimer = setTimeout(() => {
                    setIsSearching(false);
                    if (!remoteStream) {
                        setConnectionStatus("No one connected yet");
                    }
                }, 3000);

                return () => clearTimeout(searchTimer);
            }
        }
    }, [localStream, remoteStream]);

    useEffect(() => {
        if (remoteStream) {
            setIsSearching(false);
            setConnectionStatus("Connected with stranger");
        }
    }, [remoteStream]);

    const ConnectionLoader = () => (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
            <div className="text-center text-gray-800">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg font-semibold mb-2">{connectionStatus}</p>
                {isSearching && (
                    <div className="flex space-x-1 justify-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                )}
            </div>
        </div>
    );

    const VideoPlaceholder = ({ type }) => (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg border border-gray-300">
            <div className="text-center text-gray-600">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    {type === 'you' ? (
                        <BsFillCameraVideoOffFill className="text-2xl text-gray-500" />
                    ) : (
                        <div className="relative">
                            <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
                <p className="text-sm font-medium">
                    {type === 'you' ? 'Your Camera is Off' : 'Waiting for stranger...'}
                </p>
                {type === 'stranger' && (
                    <p className="text-xs text-gray-500 mt-2">Searching for connection</p>
                )}
            </div>
        </div>

    )

    return (
        <div className='h-[100dvh] w-screen p-0 m-auto flex flex-col overflow-hidden relative [&::-webkit-scrollbar]:hidden scrollbar-hide bg-gradient-to-br'>


            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-purple-300/30 blur-3xl"></div>
                <div className="absolute bottom-10 right-[-60px] w-[400px] h-[400px] bg-blue-300/30 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300/20 blur-[100px] rounded-full"></div>
            </div>

            {/* Header */}
            <header className='z-50 sticky top-0 left-0 w-full px-6 py-3 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm rounded-md'>
                <div className="flex justify-between items-center">
                    <div onClick={() => navigate("/")} className="cursor-pointer">
                        <h1 className='text-2xl font-bold text-gray-800'>SnapTalk</h1>
                        <p className='text-sm text-gray-600'>Random Video Chat</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${remoteStream
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : isSearching
                                ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}>
                            {remoteStream ? 'Connected' : isSearching ? 'Searching...' : 'Connecting...'}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Video Area */}
            <div className='flex-1 flex justify-center items-center md:px-4 relative transition-all ease-in-out duration-300'>

                <div
                    className={` md:gap-3 w-full flex flex-wrap justify-center items-center overflow-auto h-[calc(100vh-200px)] 
                    ${isChatOpen ? 'xl:w-[calc(100%-450px)]' : 'm-auto'} 
                    max-h-[calc(100vh-90px)]`}
                >
                    {/* Zoomed in view - You */}
                    {zoom === "you" && (
                        <div className='h-full w-full relative shadow-lg border border-gray-300 min-w-[300px] max-w-[450px] aspect-video md:rounded-xl bg-white overflow-hidden'>
                            {isConnecting && <ConnectionLoader />}

                            <div className='w-full h-full relative'>
                                <span className='bg-white/90 text-gray-800 absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm z-50 border border-gray-200'>
                                    You
                                </span>
                                <div className='bg-white/90 absolute top-4 right-4 px-3 py-2 rounded-full text-sm flex items-center gap-3 z-50 backdrop-blur-sm border border-gray-200'>
                                    {isMicOn ? (
                                        <FaMicrophone className='text-green-600' />
                                    ) : (
                                        <BsMicMuteFill className='text-red-500' />
                                    )}
                                    {isCameraOn ? (
                                        <BsFillCameraVideoFill className='text-green-600' />
                                    ) : (
                                        <BsFillCameraVideoOffFill className='text-red-500' />
                                    )}
                                </div>
                                <button
                                    onClick={() => setZoom("")}
                                    className='cursor-pointer bg-white/90 hover:bg-white absolute bottom-4 right-4 p-2 rounded-full text-gray-800 backdrop-blur-sm transition-all duration-200 z-50 border border-gray-200'
                                >
                                    <MdZoomOutMap className='text-xl' />
                                </button>

                                {isCameraOn && localStream ? (
                                    <video
                                        ref={videoRef1}
                                        autoPlay
                                        muted
                                        className='w-full h-full object-cover scale-x-[-1]'
                                    />
                                ) : (
                                    <VideoPlaceholder type="you" />
                                )}
                            </div>

                            {/* Stranger video smaller */}
                            <div
                                className='absolute bottom-4 left-4 border border-gray-300 w-48 h-32 rounded-lg bg-white overflow-hidden cursor-pointer z-50 shadow-lg hover:scale-105 transition-transform duration-200'
                                onClick={() => setZoom("stranger")}
                            >
                                <span className='bg-white/90 text-gray-800 absolute top-2 left-2 px-2 py-1 rounded-full text-xs backdrop-blur-sm z-50 border border-gray-200'>
                                    Stranger
                                </span>
                                {remoteStream ? (
                                    <video ref={videoRef2} autoPlay className='w-full h-full object-cover scale-x-[-1]' />
                                ) : (
                                    <VideoPlaceholder type="stranger" />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Zoomed in view - Stranger */}
                    {zoom === "stranger" && (
                        <div className='h-full w-full relative shadow-lg border border-gray-300 min-w-[300px] max-w-[450px] aspect-video md:rounded-xl bg-white overflow-hidden'>
                            {isConnecting && <ConnectionLoader />}

                            <div className='w-full h-full relative z-50'>
                                <span className='bg-white/90 text-gray-800 absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm z-50 border border-gray-200'>
                                    Stranger
                                </span>
                                <button
                                    onClick={() => setZoom("")}
                                    className='cursor-pointer bg-white/90 hover:bg-white absolute bottom-4 right-4 p-2 rounded-full text-gray-800 backdrop-blur-sm transition-all duration-200 z-50 border border-gray-200'
                                >
                                    <MdZoomOutMap className='text-xl' />
                                </button>
                                {remoteStream ? (
                                    <video ref={videoRef2} autoPlay className='w-full h-full object-cover scale-x-[-1]' />
                                ) : (
                                    <VideoPlaceholder type="stranger" />
                                )}
                            </div>

                            {/* Your video smaller */}
                            <div
                                className='absolute bottom-4 left-4 border border-gray-300 w-48 h-32 rounded-lg bg-white overflow-hidden cursor-pointer z-50 shadow-lg hover:scale-105 transition-transform duration-200'
                                onClick={() => setZoom("you")}
                            >
                                <span className='bg-white/90 text-gray-800 absolute top-2 left-2 px-2 py-1 rounded-full text-xs backdrop-blur-sm z-50 border border-gray-200'>
                                    You
                                </span>
                                <div className='bg-white/90 absolute top-2 right-2 px-1 py-1 rounded-full text-xs flex items-center gap-1 z-50 backdrop-blur-sm border border-gray-200'>
                                    {isMicOn ? (
                                        <FaMicrophone className='text-green-600 text-xs' />
                                    ) : (
                                        <BsMicMuteFill className='text-red-500 text-xs' />
                                    )}
                                    {isCameraOn ? (
                                        <BsFillCameraVideoFill className='text-green-600 text-xs' />
                                    ) : (
                                        <BsFillCameraVideoOffFill className='text-red-500 text-xs' />
                                    )}
                                </div>
                                {isCameraOn && localStream ? (
                                    <video ref={videoRef1} autoPlay muted className='w-full h-full object-cover scale-x-[-1]' />
                                ) : (
                                    <VideoPlaceholder type="you" />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Default view: both videos side by side */}
                    {!zoom && (
                        <>
                            {/* Your Video */}
                            <div className='relative shadow-lg  border-gray-300 w-[100%] h-1/2 md:h-[48%] md:w-1/2 min-w-[300px] max-w-[450px] aspect-video md:rounded-xl bg-white overflow-hidden'>
                                {isConnecting && <ConnectionLoader />}

                                <span className='bg-white/90 text-gray-800 absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm z-50 border border-gray-200'>
                                    You
                                </span>

                                <div className='bg-white/90 absolute top-4 right-4 px-3 py-2 rounded-full text-sm flex items-center gap-3 z-50 backdrop-blur-sm border border-gray-200'>
                                    {isMicOn ? (
                                        <FaMicrophone className='text-green-600' />
                                    ) : (
                                        <BsMicMuteFill className='text-red-500' />
                                    )}
                                    {isCameraOn ? (
                                        <BsFillCameraVideoFill className='text-green-600' />
                                    ) : (
                                        <BsFillCameraVideoOffFill className='text-red-500' />
                                    )}
                                </div>

                                <button
                                    onClick={() => setZoom("you")}
                                    className='cursor-pointer bg-white/90 hover:bg-white absolute bottom-4 right-4 p-2 rounded-full text-gray-800 backdrop-blur-sm transition-all duration-200 z-50 border border-gray-200'
                                >
                                    <MdOutlineFullscreen className='text-xl' />
                                </button>

                                {isCameraOn && localStream ? (
                                    <video ref={videoRef1} autoPlay muted className='w-full h-full object-cover scale-x-[-1]' />
                                ) : (
                                    <VideoPlaceholder type="you" />
                                )}
                            </div>

                            {/* Stranger Video */}
                            <div className='relative shadow-lg w-full h-1/2 md:h-[48%] md:w-1/2 min-w-[300px] max-w-[450px] aspect-video md:rounded-xl bg-white overflow-hidden'>
                                {isConnecting && <ConnectionLoader />}

                                <span className='bg-white/90 text-gray-800 absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm z-50 border border-gray-200'>
                                    Stranger
                                </span>

                                <button
                                    onClick={() => setZoom("stranger")}
                                    className='cursor-pointer bg-white/90 hover:bg-white absolute bottom-4 right-4 p-2 rounded-full text-gray-800 backdrop-blur-sm transition-all duration-200 z-50 border border-gray-200'
                                >
                                    <MdOutlineFullscreen className='text-xl' />
                                </button>

                                {remoteStream ? (
                                    <video ref={videoRef2} autoPlay className='w-full h-full object-cover scale-x-[-1]' />
                                ) : (
                                    <VideoPlaceholder type="stranger" />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Chat Box */}
            <div
                className={`transition-all duration-300 ease-in-out absolute top-0 right-0 shadow-lg flex flex-col justify-between w-[100%] md:max-w-[450px] h-[100dvh] overflow-hidden rounded-l-xl px-4 gap-3 z-[150] pb-4 bg-white border-l border-gray-200
                    ${isChatOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} `}
            >

                {/* Chat Header */}
                <div className="pt-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Chat</h3>
                            <p className="text-sm text-gray-600">Talk with stranger</p>
                        </div>
                        <button
                            onClick={toggleChat}
                            className='cursor-pointer h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200'
                            aria-label="Close chat"
                        >
                            <IoClose className='text-gray-600 text-xl' />
                        </button>
                    </div>
                </div>

                {/* Chat messages */}
                <div
                    ref={containerRef}
                    className="flex-grow h-[400px] rounded-xl overflow-y-scroll overflow-x-hidden flex flex-col gap-2  scrollbar-hide "
                    style={{
                        scrollbarWidth: 'none', 
                        msOverflowStyle: 'none' 
                    }}>
                    {(!remoteStream && chatMessages.length === 0) && (
                        <div className="flex items-center justify-center flex-col text-center text-gray-500 py-8 h-full w-full">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IoIosChatbubbles className="text-2xl text-gray-400" />
                            </div>
                            <p>Connect with someone to start chatting</p>
                        </div>
                    )}

                    {chatMessages.length === 0 && remoteStream && (
                        <div className="text-center text-gray-500 py-8">
                            <p>Say hello to start the conversation! 👋</p>
                        </div>
                    )}

                    {chatMessages.map((msg, idx) =>
                        msg.from === 'You' ? (
                            <div key={idx} className="flex justify-end flex-col items-end gap-1">
                                <span className="text-xs text-gray-500 px-2">You</span>
                                <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-[80%] break-words shadow-sm">
                                    {msg.text}
                                </div>
                            </div>
                        ) : (
                            <div key={idx} className="flex justify-start flex-col items-start gap-2">
                                <span className="text-xs text-gray-500 px-2">Stranger</span>
                                <div className="bg-gray-200 text-gray-800 px-4 py-3 rounded-2xl rounded-tl-none max-w-[80%] break-words shadow-sm">
                                    {msg.text}
                                </div>
                            </div>
                        )
                    )}
                </div>


                {/* Chat input */}
                <div className="relative w-full">
                    <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 items-center justify-between border border-gray-200 p-2 sm:p-3 bg-gray-50 rounded-xl w-full">

                        {/* Emoji Button */}
                        <div className="relative">
                            <button
                                onClick={() => setEmojiPicker(prev => !prev)}
                                className="p-2 cursor-pointer sm:p-3 rounded-xl bg-white hover:bg-gray-100 transition-colors border border-gray-200"
                                aria-label="Insert emoji"
                            >
                                <BsEmojiSmile className="text-lg sm:text-xl text-gray-600" />
                            </button>

                            {/* Emoji Picker */}
                            {emojiPicker && (
                                <div className="absolute bottom-full mb-4 left-0 z-50">
                                    <EmojiPicker
                                        onEmojiClick={(e) => {
                                            setChatInput(prev => prev + e.emoji);
                                            setEmojiPicker(false);
                                        }}
                                        height={350}
                                        width={300}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Chat Input */}
                        <input
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            className="flex-1 min-w-[150px] bg-transparent border-none text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0 px-2 py-1 sm:py-2"
                            type="text"
                            placeholder="Type a message..."
                            aria-label="Chat message input"
                        />

                        {/* Send Button */}
                        <button
                            onClick={sendMessage}
                            disabled={!chatInput.trim() || !remoteStream}
                            className={`p-2 sm:p-3 rounded-xl font-bold transition-all duration-200 ${chatInput.trim() && remoteStream
                                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            aria-label="Send message"
                        >
                            <IoIosSend className="text-lg sm:text-xl" />
                        </button>
                    </div>
                </div>


            </div>

            {/* Bottom Control Bar */}
            <div className='w-full px-4 py-4 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg z-50'>

                <div className='flex flex-wrap justify-center items-center gap-3 max-w-4xl mx-auto'>

                    <button
                        onClick={toggleMic}
                        aria-label={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
                        title={isMicOn ? 'Click to mute' : 'Click to unmute'}
                        className={`cursor-pointer py-2 px-3 rounded-lg transition-all duration-200 ${isMicOn ? 'bg-green-100 hover:bg-green-200 text-green-700' : 'bg-red-100 hover:bg-red-200 text-red-700'
                            } border border-current`}
                    >
                        <span className='flex items-center gap-2 font-medium text-sm'>
                            {isMicOn ? <FaMicrophone /> : <BsMicMuteFill />}
                            <span className='hidden md:flex'>
                                {isMicOn ? 'Mute' : 'Unmute'}
                            </span>
                        </span>
                    </button>

                    <button
                        onClick={toggleCamera}
                        aria-label={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
                        title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
                        className={`cursor-pointer py-2 px-3 rounded-lg transition-all duration-200 ${isCameraOn ? 'bg-green-100 hover:bg-green-200 text-green-700' : 'bg-red-100 hover:bg-red-200 text-red-700'
                            } border border-current`}
                    >
                        <span className='flex items-center gap-2 font-medium text-sm'>
                            {isCameraOn ? <BsFillCameraVideoFill /> : <BsFillCameraVideoOffFill />}
                            <span className='hidden md:flex'>Camera</span>
                        </span>
                    </button>

                    <button
                        onClick={toggleChat}
                        aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
                        title={isChatOpen ? 'Close chat' : 'Open chat'}
                        className={`cursor-pointer py-2 px-3 rounded-lg transition-all duration-200 ${isChatOpen ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                            } border border-current hover:bg-blue-200`}
                    >
                        <span className='flex items-center gap-2 font-medium text-sm'>
                            <IoIosChatbubbles />
                            <span className='hidden md:flex'>Chat</span>
                        </span>
                    </button>


                    <button
                        onClick={endCall}
                        aria-label="End call"
                        title="End call"
                        className='cursor-pointer py-2 px-3 rounded-lg bg-red-500 hover:bg-red-600 text-white border border-red-500 transition-all duration-200 transform hover:scale-105'
                    >
                        <span className='flex items-center gap-2 font-medium text-sm'>
                            <MdOutlineCallEnd />
                            <span className='hidden md:flex'>End</span>
                        </span>
                    </button>

                    <button
                        onClick={handleSkip}
                        aria-label="Skip stranger"
                        title="Skip stranger"
                        className='cursor-pointer py-2 px-3 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border border-yellow-300 transition-all duration-200'
                    >
                        <span className='flex items-center gap-2 font-medium text-sm'>
                            <IoPlaySkipForward />
                            <span className=''>Skip</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Full;