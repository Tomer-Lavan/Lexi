import { Request, Response } from 'express';
import { agentsService } from '../services/agents.service';
import { requestHandler } from '../utils/requestHandler';

class AgentsController {
    getAgents = requestHandler(async (req: Request, res: Response) => {
        const agents = await agentsService.getAllAgents();
        res.status(200).send(agents);
    });

    getAgentLean = requestHandler(async (req: Request, res: Response) => {
        const agentId = req.params.id as string;
        const agent = await agentsService.getAgentLean(agentId);
        res.status(200).send(agent);
    });

    saveAgent = requestHandler(async (req: Request, res: Response) => {
        const { agent } = req.body;
        const savedSetting = await agentsService.saveAgent(agent);
        res.status(200).send(savedSetting);
    });

    updateAgent = requestHandler(async (req: Request, res: Response) => {
        const { agent } = req.body;
        const response = await agentsService.updateAgents(agent);
        res.status(200).send(response);
    });
}

export const agentsController = new AgentsController();
