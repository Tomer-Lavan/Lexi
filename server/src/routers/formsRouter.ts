import { Router } from 'express';
import { formsController } from '../controllers/formsController';

export const formsRouter = () => {
    const router = Router();
    router.post('/', formsController.saveForm);
    router.get('/', formsController.getForms);
    router.get('/:id', formsController.getForm);
    router.put('/', formsController.updateForm);
    router.delete('/:id', formsController.deleteForm);

    return router;
};
