import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*", // Cambia este puerto al que usa tu frontend
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));

// Configuración de sockets
let appSockets = express();
let serverSockets = http.Server(appSockets);
let socketio = new Server(serverSockets, {
  cors: {
    origin: "*", // Cambia esto por la URL de tu frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});
appSockets.set("port", process.env.SOCKET_PORT ?? 5000);

import { findUser } from "./functions/f_users.mjs";
import { socketHandler } from "./sockets.mjs";

const { sendMessageToIndex, sendMessageToStock, broadcastMessage } =
  socketHandler(socketio);

// Rutas de la API
app.get("/", (req, res) => {
  res.send(`Hola soy el server at ${process.env.PORT}`);
});

app.get("/message", async (req, res) => {
  broadcastMessage("Hello Everyone");
  sendMessageToIndex("hola index , como va??");
  sendMessageToStock("hola Stock , como estas??");
  res.status(200).send("message sent");
});

// Iniciar el servidor HTTP y el servidor de sockets
const port = process.env.PORT ?? 8800;

const startSockets = async () => {
  serverSockets.listen(appSockets.get("port"), () => {
    console.log("Servidor sockets en el puerto ", appSockets.get("port"));
  });
};

const startServer = async () => {
  try {
    app.listen(port, () => console.log(`Server escuchando puerto ${port}...`));
  } catch (error) {
    console.log("no hay conexion a datos");
  }
};

const startAll = async () => {
  await startServer();
  await startSockets();
};

try {
  startAll();
} catch (error) {
  console.log(error);
}
