import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import { PatientDataController } from "../controllers/PatientData.controller";
import { createPatientDataMiddleware } from "./validators/patientData.validation";

const patientDataRouter = Router();

const patientDataController = new PatientDataController();


patientDataRouter.use(verifyToken);

patientDataRouter.post('/:patientId', createPatientDataMiddleware,patientDataController.create);

patientDataRouter.get('/:patientId', patientDataController.list);

patientDataRouter.put('/:patientDataId', patientDataController.update);

patientDataRouter.delete('/:patientDataId', patientDataController.delete);

patientDataRouter.post('/qrCode', patientDataController.createQrCode);

patientDataRouter.get('/qrCode/:qr_code', patientDataController.show);


export { patientDataRouter };
