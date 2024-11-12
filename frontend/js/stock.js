import { initializeSocket } from "../js/sockets/initializeSocket.mjs";

function handleMessage(data) {
  const messageElement = document.createElement("p");
  messageElement.textContent = `Mensaje recibido en index: ${data}`;
  document.getElementById("messages").appendChild(messageElement);
}

// Inicializar el socket para la página "index" y manejar mensajes
const client = initializeSocket("stock", handleMessage);
