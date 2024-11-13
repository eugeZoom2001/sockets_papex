import { Server } from "socket.io";
import http from "http";

let sendMessageToIndex, sendMessageToStock, broadcastMessage;

export function initializeSocketService(appSockets) {
  const serverSockets = http.Server(appSockets);
  const io = new Server(serverSockets, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New connection established");

    // Escuchar cuando un cliente se une a una sala específica
    socket.on("joinRoom", (room) => {
      console.log(`Cliente se unió a la sala: ${room}`);
      socket.join(room);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // Definir las funciones de mensaje
  sendMessageToIndex = (message) => {
    io.to("indexRoom").emit("message", message);
  };

  sendMessageToStock = (message) => {
    io.to("stockRoom").emit("message", message);
  };

  broadcastMessage = (message) => {
    io.emit("message", message);
  };

  return serverSockets;
}

export { sendMessageToIndex, sendMessageToStock, broadcastMessage };
