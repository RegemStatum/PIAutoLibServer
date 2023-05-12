import express, { Express } from "express";
import http from "http";
import cors from "cors";
import cabinetRouter from "./routes/cabinetRouter.js";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/cabinets", cabinetRouter);

const PORT = Number(process.env.PORT) || 8082;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

