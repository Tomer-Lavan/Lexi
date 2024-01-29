import mongoose from 'mongoose';

interface SelectionOption {
    label: string;
    value: string;
}

export interface BinaryRadioSelectorProps {
    fieldKey: string;
    label: string;
}

interface ScaleRadioProps {
    label?: string;
    left: string;
    right: string;
    range: number;
    fieldKey: string;
}

interface SelectionTextInputProps {
    selectionOptions: SelectionOption[];
    fieldKey: string;
    label: string;
}

interface NumberInputProps {
    fieldKey: string;
    label: string;
    min: number;
    max: number;
}

interface RadioSelectionProps {
    label: string;
    fieldKey: string;
    selectionOptions: SelectionOption[];
}

export type QuestionTypeProps =
    | BinaryRadioSelectorProps
    | ScaleRadioProps
    | SelectionTextInputProps
    | NumberInputProps
    | RadioSelectionProps;

type QuestionType =
    | 'scale-radio'
    | 'selection-text-input'
    | 'radio-selection'
    | 'number-input'
    | 'binary-radio-selector';

export interface IForm {
    _id?: mongoose.Types.ObjectId;
    name: string;
    title: string;
    instructions: string;
    questions: Array<{ type: QuestionType; props: QuestionTypeProps }>;
}
