import PropTypes from 'prop-types';
import React from 'react';
import {
    Control,
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import { BinaryRadioSelector } from './BinaryRadioSelector';
import { NumberInput } from './NumberInput';
import RadioSelection from './RadioSelection';
import ScaleRadio from './ScaleRadio';
import { SelectionTextInput } from './SelectionTextInput';

interface SelectionOption {
    label: string;
    value: string;
}

const validQuestionTypes = [
    'scale-radio',
    'selection-text-input',
    'radio-selection',
    'number-input',
    'binary-radio-selector',
] as const;

export type QuestionType = (typeof validQuestionTypes)[number];

export interface BinaryRadioSelectorProps {
    fieldKey: string;
    label: string;
    required: boolean;
}

interface ScaleRadioProps {
    fieldKey: string;
    label?: string;
    left: string;
    right: string;
    range: number;
    required: boolean;
    numbered?: boolean;
}

interface SelectionTextInputProps {
    selectionOptions: SelectionOption[];
    fieldKey: string;
    label: string;
    required: boolean;
}

interface NumberInputProps {
    fieldKey: string;
    label: string;
    min: number;
    max: number;
    defaultValue?: number;
    required: boolean;
}

interface RadioSelectionProps {
    label: string;
    fieldKey: string;
    selectionOptions: SelectionOption[];
    errors: FieldErrors;
    required: boolean;
}

export type QuestionTypeProps =
    | BinaryRadioSelectorProps
    | ScaleRadioProps
    | SelectionTextInputProps
    | NumberInputProps
    | RadioSelectionProps;

interface QuestionProps {
    type: QuestionType;
    props: QuestionTypeProps;
    register?: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    setValue?: UseFormSetValue<FieldValues>;
    getValues?: UseFormGetValues<FieldValues>;
    control?: Control<FieldValues>;
}

const Question: React.FC<QuestionProps> = ({ type, props, errors, register, getValues, setValue, control }) => {
    const registerOrUndefined = register ? register : () => undefined;
    const setValueOrUndefined = setValue ? setValue : () => undefined;
    const getValuesOrUndefined = getValues ? getValues : () => undefined;
    try {
        switch (type) {
            case 'binary-radio-selector':
                return (
                    <BinaryRadioSelector {...(props as BinaryRadioSelectorProps)} register={registerOrUndefined} />
                );
            case 'scale-radio':
                return <ScaleRadio {...(props as ScaleRadioProps)} control={control} errors={errors} />;
            case 'radio-selection':
                return (
                    <RadioSelection
                        {...(props as RadioSelectionProps)}
                        errors={errors}
                        register={registerOrUndefined}
                    />
                );
            case 'selection-text-input':
                return (
                    <SelectionTextInput
                        {...(props as SelectionTextInputProps)}
                        errors={errors}
                        register={registerOrUndefined}
                        getValues={getValuesOrUndefined}
                        setValue={setValueOrUndefined}
                    />
                );
            case 'number-input':
                return (
                    <NumberInput
                        {...(props as NumberInputProps)}
                        errors={errors}
                        register={registerOrUndefined}
                        getValues={getValuesOrUndefined}
                        setValue={setValueOrUndefined}
                    />
                );
            default:
                throw new Error(`Unsupported question type: ${type}`);
        }
    } catch (error) {
        console.error(error);
        return <div>An error occurred while rendering the question.</div>;
    }
};

Question.propTypes = {
    type: PropTypes.oneOf(validQuestionTypes).isRequired,
};

export default Question;
