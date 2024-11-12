let users = [];
const sessions = {};

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("new connection from sockets.mjs");

    socket.on("joinRoom", (room) => {
      console.log(`Cliente se unió a la sala: ${room}`);
      socket.join(room);
    });

    socket.on("enviar mensaje", ({ msg, from }) => {
      console.log("mensaje global", msg, from);
      io.sockets.emit("nuevo mensaje", { msg, from });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  // Definir las funciones de mensaje
  const sendMessageToIndex = (message) => {
    io.to("indexRoom").emit("message", message);
  };

  const sendMessageToStock = (message) => {
    io.to("stockRoom").emit("message", message);
  };

  const broadcastMessage = (message) => {
    io.emit("message", message);
  };

  // Retornar las funciones para usarlas en el servidor
  return { sendMessageToIndex, sendMessageToStock, broadcastMessage };
};
