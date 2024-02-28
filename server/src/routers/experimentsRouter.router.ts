import { Router } from 'express';
import { experimentsController } from '../controllers/experimentsController.controller';

export const experimentsRouter = () => {
    const router = Router();
    router.get('/', experimentsController.getExperiments);
    router.get('/agent', experimentsController.getAllExperimentsByAgentId);
    router.get('/:id', experimentsController.getExperiment);
    router.get('/:id/features', experimentsController.getExperimentFeatures);
    router.get('/:id/content', experimentsController.getExperimentContent);
    router.get('/:id/registrationForm', experimentsController.getRegistrationForm);
    router.get('/:id/conversationForms', experimentsController.getConversationForms);
    router.post('/create', experimentsController.createExperiment);
    router.put('/', experimentsController.updateExperiment);
    router.put('/status', experimentsController.updateExperimentsStatus);
    router.put('/content', experimentsController.updateExperimentDisplaySetting);
    router.delete('/:id', experimentsController.deleteExperiment);

    return router;
};
