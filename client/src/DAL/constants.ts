import { AbModelsType, ModelType } from '@models/AppModels';

export const defaultSliderSettings = {
    temperature: 1,
    maxTokens: 256,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
} as const;

export const modelsOptions = ['gpt-3.5-turbo', 'gpt-4-1106-preview'] as const;

export const defaultSettings: ModelType = {
    _id: '',
    title: '',
    summary: '',
    systemStarterPrompt: '',
    beforeUserSentencePrompt: '',
    afterUserSentencePrompt: '',
    firstChatSentence: '',
    chatModel: modelsOptions[0],
    temperature: null,
    maxTokens: null,
    topP: null,
    frequencyPenalty: null,
    presencePenalty: null,
    stopSequences: [],
};

export const defaultAbModels: AbModelsType = {
    modelA: defaultSettings,
    distA: 50,
    modelB: defaultSettings,
    distB: 50,
} as const;

export const defaultExperiment = {
    title: '',
    description: '',
    modelsMode: 'Single',
    activeModel: defaultSettings,
    abModels: defaultAbModels,
    isActive: true,
    displaySettings: {
        welcomeHeader: 'Welcome',
        welcomeContent:
            'This is an experiment that is being carried out by Cambridge University.\nHere you will have a therapy session with a chat bot.\nThe conversation is completely anonymous.\nFeel free to share as you like.',
    },
} as const;

export const initialSlidersEnabled = {
    temperatureEnabled: false,
    maxTokensEnabled: false,
    topPEnabled: false,
    frequencyPenaltyEnabled: false,
    presencePenaltyEnabled: false,
} as const;

export const ApiPaths = {
    CONVERSATIONS_PATH: 'conversations',
    USERS_PATH: 'users',
    DATA_AGGREGATION_PATH: 'dataAggregation',
    MODELS_PATH: 'models',
    EXPERIMENTS_PATH: 'experiments',
} as const;

export const AdminSections = {
    MODELS: 'models',
    EXPERIMENTS: 'experiments',
    DATA: 'data',
    SETTINGS: 'settings',
} as const;
