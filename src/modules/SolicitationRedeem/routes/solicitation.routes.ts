import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import { SolicitationController } from "../controllers/SolicitationRedeem.controller";
import { createSolicitaionMiddleware, deleteSolicitationMiddleware, updateSolicitationMiddleware } from "./validators/solicitation.validation";

const solicitationRouter = Router();

const solicitationController = new SolicitationController();

solicitationRouter.use(verifyToken);

solicitationRouter.post("/:awards_id",
createSolicitaionMiddleware,
solicitationController.create);

solicitationRouter.get("/", solicitationController.list);

solicitationRouter.delete("/:solicitation_id",
deleteSolicitationMiddleware,
solicitationController.delete);

solicitationRouter.put("/:solicitation_id",
updateSolicitationMiddleware,
solicitationController.update);

export { solicitationRouter };
