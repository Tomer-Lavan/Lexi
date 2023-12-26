type Activity = Record<string, string>;

export interface User {
    id: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    location: string;
    occupation: string;
    following: string[];
    followers: string[];
    activity: Activity[];
    isAdmin: boolean;
    posts: number[];
    rememberMe?: boolean;
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

export enum ModelsModes {
    SINGLE = 'Single',
    AB = 'A/B',
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
    displaySettings: object;
    isActive: boolean;
    title: string;
    description: string;
}
