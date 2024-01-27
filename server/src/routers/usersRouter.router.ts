import { Router } from 'express';
import { usersController } from '../controllers/usersController.controller';

export const usersRouter = () => {
    const router = Router();
    router.post('/create', usersController.createUser);
    router.post('/login', usersController.login);
    router.post('/logout', usersController.logout);
    router.get('/user', usersController.getActiveUser);
    router.get('/validate', usersController.validateUserName);

    return router;
};
