import ExcelJS from 'exceljs';
import { conversationsService } from './conversations.service';
import { experimentsService } from './experiments.service';
import { usersService } from './users.service';

const mainSheetCol = [
    { header: 'Models Mode', key: 'modelsMode' },
    { header: 'Total Number of Participants', key: 'totalParticipants' },
];

const modelsSheetCol = [
    { header: 'Number of Participants', key: 'numParticipants' },
    { header: 'Condition Title', key: 'conditionTitle' },
    { header: 'Summary', key: 'summary' },
    { header: 'System Starter Prompt', key: 'systemStarterPrompt' },
    { header: 'Before User Sentence Prompt', key: 'beforeUserSentencePrompt' },
    { header: 'After User Sentence Prompt', key: 'afterUserSentencePrompt' },
    { header: 'First Chat Sentence', key: 'firstChatSentence' },
    { header: 'Chat Model', key: 'chatModel' },
    { header: 'Temperature', key: 'temperature' },
    { header: 'Max Tokens', key: 'maxTokens' },
    { header: 'Top P', key: 'topP' },
    { header: 'Frequency Penalty', key: 'frequencyPenalty' },
    { header: 'Presence Penalty', key: 'presencePenalty' },
    { header: 'Stop Sequences', key: 'stopSequences' },
];

const usersSheetCol = [
    { header: 'Model Link', key: 'modelLink' },
    { header: 'User ID', key: 'userId' },
    { header: 'Number of Conversations', key: 'numberOfConversations' },
    { header: 'Age', key: 'age' },
    { header: 'Gender', key: 'gender' },
    { header: 'Biological Sex', key: 'biologicalSex' },
    { header: 'Marital Status', key: 'maritalStatus' },
    { header: 'Religious Affiliation', key: 'religiousAffiliation' },
    { header: 'Ethnicity', key: 'ethnicity' },
    { header: 'Political Affiliation', key: 'politicalAffiliation' },
    { header: 'Number of Children', key: 'childrenNumber' },
    { header: 'Created At', key: 'createdAt' },
];

const conversationsSheetCol = [
    { header: 'Model Link', key: 'modelLink' },
    { header: 'User Link', key: 'userLink' },
    { header: 'Conversation ID', key: 'conversationId' },
    { header: 'Conversation Number', key: 'conversationNumber' },
    { header: 'Number Of Messages', key: 'messagesNumber' },
    { header: 'Created At', key: 'createdAt' },
    { header: 'Last Message Date', key: 'lastMessageDate' },
    { header: 'Ims Pre', key: 'imsPre' },
    { header: 'Ims Post', key: 'imsPost' },
];

const messagesSheetCol = [
    { header: 'Model Link', key: 'modelLink' },
    { header: 'User Link', key: 'userLink' },
    { header: 'Conversation Link', key: 'conversationLink' },
    { header: 'User Conversation Nuber', key: 'conversationNumber' },
    { header: 'Message ID', key: 'messageId' },
    { header: 'Content', key: 'content' },
    { header: 'Role', key: 'role' },
    { header: 'Created At', key: 'createdAt' },
];

class DataAggregationService {
    getExperimentData = async (experimentId: string) => {
        const [experimentUsers, experiment] = await Promise.all([
            usersService.getExperimentUsers(experimentId),
            experimentsService.getExperiment(experimentId),
        ]);

        const models = [];
        let totalUsers = 0;
        for (const users of experimentUsers) {
            totalUsers += users.data.length;
            const data = [];
            for (const user of users.data) {
                const conversations = await conversationsService.getUserConversations(user._id);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { model, ...userWithoutModel } = user;
                data.push({
                    numberOfConversations: user.numberOfConversations,
                    user: userWithoutModel,
                    conversations,
                });
            }

            models.push({
                numberOfParticipants: users.data.length,
                condition: users.model,
                data,
            });
        }

        return {
            modelsMode: experiment.modelsMode,
            numberOfParticipants: totalUsers,
            models,
        };
    };

    createExperimentDataExcel = async (experimentId) => {
        const experimentData = await this.getExperimentData(experimentId);
        const workbook = new ExcelJS.Workbook();

        const mainSheet = workbook.addWorksheet('Main');
        const modelsSheet = workbook.addWorksheet('Models');
        const usersSheet = workbook.addWorksheet('Users');
        const conversationsSheet = workbook.addWorksheet('Conversations');
        const messagesSheet = workbook.addWorksheet('Messages');

        mainSheet.columns = mainSheetCol;
        modelsSheet.columns = modelsSheetCol;
        usersSheet.columns = usersSheetCol;
        conversationsSheet.columns = conversationsSheetCol;
        messagesSheet.columns = messagesSheetCol;

        mainSheet.addRow({
            modelsMode: experimentData.modelsMode,
            totalParticipants: experimentData.numberOfParticipants,
        });

        let userRowIndex = 1;
        let conversationRowIndex = 1;
        let modelRowIndex = 1;

        experimentData.models.forEach((model) => {
            modelsSheet.addRow({
                numParticipants: model.numberOfParticipants,
                conditionTitle: model.condition.title,
                summary: model.condition.summary,
                systemStarterPrompt: model.condition.systemStarterPrompt,
                beforeUserSentencePrompt: model.condition.beforeUserSentencePrompt,
                afterUserSentencePrompt: model.condition.afterUserSentencePrompt,
                firstChatSentence: model.condition.firstChatSentence,
                chatModel: model.condition.chatModel,
                temperature: model.condition.temperature,
                maxTokens: model.condition.maxTokens,
                topP: model.condition.topP,
                frequencyPenalty: model.condition.frequencyPenalty,
                presencePenalty: model.condition.presencePenalty,
                stopSequences: model.condition.stopSequences,
            });

            model.data.forEach((user) => {
                usersSheet.addRow({
                    modelLink: {
                        text: `Model ${modelRowIndex}`,
                        hyperlink: `#\'Models\'!A${modelRowIndex + 1}`,
                    },
                    userId: user.user._id,
                    numberOfConversations: user.numberOfConversations,
                    age: user.user.age,
                    gender: user.user.gender,
                    biologicalSex: user.user.biologicalSex,
                    maritalStatus: user.user.maritalStatus,
                    religiousAffiliation: user.user.religiousAffiliation,
                    ethnicity: user.user.ethnicity,
                    politicalAffiliation: user.user.politicalAffiliation,
                    childrenNumber: user.user.childrenNumber,
                    createdAt: user.user.createdAt,
                });

                user.conversations.forEach((conversation) => {
                    conversationsSheet.addRow({
                        modelLink: {
                            text: `Model ${modelRowIndex}`,
                            hyperlink: `#\'Models\'!A${modelRowIndex + 1}`,
                        },
                        userLink: {
                            text: `User ${userRowIndex}`,
                            hyperlink: `#\'Users\'!A${userRowIndex + 1}`,
                        },
                        conversationId: conversation.metadata._id,
                        conversationNumber: conversation.metadata.conversationNumber,
                        messagesNumber: conversation.metadata.messagesNumber,
                        createdAt: conversation.metadata.createdAt,
                        lastMessageDate: conversation.metadata.lastMessageDate,
                        imsPre: conversation.metadata.imsPost ? Object.values(conversation.metadata.imsPre) : [],
                        imsPost: conversation.metadata.imsPost ? Object.values(conversation.metadata.imsPost) : [],
                    });

                    conversation.conversation.forEach((message) => {
                        messagesSheet.addRow({
                            modelLink: {
                                text: `Model ${modelRowIndex}`,
                                hyperlink: `#\'Models\'!A${modelRowIndex + 1}`,
                            },
                            userLink: {
                                text: `User ${userRowIndex}`,
                                hyperlink: `#\'Users\'!A${userRowIndex + 1}`,
                            },
                            conversationLink: {
                                text: `Conversation ${conversationRowIndex}`,
                                hyperlink: `#\'Conversations\'!A${conversationRowIndex + 1}`,
                            },
                            conversationNumber: conversation.metadata.conversationNumber,
                            messageId: message._id,
                            content: message.content,
                            role: message.role,
                            createdAt: message.createdAt,
                        });
                    });

                    conversationRowIndex++;
                });

                userRowIndex++;
            });
            modelRowIndex++;
        });

        return workbook;
    };
}

export const dataAggregationService = new DataAggregationService();
