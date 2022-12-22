import { uploadConfig } from '@config/upload';
import { Router } from 'express';
import multer from 'multer';
import { LinkedPatientsController } from '../controllers/LinkedPatients.controllers';

const linkedPatientsRoutes= Router();

const linkedpatientsController = new LinkedPatientsController();

const uploadMulter = multer(uploadConfig.multer);


linkedPatientsRoutes.patch(
  '/',
  uploadMulter.single('anexo'),
  linkedpatientsController.create,
);

export { linkedPatientsRoutes };
