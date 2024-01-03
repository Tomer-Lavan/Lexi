import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { OpenAI } from 'openai';
import { ConversationsModel } from '../models/ConversationsModel';
import { MetadataConversationsModel } from '../models/MetadataConversationsModel';
import { experimentsService } from './experiments.service';
import { usersService } from './users.service';

dotenv.config();

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

const { OPENAI_API_KEY } = process.env;
if (!OPENAI_API_KEY) throw new Error('Server is not configured with OpenAI API key');
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

class ConversationsService {
    message = async (message: any, conversationId: string, streamResponse?) => {
        const [conversation, metadataConversation] = await Promise.all([
            this.getConversation(conversationId),
            this.getConversationMetadata(conversationId),
        ]);
        const messages: any[] = this.getConversationMessages(metadataConversation.model, conversation, message);
        const chatRequest = this.getChatRequest(metadataConversation.model, messages);
        await this.createMessageDoc(message, conversationId, conversation.length + 1);

        let assistantMessage = '';

        if (!streamResponse) {
            const response = await openai.chat.completions.create(chatRequest);
            assistantMessage = response.choices[0].message.content?.trim();
        } else {
            const responseStream = await openai.chat.completions.create({ ...chatRequest, stream: true });
            for await (const partialResponse of responseStream) {
                const assistantMessagePart = partialResponse.choices[0]?.delta?.content || '';
                await streamResponse(assistantMessagePart);
                assistantMessage += assistantMessagePart;
            }
        }

        await this.createMessageDoc(
            {
                content: assistantMessage,
                role: 'assistant',
            },
            conversationId,
            conversation.length + 2,
        );

        this.updateConversationMetadata(conversationId, {
            $inc: { messagesNumber: 1 },
            $set: { lastMessageDate: new Date(), lastMessageTimestamp: Date.now() },
        });

        return assistantMessage;
    };

    createConversation = async (userId: string, userConversationsNumber: number, experimentId: string) => {
        let model;
        const user = await usersService.getUserById(userId);
        if (user.isAdmin) {
            model = await experimentsService.getActiveModel(experimentId);
        }

        const res = await MetadataConversationsModel.create({
            conversationNumber: userConversationsNumber + 1,
            experimentId,
            userId,
            model: user.isAdmin ? model : user.model,
        });

        const firstMessage: Message = {
            role: 'assistant',
            content: user.isAdmin ? model.firstChatSentence : user.model.firstChatSentence,
        };
        await this.createMessageDoc(firstMessage, res._id.toString(), 1);
        usersService.addConversation(userId);

        return res._id.toString();
    };

    getConversation = async (conversationId: string) => {
        const conversation = await ConversationsModel.find({ conversationId }, { _id: 0, role: 1, content: 1 });

        return conversation;
    };

    updateIms = async (conversationId: string, imsValues, isPreConversation: boolean) => {
        const saveField = isPreConversation ? { imsPre: imsValues } : { imsPost: imsValues };

        const res = await MetadataConversationsModel.updateMany(
            {
                _id: new mongoose.Types.ObjectId(conversationId),
            },
            { $set: saveField },
        );

        return res;
    };

    getConversationMetadata = async (conversationId: string): Promise<any> => {
        const res = await MetadataConversationsModel.findOne({ _id: new mongoose.Types.ObjectId(conversationId) });
        return res;
    };

    getUserConversations = async (userId: string): Promise<any> => {
        const conversations = [];
        const metadataConversations = await MetadataConversationsModel.find({ userId }, { model: 0 }).lean();

        for (const metadataConversation of metadataConversations) {
            const conversation = await ConversationsModel.find({
                conversationId: metadataConversation._id,
            }).lean();
            conversations.push({
                metadata: metadataConversation,
                conversation,
            });
        }

        return conversations;
    };

    private updateConversationMetadata = async (conversationId, fields) => {
        try {
            const res = await MetadataConversationsModel.updateOne(
                { _id: new mongoose.Types.ObjectId(conversationId) },
                fields,
            );
            return res;
        } catch (error) {
            console.error(`updateConversationMetadata - ${error}`);
        }
    };

    private getConversationMessages = (settings: any, conversation: any[], message: any) => {
        const systemPrompt: Message = { role: 'system', content: settings.systemStarterPrompt };
        const beforeUserMessage = { role: 'system', content: settings.beforeUserSentencePrompt };
        const afterUserMessage = { role: 'system', content: settings.afterUserSentencePrompt };

        const messages: any = [
            systemPrompt,
            ...conversation,
            beforeUserMessage,
            message,
            afterUserMessage,
            { role: 'assistant', content: '' },
        ];

        return messages;
    };

    private createMessageDoc = async (message: Message, conversationId: string, messageNumber: number) => {
        const res = await ConversationsModel.create({
            content: message.content,
            role: message.role,
            conversationId,
            messageNumber,
        });

        return res;
    };

    private getChatRequest = (model, messages) => {
        const chatCompletionsReq = {
            messages,
            model: model.chatModel,
        };

        if (model.maxTokens) chatCompletionsReq['max_tokens'] = model.maxTokens;
        if (model.frequencyPenalty) chatCompletionsReq['frequency_penalty'] = model.frequencyPenalty;
        if (model.topP) chatCompletionsReq['top_p'] = model.topP;
        if (model.temperature) chatCompletionsReq['temperature'] = model.temperature;
        if (model.presencePenalty) chatCompletionsReq['presence_penalty'] = model.presencePenalty;
        if (model.stopSequences) chatCompletionsReq['stop'] = model.stopSequences;

        return chatCompletionsReq;
    };
}

export const conversationsService = new ConversationsService();
