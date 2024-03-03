import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
    Box,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    MenuItem,
    TextField,
    Tooltip,
} from '@mui/material';
import { getFormErrorMessage, isCamelCase } from '@utils/commonFunctions';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { defaultQuestionProps } from '../../../../../DAL/constants';
import { SelectionOptions } from '../selection-options/SelectionOptions';

interface QuestionEditFormProps {
    selectedQuestionIndex: number;
}

const QuestionEditForm: React.FC<QuestionEditFormProps> = ({ selectedQuestionIndex }) => {
    const {
        register,
        setValue,
        formState: { errors },
        watch,
    } = useFormContext();

    const watchedForm = watch();

    const handleTypeChange = useCallback(
        (e) => {
            const newType = e.target.value;
            setValue(`questions.${selectedQuestionIndex}.type`, newType, {
                shouldValidate: true,
            });
            setValue(`questions.${selectedQuestionIndex}.props`, defaultQuestionProps[newType], {
                shouldValidate: true,
            });
        },
        [selectedQuestionIndex, setValue],
    );

    const renderInputField = (register, selectedQuestionIndex, key, value) => {
        if (key === 'selectionOptions') {
            return <SelectionOptions selectedQuestionIndex={selectedQuestionIndex} />;
        } else if (key === 'required' || key === 'numbered') {
            return (
                <Box style={{ width: '100%' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={watchedForm.questions[selectedQuestionIndex].props[key]}
                                {...register(`questions.${selectedQuestionIndex}.props.${key}`)}
                                onClick={() =>
                                    setValue(
                                        `questions.${selectedQuestionIndex}.props.${key}`,
                                        !watchedForm.questions[selectedQuestionIndex].props[key],
                                    )
                                }
                            />
                        }
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                </Box>
            );
        } else {
            const fieldError = errors?.questions?.[selectedQuestionIndex]?.props?.[key];

            return (
                <TextField
                    label={key === 'fieldKey' ? 'key' : key === 'label' ? 'Question Text' : key}
                    type={typeof value === 'number' ? 'number' : 'text'}
                    error={Boolean(fieldError)}
                    helperText={getFormErrorMessage(fieldError)}
                    {...register(`questions.${selectedQuestionIndex}.props.${key}`, {
                        required: key === 'fieldKey' ? 'Field Key is required' : false,
                        validate:
                            key === 'fieldKey'
                                ? (value) => isCamelCase(value) || 'Field Key must be in camelCase format'
                                : null,
                    })}
                    onChange={(e) => {
                        setValue(`questions.${selectedQuestionIndex}.props.${key}`, e.target.value, {
                            shouldValidate: true,
                        });
                    }}
                    required={key === 'fieldKey'}
                    defaultValue={value}
                    size="small"
                    value={watchedForm.questions[selectedQuestionIndex].props[key]}
                    InputProps={
                        key === 'fieldKey'
                            ? {
                                  endAdornment: (
                                      <InputAdornment position="end">
                                          <Tooltip
                                              title="The 'key' field defines how the item will be saved in the Dataset; it has to be in CamelCase format.
                                              CamelCase format: starts with a lowercase letter and uses uppercase letters to separate words, e.g., myFieldKey."
                                          >
                                              <IconButton>
                                                  <HelpOutlineIcon />
                                              </IconButton>
                                          </Tooltip>
                                      </InputAdornment>
                                  ),
                              }
                            : {}
                    }
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <TextField
                select
                size="small"
                error={Boolean(errors[`questions.${selectedQuestionIndex}.type`])}
                helperText={getFormErrorMessage(errors[`questions.${selectedQuestionIndex}.type`])}
                required
                fullWidth
                {...register(`questions.${selectedQuestionIndex}.type`, { required: 'required' })}
                onChange={handleTypeChange}
                value={watchedForm.questions[selectedQuestionIndex].type}
                label={`Question Type`}
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

QuestionEditForm.displayName = 'QuestionEditForm';

export default QuestionEditForm;
