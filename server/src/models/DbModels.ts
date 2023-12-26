import mongoose, { Schema } from 'mongoose';

export interface SettingsDocument extends Document {
    _id?: mongoose.Types.ObjectId;
    title: string;
    summary: string;
    systemStarterPrompt: string;
    beforeUserSentencePrompt: string;
    afterUserSentencePrompt: string;
    firstChatSentence: string;
    chatModel: string;
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
    stopSequences: string[];
}

interface AbModels {
    modelA: SettingsDocument;
    distA: number;
    modelB: SettingsDocument;
    distB: number;
}

export interface SystemSettingsDocument extends Document {
    _id: mongoose.Types.ObjectId;
    modelsConfig: number;
    activeModel: SettingsDocument;
    abModels: AbModels;
}

export interface DisplaySettings {
    welcomeContent: string;
    welcomeHeader: string;
}

export interface ExperimentsDocument extends Document {
    _id: mongoose.Types.ObjectId;
    modelsMode: string;
    activeModel: SettingsDocument;
    abModels: AbModels;
    createdAt: Date;
    timestamp: number;
    displaySettings: DisplaySettings;
    isActive: boolean;
    title: string;
    description: string;
    numberOfParticipants: number;
}

export interface ConversationDocument extends Document {
    conversationId: string;
    content: string;
    role: string;
    createdAt: Date;
    timestamp: number;
    messageNumber: number;
}

export interface MetadataConversationDocument extends Document {
    _id: mongoose.Types.ObjectId;
    experimentId: string;
    messagesNumber: number;
    createdAt: Date;
    timestamp: number;
    lastMessageDate: Date;
    lastMessageTimestamp: number;
    conversationNumber: number;
    model: SettingsDocument;
    userId: string;
    imsPre?: object;
    imsPost?: object;
}

export interface UserDocument extends Document {
    _id?: string;
    experimentId: string;
    nickname: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    biologicalSex: string;
    maritalStatus: string;
    religiousAffiliation: string;
    ethnicity: string;
    politicalAffiliation: string;
    childrenNumber: number;
    createdAt: Date;
    timestamp: number;
    isAdmin: boolean;
    password?: string;
    numberOfConversations: number;
    model: SettingsDocument;
}

export const settingsSchema = new Schema<SettingsDocument>(
    {
        title: { type: String, required: true },
        summary: { type: String, required: false },
        systemStarterPrompt: { type: String, required: false },
        beforeUserSentencePrompt: { type: String, required: false },
        afterUserSentencePrompt: { type: String, required: false },
        firstChatSentence: { type: String, required: true },
        chatModel: { type: String, required: true },
        temperature: { type: Number },
        maxTokens: { type: Number },
        topP: { type: Number },
        frequencyPenalty: { type: Number },
        presencePenalty: { type: Number },
        stopSequences: { type: [String] },
    },
    { versionKey: false },
);

const AbModelsSchema = new Schema<AbModels>({
    distA: { type: Number, required: true },
    modelA: { type: settingsSchema, required: true },
    distB: { type: Number, required: true },
    modelB: { type: settingsSchema, required: true },
});

export const systemSettingsSchema = new Schema<SystemSettingsDocument>(
    {
        modelsConfig: { type: Number, required: true },
        activeModel: { type: settingsSchema, required: true },
        abModels: { type: AbModelsSchema },
    },
    { versionKey: false },
);

export const experimentsSchema = new Schema<ExperimentsDocument>(
    {
        modelsMode: { type: String, required: true },
        activeModel: { type: settingsSchema },
        abModels: { type: AbModelsSchema },
        createdAt: { type: Date, default: Date.now },
        timestamp: { type: Number, default: () => Date.now() },
        displaySettings: { type: Object },
        isActive: { type: Boolean },
        title: { type: String },
        description: { type: String },
        numberOfParticipants: { type: Number, default: () => 0 },
    },
    { versionKey: false },
);

export const conversationSchema = new Schema<ConversationDocument>(
    {
        conversationId: { type: String, required: true },
        content: { type: String, required: true },
        role: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        timestamp: { type: Number, default: () => Date.now() },
        messageNumber: { type: Number, required: true },
    },
    { versionKey: false },
);

export const metadataConversationSchema = new Schema<MetadataConversationDocument>(
    {
        experimentId: { type: String, required: true },
        messagesNumber: { type: Number, default: () => 0 },
        createdAt: { type: Date, default: Date.now },
        timestamp: { type: Number, default: () => Date.now() },
        lastMessageDate: { type: Date, default: Date.now },
        lastMessageTimestamp: { type: Number, default: () => Date.now() },
        imsPre: { type: Object },
        imsPost: { type: Object },
        conversationNumber: { type: Number },
        userId: { type: String, required: true },
        model: { type: settingsSchema, required: true },
    },
    { versionKey: false },
);

export const userSchema = new Schema<UserDocument>(
    {
        experimentId: { type: String, required: true },
        nickname: { type: String, required: true, unique: true },
        age: { type: Number },
        gender: { type: String },
        biologicalSex: { type: String },
        maritalStatus: { type: String },
        religiousAffiliation: { type: String },
        ethnicity: { type: String },
        politicalAffiliation: { type: String },
        childrenNumber: { type: Number },
        createdAt: { type: Date, default: Date.now },
        timestamp: { type: Number, default: () => Date.now() },
        isAdmin: { type: Boolean, default: () => false },
        password: { type: String },
        numberOfConversations: { type: Number, default: () => 0 },
        model: { type: settingsSchema, required: true },
    },
    { versionKey: false },
);

export enum ModelConfig {
    SINGLE = 1,
    AB = 2,
}

export enum ModelsMode {
    SINGLE = 'Single',
    AB = 'A/B',
}

// {
//     modelsMode: ModelsMode.SINGLE,
//     numberOfParticipants: 0,
//     models: [
//         {
//         numberOfParticipants: 0,
//         condition: {
// }
//         data: [
//             {
//                 numberOfConversations: 0,
//                 user: {
//                 },
//                 conversations: [
//                     {
//                         metadata,
//                         conversation: [
//                         ]
//                     }
//                 ]
//             }
//         ]
//     ]
// }
