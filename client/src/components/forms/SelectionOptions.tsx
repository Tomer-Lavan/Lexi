import React from 'react';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import Question, { QuestionType, QuestionTypeProps } from './questions/Question';
import { getFormErrorMessage } from '@utils/commonFunctions';

export const SelectionOptions = ({ selectedQuestionIndex, value, control, register }) => {
    const { append, remove } = useFieldArray({
        control,
        name: `questions.${selectedQuestionIndex}.props.selectionOptions`,
    });

    const addOption = () => {
        append({
            label: '',
            value: '',
        });
    };

    const removeOption = (index) => {
        remove(index);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>Selection Options</Typography>
            {value.map((option, index) => (
                <div key={index}>
                    <TextField
                        label={`Option ${index + 1} Label`}
                        {...register(`questions.${selectedQuestionIndex}.props.selectionOptions[${index}].label`)}
                        defaultValue={option.label}
                    />
                    <TextField
                        label={`Option ${index + 1} Value`}
                        {...register(`questions.${selectedQuestionIndex}.props.selectionOptions[${index}].value`)}
                        defaultValue={option.value}
                    />
                    <Button variant="outlined" onClick={() => removeOption(index)}>
                        Remove Option
                    </Button>
                </div>
            ))}
            <Button variant="outlined" onClick={() => addOption()}>
                Add Option
            </Button>
        </Box>
    );
};
