import SocketClient from "./socketClient.mjs";

export function initializeSocket(channel, onMessageCallback) {
  // Crear una nueva instancia de SocketClient con la configuración y canal especificado
  const client = new SocketClient(channel);

  // Unirse a la sala específica al conectar
  client.socket.emit("joinRoom", `${channel}Room`); // Se unirá a "indexRoom" o "stockRoom" según el canal

  // Define el callback para manejar los mensajes recibidos
  client.onMessage((data) => {
    console.log(`Nuevo mensaje en ${channel}:`, data);
    if (onMessageCallback) {
      onMessageCallback(data);
    }
  });

  // Envía un mensaje de bienvenida
  client.sendMessage(`Hola desde ${channel}`, `${channel}User`);

  return client;
}
