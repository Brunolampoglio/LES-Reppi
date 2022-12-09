import { CreatePatientMenuService } from "../services/CreatePatientMenu.service";
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeletePatientMenuService } from "../services/DeletePatientMenu.service";
import { UpdatePatientMenuService } from "../services/UpdatePatientMenu.service";
import { ListPatientMenuService } from "../services/ListPatientMenu.service";
class PatientMenuController {

    async create(req: Request, res: Response): Promise<Response> {
        const { dayofweek, description, hour, typeofmeal } = req.body;

        const { patientId } = req.params

        const createPatientMenuService = container.resolve(CreatePatientMenuService);

        const patientMenu = await createPatientMenuService.execute({
            dayofweek,
            description,
            patientId,
            hour,
            typeofmeal,
        });

        return res.status(201).json(patientMenu);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { patientMenuId } = req.params;

        const deletePatientMenuService = container.resolve(DeletePatientMenuService);

        await deletePatientMenuService.execute({
            patientMenuId,
        });

        return res.status(204).json();
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { patientMenuId } = req.params;

        const { dayofweek, description, hour, typeofmeal } = req.body;

        const updatePatientMenuService = container.resolve(UpdatePatientMenuService);

        const patientMenu = await updatePatientMenuService.execute({
            patientMenuId,
            dayofweek,
            description,
            hour,
            typeofmeal,
        });

        return res.status(200).json(patientMenu);
    }

    async list(req: Request, res: Response): Promise<Response> {
        const { patientId } = req.params;

        const listPatientMenuService = container.resolve(ListPatientMenuService);

        const patientMenu = await listPatientMenuService.execute({
            patientId,
        });

        return res.status(200).json(patientMenu);
    }
}

export { PatientMenuController };
