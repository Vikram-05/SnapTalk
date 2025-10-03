import { io } from 'socket.io-client'

let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
            transports: ['websocket'],
            secure: true
        });

    }
    return socket;
};

// STUN server configuration
const ICE_SERVERS = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject'
        }
    ]
};


export let peerConnection;

export const CreateOfferandConnect = async (socket, localStream, setRemoteStream) => {
  try {
    if (!peerConnection || peerConnection.signalingState === 'closed') {
      // Create new peer connection
      peerConnection = new RTCPeerConnection(ICE_SERVERS);

      // Add tracks
      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
      });

      // Setup event handlers
      const remoteStream = new MediaStream();
      peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach(track => {
          remoteStream.addTrack(track);
        });
        setRemoteStream(remoteStream);
      };

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", event.candidate);
        }
      };

      peerConnection.onconnectionstatechange = () => {
        console.log("Connection state:", peerConnection.connectionState);
      };
    } else {
      // Optional: restart ICE on existing connection if needed
      console.log("Restarting ICE on existing peer connection");
      await peerConnection.restartIce();
    }

    // Create offer and set local description
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", offer);
    console.log("Offer created and sent: ", offer);

  } catch (error) {
    console.error('Error creating offer and connecting:', error);
  }
};
