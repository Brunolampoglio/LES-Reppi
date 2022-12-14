import { container } from 'tsyringe';

import './providers';

import { IUserRepository } from '@modules/User/repositories/UserRepository.interface';
import { UserRepository } from '@modules/User/repositories/UserRepository';
import { IPlansRepository } from '@modules/Plans/repositories/PlanRepositories.interface';
import { PlanRepository } from '@modules/Plans/repositories/PlanRepository';
import { ICommentsRepository } from '@modules/Comments/repositories/CommentsRepositories.interface';
import { CommentRepository } from '@modules/Comments/repositories/CommentsRepository';
import { IBannerRepository } from '@modules/Banners/repositories/BannerRepositories.interface';
import { BannerRepository } from '@modules/Banners/repositories/BannerRepository';
import { IExamsRepository } from '@modules/Exams/repositories/ExamsRepositories.interface';
import { ExamRepository } from '@modules/Exams/repositories/ExamsRepository';
import { IPatientDataRepository } from '@modules/PatientData/repositories/PatientDataRepositories.interface';
import { PatientDataRepository } from '@modules/PatientData/repositories/PatientDataRepository';
import { IPatientMenuRepository } from '@modules/PatientMenu/repositories/PatienteMenuRepositories.interface';
import { PatientMenuRepository } from '@modules/PatientMenu/repositories/PatientMenuRepository';
import { IPhysicalActivityRepository } from '@modules/PhysicalActivity/repositories/PhysicalActivityRepositories.interface';
import { PhysicalActivityRepository } from '@modules/PhysicalActivity/repositories/PhysicalActivityRespository';
import { ICertificateRepository } from '@modules/Certificates/repositories/CertificateRepositories.interface';
import { CertificateRepository } from '@modules/Certificates/repositories/CertificateRepository';
import { IDocExamsRepository } from '@modules/DocExams/repositories/DocExamsRepositories.interface';
import { DocExamsRepository } from '@modules/DocExams/repositories/DocExamsRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IPlansRepository>('PlanRepository', PlanRepository);
container.registerSingleton<ICommentsRepository>('CommentRepository', CommentRepository);
container.registerSingleton<IBannerRepository>('BannerRepository', BannerRepository);
container.registerSingleton<IExamsRepository>('ExamRepository', ExamRepository);
container.registerSingleton<IPatientDataRepository>('PatientDataRepository', PatientDataRepository);
container.registerSingleton<IPatientMenuRepository>('PatientMenuRepository', PatientMenuRepository);
container.registerSingleton<IPhysicalActivityRepository>('PhysicalActivityRepository', PhysicalActivityRepository);
container.registerSingleton<ICertificateRepository>('CertificateRepository', CertificateRepository);
container.registerSingleton<IDocExamsRepository>('DocExamsRepository', DocExamsRepository);
