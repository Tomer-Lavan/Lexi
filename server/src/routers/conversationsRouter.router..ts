import { Router } from 'express';
import { convesationsController } from '../controllers/conversationsController.controller';

export const conversationsRouter = () => {
    const router = Router();
    router.get('/conversation', convesationsController.getConversation);
    router.post('/message', convesationsController.message);
    router.get('/message/stream', convesationsController.streamMessage);
    router.post('/create', convesationsController.createConversation);
    router.put('/ims', convesationsController.updateIms);

    return router;
};
