import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import cors from "cors";

import socketRoutes from "./routes/socketRoutes.mjs";
import { initializeSocketService } from "./services/socketService.mjs";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));

// Configuración de sockets
let appSockets = express();
const serverSockets = initializeSocketService(appSockets); // Inicializa el servicio de sockets
appSockets.set("port", process.env.SOCKET_PORT ?? 5000);

// Monta el endpoint único en "/messages"
app.use("/messages", socketRoutes);
app.use("/", (req, res) => {
  res.status(200).json({ msg: "server running" });
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
    //app.listen(port, () => console.log(`Server: escuchando puerto ${port}...`));
    app.listen(port, () => console.log(`Server: http://localhost:${port}`));
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
