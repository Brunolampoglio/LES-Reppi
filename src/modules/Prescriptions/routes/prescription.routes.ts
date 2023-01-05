import { uploadConfig } from "@config/upload";
import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import multer from "multer";
import { PrescriptionController } from "../controllers/Prescriptions.controller";
import { createPrescriptionMiddleware, deletePrescriptionMiddleware, listPrescriptionMiddleware, updatePrescriptionMiddleware } from "./validators/prescriptions.validation";

const prescriptionRoutes = Router();

const prescriptionController = new PrescriptionController();

const uploadMulter = multer({
  storage: uploadConfig.multer.storage,
  limits: { fileSize: 200 * 1024 * 1024 },
});


prescriptionRoutes.use(verifyToken);


prescriptionRoutes.patch('/:patient_id', uploadMulter.single('anexo'),
createPrescriptionMiddleware,
 prescriptionController.create);


prescriptionRoutes.get('/:patient_id',
listPrescriptionMiddleware,
prescriptionController.list);

prescriptionRoutes.put('/:prescription_id',
uploadMulter.single('anexo'),
updatePrescriptionMiddleware,
prescriptionController.update);

prescriptionRoutes.delete('/:prescription_id',
deletePrescriptionMiddleware,
prescriptionController.delete);

export { prescriptionRoutes };
