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
    agent: AgentType;
    userId: string;
    imsPre?: object;
    imsPost?: object;
}

export interface UserType {
    _id: string;
    experimentId: string;
    username: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    biologicalSex: string;
    maritalStatus: string;
    childrenNumber: number;
    nativeEnglishSpeaker: boolean;
    createdAt: Date;
    timestamp: number;
    isAdmin: boolean;
    password?: string;
    numberOfConversations: number;
    agent: AgentType;
}

export interface AgentType {
    _id: string;
    title: string;
    summary: string;
    systemStarterPrompt: string;
    beforeUserSentencePrompt: string;
    afterUserSentencePrompt: string;
    firstChatSentence: string;
    model: string;
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
    stopSequences: { value: string; id: string }[];
}

export type AbAgentsType = {
    agentA: AgentType;
    distA: number;
    agentB: AgentType;
    distB: number;
};

export const AgentsModes = {
    SINGLE: 'Single',
    AB: 'A/B',
} as const;

export interface DisplaySettings {
    welcomeContent: string;
    welcomeHeader: string;
}

export interface ExperimentType {
    _id: string;
    agentsMode: string;
    activeAgent: AgentType;
    abAgents: AbAgentsType;
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
    username: string;
    age: number | string;
    gender: string;
    biologicalSex: string;
    maritalStatus: string;
    childrenNumber: number;
    nativeEnglishSpeaker: string | boolean;
}

export interface ExperimentContentType {
    content: DisplaySettings;
    isActive: boolean;
}
