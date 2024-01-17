import { Box, Button, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Question, { QuestionType, QuestionTypeProps } from './questions/Question';
import { getFormErrorMessage } from '@utils/commonFunctions';

interface FormType {
    title: string;
    instructions: string;
    questions: Array<{ type: QuestionType; props: QuestionTypeProps }>;
}

export const FormMetadata = ({ register }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <TextField {...register('title')} fullWidth label="Form Title" size="small" margin="normal" />
            <TextField
                maxRows={4}
                {...register('instructions')}
                rows={3}
                multiline
                fullWidth
                label="Instructions"
                size="small"
                margin="normal"
            />
        </Box>
    );
};
