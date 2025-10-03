import React, { useState, useEffect, useRef } from 'react'
import { CreateOfferandConnect, getSocket, peerConnection } from '../service/service'
import Full from './Full';

function VideoPage() {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    //for chat
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

    // const videoRef1 = useRef(null);
    // const videoRef2 = useRef(null);
    const socketRef = useRef(null);
    const connectionCreatedRef = useRef(false);
    const pendingCandidates = useRef([]);

    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const currentStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                setLocalStream(currentStream);
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };
        init();

        return () => {
            // Cleanup
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    const setupConnection = () => {
        connectionCreatedRef.current = true;
        const socket = getSocket();
        socketRef.current = socket;

        // Create offer when local stream is available
        CreateOfferandConnect(socket, localStream, setRemoteStream);

        socket.on("offer", async (offer) => {
            console.log("Received offer: ", offer);
            try {
                // Only handle offer if we're not the one who created it
                if (peerConnection && peerConnection.signalingState !== "stable") {
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
                    const answer = await peerConnection.createAnswer();
                    await peerConnection.setLocalDescription(answer);
                    socket.emit("answer", answer);
                    console.log("Sent answer: ", answer);
                }
            } catch (error) {
                console.error("Error handling received offer: ", error);
            }
        });

        socket.on("answer", async (answer) => {
            console.log("Received answer: ", answer);
            try {
                if (peerConnection && peerConnection.signalingState === "have-local-offer") {
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
                    await addBufferedCandidates();
                }
            } catch (error) {
                console.error("Error handling received answer: ", error);
            }
        });

        socket.on("candidate", async (candidate) => {
            console.log("Received ICE candidate: ", candidate);
            try {
                if (peerConnection) {
                    if (peerConnection.remoteDescription && peerConnection.remoteDescription.type) {
                        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                    } else {
                        pendingCandidates.current.push(candidate);
                    }
                }
            } catch (error) {
                console.error("Error adding received ICE candidate: ", error);
            }
        });

        // New: handle pairing
        socket.on("partner-found", () => {
            console.log("Partner found, starting call");

            if (!connectionCreatedRef.current) {
                connectionCreatedRef.current = true;
                CreateOfferandConnect(socket, localStream, setRemoteStream);
            }
        });

        socket.on("partner-skipped", () => {
            console.log("Partner skipped");
            setRemoteStream(null);
            connectionCreatedRef.current = false;
        });

        socket.on("partner-disconnected", () => {
            console.log("Partner disconnected");
            setRemoteStream(null);
            connectionCreatedRef.current = false;
        });


        socket.on("chat-message", (message) => {
            console.log("Received chat message:", message);
            setChatMessages(prev => [...prev, { from: "Stranger", text: message.text }]);
        });



        socket.on("disconnect", () => {
            console.log("Socket disconnected");
            setChatMessages([]);

            setRemoteStream(null);
        });
    };

    useEffect(() => {
        if (!localStream || connectionCreatedRef.current) return;
        setupConnection();
    }, [localStream]);


   const  toggleCamera = () => {
        if (localStream) {
            localStream.getVideoTracks().forEach(track => {
                track.enabled = !isCameraOn;
            });
            setIsCameraOn(!isCameraOn);
        }
    }

    const toggleMic = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !isMicOn;
            });
            setIsMicOn(!isMicOn);
        }
    }

    // Set local stream
    // useEffect(() => {
    //     if (videoRef1.current && localStream) {
    //         videoRef1.current.srcObject = localStream;
    //     }
    // }, [localStream]);

    // // Set remote stream
    // useEffect(() => {
    //     if (videoRef2.current && remoteStream) {
    //         videoRef2.current.srcObject = remoteStream;
    //     }
    // }, [remoteStream]);

    const endCall = () => {
        setChatMessages([]);

        if (peerConnection) {
            peerConnection.close();
        }
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        setRemoteStream(null);
        connectionCreatedRef.current = false;

        if (socketRef.current) {
            socketRef.current.disconnect();
        }
    };


    const handleSkip = () => {
        if (socketRef.current) {
            socketRef.current.emit("skip");
        }
        if (peerConnection) {
            peerConnection.onicecandidate = null;
            peerConnection.ontrack = null;
            peerConnection.onconnectionstatechange = null;
            peerConnection.close();
        }
        setRemoteStream(null);
        setChatMessages([]);
        connectionCreatedRef.current = false;
        pendingCandidates.current = [];
    };

    const sendMessage = () => {
        if (chatInput.trim() && socketRef.current) {
            const message = { text: chatInput };
            socketRef.current.emit("chat-message", message);
            setChatMessages(prev => [...prev, { from: "You", text: chatInput }]);
            setChatInput("");
        }
    };

    const addBufferedCandidates = async () => {
        for (const candidate of pendingCandidates.current) {
            try {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (err) {
                console.error("Error adding buffered ICE candidate:", err);
            }
        }
        pendingCandidates.current = [];
    };

    return (
        <>
            <Full
                localStream={localStream}
                remoteStream={remoteStream}
                chatMessages={chatMessages}
                endCall={endCall}
                handleSkip={handleSkip}
                sendMessage={sendMessage}
                chatInput={chatInput}
                setChatInput={setChatInput}
                toggleCamera={toggleCamera}
                toggleMic={toggleMic}
                isCameraOn={isCameraOn}
                isMicOn={isMicOn}
            />

        </>
    );
}

export default VideoPage;