import { Router } from 'express';
import { modelsController } from '../controllers/modelsController.controller';

export const modelsRouter = () => {
    const router = Router();
    router.post('/', modelsController.saveModel);
    router.get('/', modelsController.getModels);
    router.put('/', modelsController.updateModel);

    return router;
};
