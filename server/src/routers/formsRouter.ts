import { Router } from 'express';
import { formsController } from '../controllers/formsController';

export const formsRouter = () => {
    const router = Router();
    router.post('/', formsController.saveForm);
    router.get('/', formsController.getForms);
    router.put('/', formsController.updateForm);

    return router;
};
