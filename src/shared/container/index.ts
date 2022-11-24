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

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IPlansRepository>('PlanRepository', PlanRepository)
container.registerSingleton<ICommentsRepository>('CommentRepository', CommentRepository)
container.registerSingleton<IBannerRepository>('BannerRepository', BannerRepository)
