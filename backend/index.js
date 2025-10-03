import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

let waitingUsers = new Set();
let pairedUsers = new Map(); // socket.id => partnerId

function pairUsers() {
  const users = Array.from(waitingUsers);
  if (users.length >= 2) {
    const user1 = users[0];
    const user2 = users[1];

    waitingUsers.delete(user1);
    waitingUsers.delete(user2);

    pairedUsers.set(user1, user2);
    pairedUsers.set(user2, user1);

    io.to(user1).emit("partner-found", { partnerId: user2 });
    io.to(user2).emit("partner-found", { partnerId: user1 });

    console.log(`Paired: ${user1} <--> ${user2}`);
  }
}

function removeUser(socketId) {
  waitingUsers.delete(socketId);

  const partnerId = pairedUsers.get(socketId);
  if (partnerId) {
    pairedUsers.delete(socketId);
    pairedUsers.delete(partnerId);
    return partnerId;
  }

  return null;
}

io.on('connection', (socket) => {
  console.log("User connected:", socket.id);
  waitingUsers.add(socket.id);
  pairUsers();

  socket.on("offer", (data) => {
    const partnerId = pairedUsers.get(socket.id);
    if (partnerId) {
      socket.to(partnerId).emit("offer", data);
    }
  });

  socket.on("answer", (data) => {
    const partnerId = pairedUsers.get(socket.id);
    if (partnerId) {
      socket.to(partnerId).emit("answer", data);
    }
  });

  socket.on("candidate", (data) => {
    const partnerId = pairedUsers.get(socket.id);
    if (partnerId) {
      socket.to(partnerId).emit("candidate", data);
    }
  });

  socket.on("chat-message", (data) => {
    const partnerId = pairedUsers.get(socket.id);
    if (partnerId && io.sockets.sockets.has(partnerId)) {
        io.to(partnerId).emit("chat-message", data);
    }
});


  socket.on("skip", () => {
    console.log(`${socket.id} skipped`);
    const partnerId = removeUser(socket.id);

    // Notify old partner
    if (partnerId && io.sockets.sockets.has(partnerId)) {
      io.to(partnerId).emit("partner-skipped");
      waitingUsers.add(partnerId);
      pairUsers();
    }

    waitingUsers.add(socket.id);
    console.log("Waiting users after skip:", waitingUsers);
    pairUsers();
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    const partnerId = removeUser(socket.id);

    if (partnerId && io.sockets.sockets.has(partnerId)) {
      io.to(partnerId).emit("partner-disconnected");
      waitingUsers.add(partnerId);
      pairUsers();
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
