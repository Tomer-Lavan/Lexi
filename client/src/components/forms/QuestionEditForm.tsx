import React from 'react';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import Question, { QuestionType, QuestionTypeProps } from './questions/Question';
import { SelectionOptions } from './SelectionOptions';
import { getFormErrorMessage } from '@utils/commonFunctions';

const defaultQuestionProps = {
    'binary-radio-selector': { fieldKey: '', label: 'Example For a binary question:' },
    'scale-radio': { label: '', left: '', right: '', range: 5, field: '', gap: '' },
    'selection-text-input': { fieldKey: '', label: '', selectionOptions: [{ label: '', value: '' }] },
    'number-input': { fieldKey: '', label: '', min: 0, max: 100 },
    'radio-selection': { label: '', fieldKey: '', selectionOptions: [{ label: '', value: '' }] },
};

export const QuestionEditForm = ({
    watchedForm,
    selectedQuestionIndex,
    watch,
    register,
    setValue,
    getValues,
    errors,
    control,
    fields,
}) => {
    // Watch the question type selection
    // const selectedType = watch(`questions.${selectedQuestionIndex}.type`);

    // Render inputs based on selected question type
    const renderInputField = (register, selectedQuestionIndex, key, value) => {
        if (key === 'selectionOptions') {
            // Handle rendering for selectionOptions, which is an array
            return (
                <SelectionOptions
                    selectedQuestionIndex={selectedQuestionIndex}
                    value={value}
                    control={control}
                    register={register}
                />
            );
        } else {
            // Handle rendering for string and number inputs
            return (
                <TextField
                    label={key}
                    type={typeof value === 'number' ? 'number' : 'text'}
                    {...register(`questions.${selectedQuestionIndex}.props.${key}`)}
                    onChange={(e) => {
                        console.log('boom', `questions.${selectedQuestionIndex}.props.${key}`, e.target.value);
                        setValue(`questions.${selectedQuestionIndex}.props.${key}`, e.target.value, {
                            shouldValidate: true,
                        });
                        console.log('owww', fields);
                    }}
                    defaultValue={value}
                    value={watchedForm.questions[selectedQuestionIndex].props[key]}
                />
            );
        }
    };

    const renderInputsForSelectedType = (type, register, selectedQuestionIndex) => {
        if (!type || !defaultQuestionProps[type]) {
            return null;
        }

        const questionProps = watchedForm.questions[selectedQuestionIndex].props || defaultQuestionProps[type];
        return Object.entries(questionProps).map(([key, value]) =>
            renderInputField(register, selectedQuestionIndex, key, value),
        );
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <p>{JSON.stringify(watchedForm.questions[selectedQuestionIndex])}</p>
            <TextField
                select
                size="small"
                error={Boolean(errors[`questions.${selectedQuestionIndex}.type`])}
                helperText={getFormErrorMessage(errors[`questions.${selectedQuestionIndex}.type`])}
                required
                fullWidth
                {...register(`questions.${selectedQuestionIndex}.type`, { required: 'required' })}
                onChange={(e) => {
                    setValue(`questions.${selectedQuestionIndex}.type`, e.target.value, {
                        shouldValidate: true,
                    });
                    setValue(`questions.${selectedQuestionIndex}.props`, defaultQuestionProps[e.target.value], {
                        shouldValidate: true,
                    });
                }}
                value={watchedForm.questions[selectedQuestionIndex].type}
                label={`questions.${selectedQuestionIndex}.type`}
                id={`questions.${selectedQuestionIndex}.type`}
            >
                {Object.keys(defaultQuestionProps).map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            {renderInputsForSelectedType(
                watchedForm.questions[selectedQuestionIndex].type,
                register,
                selectedQuestionIndex,
            )}
        </Box>
    );
};
