import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePhysicalActivityService } from "../services/CreatePhysicalActivity.service";
import { DeletePhysicalActivityService } from "../services/DeletePhysicalActivity.service";
import { ListPhysicalActivityService } from "../services/ListPhysicalActivity.service";
import { UpdatePhysicalActivityService } from "../services/UpdatePhysicalActivity.service";

class PhysicalActivityController {

    async create(req: Request, res: Response): Promise<Response> {
        const { description, repetitions, series, type } = req.body;

        const { client_id } = req.params

        const createPhysicalActivityService = container.resolve(CreatePhysicalActivityService);

        const physicalActivity = await createPhysicalActivityService.execute({
            description,
            repetitions,
            series,
            type,
            client_id
        });

        return res.status(201).json(physicalActivity);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { physicalActivityId } = req.params;

        const deletePhysicalActivityService = container.resolve(DeletePhysicalActivityService);

        await deletePhysicalActivityService.execute({
            physicalActivityId,
        });

        return res.status(204).json();
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { physicalActivityId } = req.params;

        const { description, repetitions, series, type } = req.body;

        const updatePhysicalActivityService = container.resolve(UpdatePhysicalActivityService);

        const physicalActivity = await updatePhysicalActivityService.execute({
            physicalActivityId,
            description,
            repetitions,
            series,
            type,
        });

        return res.status(200).json(physicalActivity);
    }

    async list(req: Request, res: Response): Promise<Response> {
        const { client_id } = req.params;

        const listPhysicalActivityService = container.resolve(ListPhysicalActivityService);

        const physicalActivities = await listPhysicalActivityService.execute({
            client_id,
        });

        return res.status(200).json(physicalActivities);
    }
}

export { PhysicalActivityController };
