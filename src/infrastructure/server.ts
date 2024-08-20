import express from "express";
import routes from "./adapters/in/http/routes"; // Importa el enrutador principal
import connectDB from "./adapters/out/db/database";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();
const app = express();
app.use(express.json());

// Usa el enrutador principal para montar las rutas
app.use("/api", routes);

// Conectar a MongoDB
connectDB();

module.exports.handler = serverless(app);

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
