import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { conversationsService } from '../services/conversations.service';
import { requestHandler } from '../utils/requestHandler';

class ConvesationsController {
    message = requestHandler(async (req: Request, res: Response) => {
        const { message, conversationId }: { message: any; conversationId: string } = req.body;
        const response = await conversationsService.message(message, conversationId);
        res.status(200).send({ message: response });
    });

    streamMessage = requestHandler(
        async (req: Request, res: Response) => {
            const conversationId = req.query.conversationId as string;
            const role = req.query.role as string;
            const content = req.query.content as string;
            const message = { role, content };

            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
            });

            const streamResponse = async (partialMessage) => {
                res.write(`data: ${JSON.stringify({ message: partialMessage })}\n\n`);
            };

            const closeStream = async () => {
                res.write('event: close\ndata: \n\n');
                res.end();
            };

            await conversationsService.message(message, conversationId, streamResponse);
            closeStream();
        },
        (req, res) => {
            res.write(`data: ${JSON.stringify({ error: 'Internal Server Error' })}\n\n`);
            res.end();
        },
    );

    createConversation = requestHandler(async (req: Request, res: Response) => {
        const { userId, numberOfConversations, experimentId } = req.body;
        const conversationId = await conversationsService.createConversation(
            userId,
            numberOfConversations,
            experimentId,
        );
        res.cookie('conversationId', conversationId, {
            secure: true,
            sameSite: 'none',
        });
        res.status(200).send(conversationId);
    });

    getConversation = requestHandler(async (req: Request, res: Response) => {
        const conversationId = req.query.conversationId as string;

        if (!conversationId || !mongoose.Types.ObjectId.isValid(conversationId)) {
            res.status(401).send('Invalid convesationId');
            console.warn(`Invalid convesationId: ${conversationId}`);
            return;
        }

        const conversation = await conversationsService.getConversation(conversationId);

        res.status(200).send(conversation);
    });

    updateIms = requestHandler(async (req: Request, res: Response) => {
        const { conversationId, imsValues, isPreConversation } = req.body;

        await conversationsService.updateIms(conversationId, imsValues, isPreConversation);

        res.status(200).send();
    });
}

export const convesationsController = new ConvesationsController();
