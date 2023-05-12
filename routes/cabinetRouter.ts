import { Router } from "express";
import {
  closeCabinets,
  openCabinets,
} from "../controllers/cabinetController.js";

const cabinetRouter = Router();

cabinetRouter.route("/open").post(openCabinets);
cabinetRouter.route("/close").post(closeCabinets);

export default cabinetRouter;
