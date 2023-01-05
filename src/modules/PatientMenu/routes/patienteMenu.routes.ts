import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import { PatientMenuController } from "../controllers/PatientMenu.controller";
import { createPatientMenuMiddleware, deletePatientMenuMiddleware, listPatientMenuMiddleware, updatePatientMenuMiddleware } from "./validators/patientMenu.validation";

const patientMenuRouter = Router();

const patientMenuController = new PatientMenuController();

patientMenuRouter.use(verifyToken);

patientMenuRouter.post('/:patientId', createPatientMenuMiddleware, patientMenuController.create);

patientMenuRouter.delete('/:patientMenuId', deletePatientMenuMiddleware, patientMenuController.delete);

patientMenuRouter.put('/:patientMenuId', updatePatientMenuMiddleware, patientMenuController.update);

patientMenuRouter.get('/:patientId', listPatientMenuMiddleware, patientMenuController.list);


export { patientMenuRouter };
