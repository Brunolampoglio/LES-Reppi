import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import { PatientDataController } from "../controllers/PatientData.controller";

const patientDataRouter = Router();

const patientDataController = new PatientDataController();


patientDataRouter.use(verifyToken);

patientDataRouter.post("/", patientDataController.create);


export { patientDataRouter };
