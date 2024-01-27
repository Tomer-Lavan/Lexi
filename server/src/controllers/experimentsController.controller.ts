import { Request, Response } from 'express';
import { experimentsService } from '../services/experiments.service';
import { requestHandler } from '../utils/requestHandler';

class ExperimentsController {
    getExperiments = requestHandler(async (req: Request, res: Response) => {
        const experiments = await experimentsService.getExperiments();
        res.status(200).send(experiments);
    });

    getExperiment = requestHandler(async (req: Request, res: Response) => {
        const experimentId = req.params.id as string;
        const experiments = await experimentsService.getExperiment(experimentId);
        res.status(200).send(experiments);
    });

    getExperimentContent = requestHandler(async (req: Request, res: Response) => {
        const experimentId = req.params.id as string;
        const experiment = await experimentsService.getExperiment(experimentId);
        res.status(200).send({ content: experiment.displaySettings, isActive: experiment.isActive });
    });

    createExperiment = requestHandler(async (req: Request, res: Response) => {
        const { experiment } = req.body;
        const savedExperiment = await experimentsService.createExperiment(experiment);
        res.status(200).send(savedExperiment);
    });

    updateActiveAgent = requestHandler(async (req: Request, res: Response) => {
        const { experimentId, agent, agentsConfig, abAgents } = req.body;
        await experimentsService.updateActiveAgent(experimentId, agent, agentsConfig, abAgents);
        res.status(200).send();
    });

    updateExperimentsStatus = requestHandler(async (req: Request, res: Response) => {
        const { modifiedExperiments } = req.body;
        await experimentsService.updateExperimentsStatus(modifiedExperiments);
        res.status(200).send();
    });

    updateExperimentDisplaySetting = requestHandler(async (req: Request, res: Response) => {
        const { experimentId, displaySettings } = req.body;
        await experimentsService.updateExperimentDisplaySettings(experimentId, displaySettings);
        res.status(200).send();
    });

    updateExperiment = requestHandler(async (req: Request, res: Response) => {
        const { experiment } = req.body;
        await experimentsService.updateExperiment(experiment);
        res.status(200).send();
    });
}

export const experimentsController = new ExperimentsController();
