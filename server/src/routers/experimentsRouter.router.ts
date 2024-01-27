import { Router } from 'express';
import { experimentsController } from '../controllers/experimentsController.controller';

export const experimentsRouter = () => {
    const router = Router();
    router.get('/', experimentsController.getExperiments);
    router.get('/:id', experimentsController.getExperiment);
    router.get('/:id/content', experimentsController.getExperimentContent);
    router.post('/create', experimentsController.createExperiment);
    router.put('/', experimentsController.updateExperiment);
    router.put('/agent', experimentsController.updateActiveAgent);
    router.put('/status', experimentsController.updateExperimentsStatus);
    router.put('/content', experimentsController.updateExperimentDisplaySetting);

    return router;
};
