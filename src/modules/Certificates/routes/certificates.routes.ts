import { uploadConfig } from "@config/upload";
import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import multer from "multer";
import { CertificateController } from "../controllers/Certificates.controller";
import { createCertificateMiddleware, listCertificateMiddleware, updateCertificateMiddleware } from "./validators/certificates.validation";

const certificateRouter = Router();

const certificateController = new CertificateController();

const uploadMulter = multer({
    storage: uploadConfig.multer.storage,
    limits: { fileSize: 200 * 1024 * 1024 },
  });

  certificateRouter.use(verifyToken);

  certificateRouter.post('/:user_id', uploadMulter.single('anexo'),
  createCertificateMiddleware, certificateController.create);

  certificateRouter.get('/:user_id', listCertificateMiddleware, certificateController.list);

  certificateRouter.put('/:certificate_id', uploadMulter.single('anexo'), updateCertificateMiddleware, certificateController.update);

  certificateRouter.delete('/:certificate_id', updateCertificateMiddleware, certificateController.delete);

  export { certificateRouter };
