import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import { PhysicalActivityController } from "../controllers/PhysicalActivity.controller";
import { createPhysicalActivityMiddleware, deletePhysicalActivityMiddleware, listPhysicalActivityMiddleware, updatePhysicalActivityMiddleware } from "./validators/physicalActivity.validation";

const physicalActivityRoutes = Router();

const physicalActivityController = new PhysicalActivityController();

physicalActivityRoutes.use(verifyToken);

physicalActivityRoutes.post('/', createPhysicalActivityMiddleware, physicalActivityController.create);

physicalActivityRoutes.get('/client_id', listPhysicalActivityMiddleware, physicalActivityController.list);

physicalActivityRoutes.put('/:physicalActivityId', updatePhysicalActivityMiddleware, physicalActivityController.update);

physicalActivityRoutes.delete('/:physicalActivityId', deletePhysicalActivityMiddleware, physicalActivityController.delete);


export { physicalActivityRoutes };
