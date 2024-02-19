import { Request, Response } from 'express';
import { dataAggregationService } from '../services/dataAggregation.service';
import { requestHandler } from '../utils/requestHandler';

class DataAggregationController {
    getExperimentData = requestHandler(async (req: Request, res: Response) => {
        const experimentId = req.query.experimentId as string;
        const response = await dataAggregationService.getExperimentData(experimentId);
        res.status(200).send({ message: response });
    });

    getExperimentExcel = requestHandler(async (req, res) => {
        const experimentId = req.query.experimentId as string;
        const workbook = await dataAggregationService.createExperimentDataExcel(experimentId);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=ExperimentData.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    });
}

export const dataAggregationController = new DataAggregationController();
