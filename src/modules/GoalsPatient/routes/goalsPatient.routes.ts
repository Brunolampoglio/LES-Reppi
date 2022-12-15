import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import { GoalsPatientController } from "../controllers/GoalsPatient.controller";
import { createGoalsPatientMiddleware, deleteGoalsPatientMiddleware, listGoalsPatientMiddleware, updateGoalsPatientMiddleware } from "./validators/goalsPatient.validation";

const goalsPatientRouter = Router();

const goalsPatientController = new GoalsPatientController();

goalsPatientRouter.use(verifyToken);

goalsPatientRouter.post('/:patientId',
createGoalsPatientMiddleware,
goalsPatientController.create);

goalsPatientRouter.get('/:patientId',
listGoalsPatientMiddleware,
goalsPatientController.list);

goalsPatientRouter.put('/:goal_id',
updateGoalsPatientMiddleware,
goalsPatientController.update);

goalsPatientRouter.delete('/:goal_id',
deleteGoalsPatientMiddleware,
goalsPatientController.delete);


export { goalsPatientRouter };
