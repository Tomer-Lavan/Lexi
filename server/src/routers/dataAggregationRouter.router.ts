import { Router } from 'express';
import { dataAggregationController } from '../controllers/dataAggregationController.controller';

export const dataAggregationRouter = () => {
    const router = Router();
    router.get('/', dataAggregationController.getExperimentData);
    router.get('/excel', dataAggregationController.getExperimentExcel);

    return router;
};
