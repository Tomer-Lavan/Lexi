export interface MessageType {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface ConversationType {
    conversationId: string;
    content: string;
    role: string;
    createdAt: Date;
    timestamp: number;
    messageNumber: number;
}

export interface MetadataConversationType {
    _id: string;
    experimentId: string;
    messagesNumber: number;
    createdAt: Date;
    timestamp: number;
    lastMessageDate: Date;
    lastMessageTimestamp: number;
    conversationNumber: number;
    model: ModelType;
    userId: string;
    imsPre?: object;
    imsPost?: object;
}

export interface UserType {
    _id: string;
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
    model: ModelType;
}

export interface ModelType {
    _id: string;
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
    stopSequences: { value: string; id: string }[];
}

export type AbModelsType = {
    modelA: ModelType;
    distA: number;
    modelB: ModelType;
    distB: number;
};

export const ModelsModes = {
    SINGLE: 'Single',
    AB: 'A/B',
} as const;

export interface DisplaySettings {
    welcomeContent: string;
    welcomeHeader: string;
}

export interface ExperimentType {
    _id: string;
    modelsMode: string;
    activeModel: ModelType;
    abModels: AbModelsType;
    createdAt: Date;
    timestamp: number;
    welcomeText: string;
    welcomeCSS: object;
    displaySettings: DisplaySettings;
    isActive: boolean;
    title: string;
    description: string;
    numberOfParticipants: number;
}

export interface NewUserInfoType {
    nickname: string;
    age: number | string;
    gender: string;
    biologicalSex: string;
    maritalStatus: string;
    religiousAffiliation: string;
    ethnicity: string;
    politicalAffiliation: number;
    childrenNumber: number;
}

export interface ExperimentContentType {
    content: DisplaySettings;
    isActive: boolean;
}
