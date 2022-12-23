import { uploadConfig } from '@config/upload';
import { verifyToken } from '@shared/middleware/verifyToken';
import { Router } from 'express';
import multer from 'multer';
import { LinkedPatientsController } from '../controllers/LinkedPatients.controllers';

const linkedPatientsRoutes= Router();

const linkedpatientsController = new LinkedPatientsController();

const uploadMulter = multer(uploadConfig.multer);

linkedPatientsRoutes.use(verifyToken);

linkedPatientsRoutes.patch(
  '/',
  uploadMulter.single('anexo'),
  linkedpatientsController.create,
);

linkedPatientsRoutes.get('/', linkedpatientsController.index);
linkedPatientsRoutes.get('/search', linkedpatientsController.listByName);

export { linkedPatientsRoutes };
