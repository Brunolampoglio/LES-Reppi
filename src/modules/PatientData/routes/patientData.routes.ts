import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import { PatientDataController } from "../controllers/PatientData.controller";

const patientDataRouter = Router();

const patientDataController = new PatientDataController();


patientDataRouter.use(verifyToken);

patientDataRouter.post('/:patientId', patientDataController.create);

patientDataRouter.get('/:patientId', patientDataController.list);

patientDataRouter.put('/:patientId', patientDataController.update);

patientDataRouter.delete('/:patientId', patientDataController.delete);


export { patientDataRouter };
