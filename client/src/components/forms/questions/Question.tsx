import PropTypes from 'prop-types';
import React from 'react';
// Import your question components
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

// Define specific prop types for each question type
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

interface BinaryRadioSelectorProps {
    fieldKey: string;
    label: string;
}

interface ScaleRadioProps {
    label?: string;
    left: string;
    right: string;
    range: number;
    field: string;
    gap: string;
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
    errors: FieldErrors;
}

export type QuestionTypeProps =
    | BinaryRadioSelectorProps
    | ScaleRadioProps
    | SelectionTextInputProps
    | NumberInputProps
    | RadioSelectionProps;

interface CommonQuestionProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
}

interface QuestionProps {
    type: QuestionType;
    props: QuestionTypeProps;
    register?: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    setValue?: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    control: Control<FieldValues>;
}

const Question: React.FC<QuestionProps> = ({ type, props, errors, register, getValues, setValue, control }) => {
    const registerOrUndefined = register ? register : () => undefined;
    const setValueOrUndefined = setValue ? setValue : () => undefined;
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
                        getValues={getValues}
                        setValue={setValueOrUndefined}
                    />
                );
            case 'number-input':
                return (
                    <NumberInput
                        {...(props as NumberInputProps)}
                        errors={errors}
                        register={registerOrUndefined}
                        getValues={getValues}
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