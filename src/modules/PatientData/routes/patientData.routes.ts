import { uploadConfig } from "@config/upload";
import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import multer from "multer";
import { PatientDataController } from "../controllers/PatientData.controller";
import { createPatientDataMiddleware } from "./validators/patientData.validation";

const patientDataRouter = Router();

const patientDataController = new PatientDataController();

const uploadMulter = multer({
  storage: uploadConfig.multer.storage,
  limits: { fileSize: 200 * 1024 * 1024 },
});


patientDataRouter.use(verifyToken);

patientDataRouter.post('/:patientId', uploadMulter.single('anexo'),
createPatientDataMiddleware,patientDataController.create);

patientDataRouter.get('/:patientId', patientDataController.list);

patientDataRouter.put('/:patientDataId', patientDataController.update);

patientDataRouter.delete('/:patientDataId', patientDataController.delete);

patientDataRouter.post('/qrCode', patientDataController.createQrCode);

patientDataRouter.get('/qrCode/:qr_code', patientDataController.show);


export { patientDataRouter };
