import { uploadConfig } from "@config/upload";
import { verifyToken } from "@shared/middleware/verifyToken";
import { Router } from "express";
import multer from "multer";
import { DocExamsController } from "../controllers/DocExams.controller";

const docExamsRouter = Router();

const docExamsController = new DocExamsController();

const uploadMulter = multer({
    storage: uploadConfig.multer.storage,
    limits: { fileSize: 200 * 1024 * 1024 },
  });

  docExamsRouter.use(verifyToken);

  docExamsRouter.post('/:user_id', uploadMulter.single('anexo'), docExamsController.create);


  docExamsRouter.get('/:user_id', docExamsController.list);

  docExamsRouter.put('/:docexam_id', uploadMulter.single('anexo'), docExamsController.update);

  docExamsRouter.delete('/:docexam_id', docExamsController.delete);

  export { docExamsRouter };
