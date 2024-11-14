import express from "express";

import {
  sendMessageToIndex,
  sendMessageToStock,
  broadcastMessage,
} from "../services/socketService.mjs";

const routerMeli = express.Router();

// Endpoint único para manejar todos los mensajes
routerMeli.post("/", (req, res) => {
  const notification = req.body;
  console.log(req.body);

  try {
    if (notification.topic === "orders") {
      console.log("Nueva venta:", notification);
      // io.emit("nuevaVenta", notification); // Enviar notificación al frontend
      sendMessageToStock(notification);
    } else if (notification.topic === "questions") {
      console.log("Nueva pregunta:", notification);
      //io.emit("nuevaPregunta", notification); // Enviar notificación al frontend
      broadcastMessage(notification.resource);
    }
    res.status(200).send(notification);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "bad request" }); // Identificar el tipo de notificación
  }

  //res.status(200).send({ result: "ok", msg: "Pregunta Recibida" });
});

export default routerMeli;
