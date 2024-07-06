import { AbAgentsType, AgentType, FormType } from '@models/AppModels';

export const defaultSliderSettings = {
    temperature: 1,
    maxTokens: 256,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
} as const;

export const agentsOptions = ['gpt-3.5-turbo', 'gpt-4-1106-preview'] as const;

export const defaultSettings: AgentType = {
    _id: '',
    title: '',
    summary: '',
    systemStarterPrompt: '',
    beforeUserSentencePrompt: '',
    afterUserSentencePrompt: '',
    firstChatSentence: '',
    model: agentsOptions[0],
    temperature: null,
    maxTokens: null,
    topP: null,
    frequencyPenalty: null,
    presencePenalty: null,
    stopSequences: [],
};

export const defaultAbAgents: AbAgentsType = {
    agentA: null,
    distA: 50,
    agentB: null,
    distB: 50,
} as const;

export const defaultExperiment = {
    title: '',
    description: '',
    agentsMode: 'Single',
    activeAgent: null,
    abAgents: null,
    isActive: true,
    maxMessages: undefined,
    maxConversations: undefined,
    maxParticipants: undefined,
    displaySettings: {
        welcomeHeader: 'Welcome',
        welcomeContent:
            'This is an experiment that is being carried out by Cambridge University.\nHere you will have a therapy session with a chat bot.\nThe conversation is completely anonymous.\nFeel free to share as you like.',
    },
    experimentForms: {
        registration: null,
        preConversation: null,
        postConversation: null,
    },
    experimentFeatures: {
        userAnnotation: false,
        streamMessage: false,
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
    AGENTS_PATH: 'agents',
    EXPERIMENTS_PATH: 'experiments',
    FORMS_PATH: 'forms',
} as const;

export const AdminSections = {
    AGENTS: 'agents',
    EXPERIMENTS: 'experiments',
    FORMS: 'forms',
    DATA: 'data',
    SETTINGS: 'settings',
} as const;

export const defaultQuestionProps = {
    'binary-radio-selector': { fieldKey: '', label: 'Example For a binary question:', required: true },
    'scale-radio': {
        fieldKey: '',
        label: 'Choose on the scale:',
        left: 'Left Option',
        right: 'Right Option',
        range: 5,
        required: true,
        numbered: false,
    },
    'selection-text-input': {
        fieldKey: '',
        label: 'Select an option',
        required: true,
        selectionOptions: [{ label: 'Option 1', value: 'option1' }],
    },
    'number-input': {
        fieldKey: '',
        label: 'Insert a number',
        min: 0,
        max: 100,
        defaultValue: null,
        required: true,
    },
    'radio-selection': {
        fieldKey: '',
        label: 'Select one of the following options:',
        required: true,
        selectionOptions: [{ label: 'Option 1', value: 'option1' }],
    },
};

export const defaultForm: FormType = {
    name: 'Untitled',
    title: '',
    instructions: '',
    questions: [{ type: 'selection-text-input', props: defaultQuestionProps['selection-text-input'] }],
};
