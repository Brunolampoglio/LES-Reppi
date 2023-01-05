import { CreateTermsOfUseService } from "../services/CreateTermsOfUse.service";
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateTermsOfUseService } from "../services/UpdateTermsOfUse.service";
import { ShowTermsOfUseService } from "../services/ShowTermsOfUse.service";
import { DeleteTermsOfUseService } from "../services/DeleteTermsOfUse.service";

class TermsOfUseController {

  async create(req: Request, res: Response): Promise<Response> {
    const { description } = req.body;

    const createTermsOfUseService = container.resolve(CreateTermsOfUseService);

    const termsOfUseCreated = await createTermsOfUseService.execute({
      description,
    });

    return res.status(201).json(termsOfUseCreated);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { description } = req.body;

    const updateTermsOfUseService = container.resolve(UpdateTermsOfUseService);

    const termsOfUseUpdated = await updateTermsOfUseService.execute({
      description,
      isMaster: req.user.isMaster,
    });

    return res.status(201).json(termsOfUseUpdated);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const showTermsOfUseService = container.resolve(ShowTermsOfUseService);

    const termsOfUse = await showTermsOfUseService.execute();

    return res.status(201).json(termsOfUse);

  }

  async delete(req: Request, res: Response): Promise<Response> {
    const deleteTermsOfUseService = container.resolve(DeleteTermsOfUseService);

     await deleteTermsOfUseService.execute({
      isMaster: req.user.isMaster,
    });

    return res.status(204).json();
  }


}
export { TermsOfUseController };
