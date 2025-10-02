import { io } from 'socket.io-client'

let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io(`${import.meta.env.VITE_BACKEND_URL}`);
    }
    return socket;
};

// STUN server configuration
const ICE_SERVERS = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
    ],
};

export let peerConnection;

export const CreateOfferandConnect = async (socket, localStream, setRemoteStream) => {
    try {
        // Close existing connection if any
        if (peerConnection) {
            peerConnection.close();
        }

        // Create new peer connection
        peerConnection = new RTCPeerConnection(ICE_SERVERS);

        // Add local tracks to connection
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        // Handle incoming remote stream
        const remoteStream = new MediaStream();
        peerConnection.ontrack = (event) => {
            console.log("Received remote track:", event.track.kind);
            event.streams[0].getTracks().forEach(track => {
                remoteStream.addTrack(track);
            });
            setRemoteStream(remoteStream);
        };

        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("Sending ICE candidate: ", event.candidate);
                socket.emit("candidate", event.candidate);
            }
        };

        // Handle connection state changes
        peerConnection.onconnectionstatechange = () => {
            console.log("Connection state:", peerConnection.connectionState);
            if (peerConnection.connectionState === 'connected') {
                console.log("Peers connected!");
            }
        };

        // Create and send offer
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit("offer", offer);
        console.log("Offer created and sent: ", offer);

    } catch (error) {
        console.error('Error creating offer and connecting:', error);
    }
};