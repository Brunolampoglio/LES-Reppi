import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import { LicenseOfUseController } from "../controllers/LicenseOfUse.controller";

const licenseOfUseRouter = Router();

const licenseOfUseController = new LicenseOfUseController();

licenseOfUseRouter.get('/', licenseOfUseController.show);

licenseOfUseRouter.use(verifyToken);

licenseOfUseRouter.post('/', licenseOfUseController.create);

licenseOfUseRouter.put('/', licenseOfUseController.update);

licenseOfUseRouter.delete('/', licenseOfUseController.delete);

export { licenseOfUseRouter };
