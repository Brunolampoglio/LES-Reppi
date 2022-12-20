import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import { TermsOfUseController } from "../controllers/TermsOfUse.controller";

const termsOfUseRouter = Router();

const termsOfUseController = new TermsOfUseController();

termsOfUseRouter.get('/', termsOfUseController.show);

termsOfUseRouter.use(verifyToken);

termsOfUseRouter.post('/', termsOfUseController.create);

termsOfUseRouter.put('/', termsOfUseController.update);

termsOfUseRouter.delete('/', termsOfUseController.delete);

export { termsOfUseRouter };
