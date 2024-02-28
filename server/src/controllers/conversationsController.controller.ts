import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { conversationsService } from '../services/conversations.service';
import { requestHandler } from '../utils/requestHandler';

class ConvesationsController {
    message = requestHandler(
        async (req: Request, res: Response) => {
            const { message, conversationId }: { message: any; conversationId: string } = req.body;
            this.validateMessage(message.content);

            const savedResponse = await conversationsService.message(message, conversationId);
            res.status(200).send(savedResponse);
        },
        (req, res, error) => {
            if (error.code === 403) {
                res.status(403).json({ message: 'Messages Limit Exceeded' });
                return;
            }
            if (error.code === 'context_length_exceeded') {
                res.status(400).json({ message: 'Message Is Too Long' });
                return;
            }
            res.status(500).json({ message: 'Internal Server Error' });
        },
    );

    streamMessage = requestHandler(
        async (req: Request, res: Response) => {
            const conversationId = req.query.conversationId as string;
            const role = req.query.role as string;
            const content = req.query.content as string;
            const message = { role, content };
            this.validateMessage(message.content);

            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
            });

            const streamResponse = async (partialMessage) => {
                res.write(`data: ${JSON.stringify({ message: partialMessage })}\n\n`);
            };

            const closeStream = async (message) => {
                res.write(`event: close\ndata: ${JSON.stringify(message)}\n\n`);
                res.end();
            };

            const savedResponse = await conversationsService.message(message, conversationId, streamResponse);
            closeStream(savedResponse);
        },
        (req, res, error) => {
            if (error.code === 403) {
                res.write(
                    `data: ${JSON.stringify({
                        error: { response: { status: 403, data: 'Messages Limit Exceeded' } },
                    })}\n\n`,
                );
                res.end();
                return;
            }
            if (error.code === 'context_length_exceeded') {
                res.write(
                    `data: ${JSON.stringify({
                        error: { response: { status: 400, data: 'Message Is Too Long' } },
                    })}\n\n`,
                );
                res.end();
                return;
            }
            res.write(
                `data: ${JSON.stringify({
                    error: { response: { status: 500, data: 'Internal Server Error' } },
                })}\n\n`,
            );
            res.end();
        },
    );

    createConversation = requestHandler(
        async (req: Request, res: Response) => {
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
        },
        (_, res, error) => {
            if (error.code === 403) {
                res.status(403).json({ message: 'Conversations Limit Exceeded' });
                return;
            }
            res.status(500).json({ message: 'Internal Server Error' });
        },
    );

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

    updateConversationMetadata = requestHandler(async (req: Request, res: Response) => {
        const { conversationId, data, isPreConversation } = req.body;

        await conversationsService.updateConversationSurveysData(conversationId, data, isPreConversation);

        res.status(200).send();
    });

    finishConversation = requestHandler(async (req: Request, res: Response) => {
        const { conversationId, experimentId, isAdmin } = req.body;

        await conversationsService.finishConversation(conversationId, experimentId, isAdmin);

        res.status(200).send();
    });

    updateUserAnnotation = requestHandler(async (req: Request, res: Response) => {
        const { messageId, userAnnotation } = req.body;
        await conversationsService.updateUserAnnotation(messageId, userAnnotation);

        res.status(200).send();
    });

    private validateMessage(message: string): void {
        if (typeof message !== 'string') {
            const error = new Error('Bad Request');
            error['code'] = 400;
            throw error;
        }

        const tokenLimit = 4096;
        const estimatedTokens = this.estimateTokenCount(message);

        if (estimatedTokens > tokenLimit) {
            const error = new Error('Message Is Too Long');
            error['code'] = 'context_length_exceeded';
            throw error;
        }
    }

    private estimateTokenCount(message: string): number {
        const charsPerToken = 4;
        return Math.ceil(message.length / charsPerToken);
    }
}

export const convesationsController = new ConvesationsController();
