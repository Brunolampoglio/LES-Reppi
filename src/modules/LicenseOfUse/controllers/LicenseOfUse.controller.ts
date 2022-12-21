
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateLicenseOfUseService } from '../services/CreateLicenseOfUse.service';
import { DeleteLicenseOfUseService } from '../services/DeleteLicenseOfUse.service';
import { ShowLicenseOfUseService } from '../services/ShowLicenseOfUse.service';
import { UpdateLicenseOfUseService } from '../services/UpdateLicenseOfUse.service';


class LicenseOfUseController {

  async create(req: Request, res: Response): Promise<Response> {
    const { description } = req.body;

    const createLicenseOfUseService = container.resolve(CreateLicenseOfUseService);

    const LicenseOfUseCreated = await createLicenseOfUseService.execute({
      description,
    });

    return res.status(201).json(LicenseOfUseCreated);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { description } = req.body;

    const updateLicenseOfUseService = container.resolve(UpdateLicenseOfUseService);

    const LicenseOfUseUpdated = await updateLicenseOfUseService.execute({
      description,
      isMaster: req.user.isMaster,
    });

    return res.status(201).json(LicenseOfUseUpdated);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const showLicenseOfUseService = container.resolve(ShowLicenseOfUseService);

    const LicenseOfUse = await showLicenseOfUseService.execute();

    return res.status(201).json(LicenseOfUse);

  }

  async delete(req: Request, res: Response): Promise<Response> {
    const deleteLicenseOfUseService = container.resolve(DeleteLicenseOfUseService);

     await deleteLicenseOfUseService.execute({
      isMaster: req.user.isMaster,
    });

    return res.status(204).json();
  }


}
export { LicenseOfUseController };
