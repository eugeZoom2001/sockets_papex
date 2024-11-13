import express from "express";
import {
  sendMessageToIndex,
  sendMessageToStock,
  broadcastMessage,
} from "./socketService.mjs";

const router = express.Router();

// Endpoint único para manejar todos los mensajes
router.post("/", (req, res) => {
  const { recipient, message } = req.body;

  // Lógica para determinar a quién enviar el mensaje
  switch (recipient) {
    case "index":
      sendMessageToIndex(message);
      res.status(200).send("Message sent to index");
      break;
    case "stock":
      sendMessageToStock(message);
      res.status(200).send("Message sent to stock");
      break;
    case "broadcast":
      broadcastMessage(message);
      res.status(200).send("Broadcast message sent");
      break;
    default:
      res.status(400).send("Invalid recipient specified");
  }
});

export default router;
