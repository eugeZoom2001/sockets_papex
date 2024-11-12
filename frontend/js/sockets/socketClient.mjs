import { socketConfig } from "../constantes.mjs";

export default class SocketClient {
  constructor(channel) {
    // Conectar al servidor con la configuración desde `socketConfig`
    this.socket = io(socketConfig.url, socketConfig.config);
    this.channel = channel;

    // Escuchar mensajes globales por defecto
    this.socket.on("message", (data) => {
      if (this.messageCallback) {
        this.messageCallback(data);
      }
    });
  }

  // Define un callback para manejar mensajes recibidos
  onMessage(callback) {
    this.messageCallback = callback;
  }

  // Envía un mensaje global
  sendMessage(message, from) {
    this.socket.emit("enviar mensaje", { msg: message, from });
  }
}
