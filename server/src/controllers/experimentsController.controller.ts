import { Request, Response } from 'express';
import { conversationsService } from '../services/conversations.service';
import { experimentsService } from '../services/experiments.service';
import { formsService } from '../services/forms.service';
import { usersService } from '../services/users.service';
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

    getRegistrationForm = requestHandler(async (req: Request, res: Response) => {
        const experimentId = req.params.id as string;
        const experiment = await experimentsService.getExperiment(experimentId);
        if (experiment.experimentForms?.registration) {
            const form = await formsService.getForm(experiment.experimentForms?.registration);
            res.status(200).send(form);
            return;
        }
        res.status(200).send(null);
    });

    getConversationForms = requestHandler(async (req: Request, res: Response) => {
        const experimentId = req.params.id as string;
        const experiment = await experimentsService.getExperiment(experimentId);
        const forms = await formsService.getConversationForms(
            experiment.experimentForms?.preConversation,
            experiment.experimentForms?.postConversation,
        );
        res.status(200).send(forms);
    });

    getAllExperimentsByAgentId = requestHandler(async (req: Request, res: Response) => {
        const { agentId } = req.query;
        const experiments = await experimentsService.getAllExperimentsByAgentId(agentId as string);
        res.status(200).send(experiments);
    });

    getExperimentFeatures = requestHandler(async (req: Request, res: Response) => {
        const experimentId = req.params.id as string;
        const experimentFeatures = await experimentsService.getExperimentFeatures(experimentId);

        res.status(200).send(experimentFeatures);
    });

    deleteExperiment = requestHandler(async (req: Request, res: Response) => {
        const experimentId = req.params.id as string;
        await Promise.all([
            experimentsService.deleteExperiment(experimentId),
            usersService.deleteExperimentUsers(experimentId),
            conversationsService.deleteExperimentConversations(experimentId),
        ]);

        res.status(200).send();
    });
}

export const experimentsController = new ExperimentsController();
