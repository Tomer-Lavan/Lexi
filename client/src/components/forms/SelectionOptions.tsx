import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';

const toCamelCase = (str) =>
    str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase(),
        )
        .replace(/\s/g, '');

export const SelectionOptions = ({ selectedQuestionIndex }) => {
    const { control, register, setValue } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `questions.${selectedQuestionIndex}.props.selectionOptions`,
    });

    const addOption = (selctionOptionsLength) => {
        append({ label: `Option ${selctionOptionsLength}`, value: `option${selctionOptionsLength}` });
    };

    const removeOption = (index) => {
        remove(index);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <Typography>Selection Options</Typography>
            {fields.map((item, index) => {
                const fieldItem = item as { id: string; label: string; value: string };

                return (
                    <Box key={fieldItem.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, mt: 1 }}>
                        <TextField
                            label={`Option ${index + 1}`}
                            {...register(
                                `questions.${selectedQuestionIndex}.props.selectionOptions.${index}.label`,
                            )}
                            defaultValue={fieldItem.label}
                            size="small"
                            onChange={(e) => {
                                setValue(
                                    `questions.${selectedQuestionIndex}.props.selectionOptions.${index}.label`,
                                    e.target.value,
                                );
                                setValue(
                                    `questions.${selectedQuestionIndex}.props.selectionOptions.${index}.value`,
                                    toCamelCase(e.target.value),
                                );
                            }}
                        />
                        {fields.length > 1 && (
                            <Button
                                variant="outlined"
                                onClick={() => removeOption(index)}
                                sx={{
                                    minWidth: '36px',
                                    border: '1px solid red',
                                    height: 'fit-content',
                                    p: 1,
                                }}
                                size="small"
                            >
                                <DeleteIcon sx={{ fontSize: '1.25rem', color: 'black' }} />
                            </Button>
                        )}
                    </Box>
                );
            })}
            <Button variant="outlined" onClick={() => addOption(fields.length)}>
                Add Option
            </Button>
        </Box>
    );
};
