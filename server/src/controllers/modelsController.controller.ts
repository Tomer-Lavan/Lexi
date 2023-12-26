import { Request, Response } from 'express';
import { modelsService } from '../services/models.service';
import { requestHandler } from '../utils/requestHandler';

class ModelsController {
    getModels = requestHandler(async (req: Request, res: Response) => {
        const models = await modelsService.getAllModels();
        res.status(200).send(models);
    });

    saveModel = requestHandler(async (req: Request, res: Response) => {
        const { model } = req.body;
        const savedSetting = await modelsService.saveModel(model);
        res.status(200).send(savedSetting);
    });

    updateModel = requestHandler(async (req: Request, res: Response) => {
        const { model } = req.body;
        const response = await modelsService.updateModels(model);
        res.status(200).send(response);
    });
}

export const modelsController = new ModelsController();
