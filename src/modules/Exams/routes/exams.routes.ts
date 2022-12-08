import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import { ExamsController } from "../controllers/Exams.controller";
import { createExamsMiddleware, deleteExamsMiddleware, showExamsMiddleware, updateExamsMiddleware } from "./validators/exams.validation";

const examsRouter = Router();

const examsController = new ExamsController();

examsRouter.use(verifyToken);

examsRouter.post('/:client_Id', createExamsMiddleware, examsController.create);

examsRouter.delete('/:examId', deleteExamsMiddleware, examsController.delete);

examsRouter.get('/:client_id', showExamsMiddleware, examsController.show);

examsRouter.put('/:examId', updateExamsMiddleware, examsController.update);

export { examsRouter };
