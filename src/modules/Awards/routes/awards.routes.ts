import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import { AwardsController } from "../controllers/Awards.controller";
import { createAwardsMiddleware, deleteAwardsMiddleware, listAwardsMiddleware, updateAwardsMiddleware } from "./validators/awards.validation";

const awardsRouter = Router();

const awardsController = new AwardsController();

awardsRouter.use(verifyToken);

awardsRouter.post('/:patient_id', createAwardsMiddleware, awardsController.create);

awardsRouter.get('/:patient_id', listAwardsMiddleware, awardsController.list);

awardsRouter.put('/:awardsId', updateAwardsMiddleware, awardsController.update);

awardsRouter.delete('/:awardsId', deleteAwardsMiddleware, awardsController.delete);


export { awardsRouter };
