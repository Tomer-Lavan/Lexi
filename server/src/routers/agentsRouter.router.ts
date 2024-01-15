import { Router } from 'express';
import { agentsController } from '../controllers/agentsController.controller';

export const agentsRouter = () => {
    const router = Router();
    router.post('/', agentsController.saveAgent);
    router.get('/', agentsController.getAgents);
    router.put('/', agentsController.updateAgent);

    return router;
};
