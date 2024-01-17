import { Box, Button, MenuItem, TextField, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Question, { QuestionType, QuestionTypeProps } from './questions/Question';
import { QuestionEditForm } from './QuestionEditForm';
import { getFormErrorMessage } from '@utils/commonFunctions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface FormType {
    title: string;
    instructions: string;
    questions: Array<{ type: QuestionType; props: QuestionTypeProps }>;
}

const defaultQuestionProps = {
    'binary-radio-selector': { fieldKey: '', label: 'Example For a binary question:' },
    'scale-radio': { label: '', left: '', right: '', range: 5, field: '', gap: '' },
    'selection-text-input': { fieldKey: '', label: '', selectionOptions: [{ label: '', value: '' }] },
    'number-input': { fieldKey: '', label: '', min: 0, max: 100 },
    'radio-selection': { label: '', fieldKey: '', selectionOptions: [{ label: '', value: '' }] },
};

export const CreateForm = () => {
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        watch,
    } = useForm<FormType>({
        defaultValues: {
            title: '',
            instructions: '',
            questions: [{ type: 'selection-text-input', props: defaultQuestionProps['selection-text-input'] }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions',
    });

    const watchedForm = watch();

    const onSubmit = (data: FormType) => {
        console.log(data);
        // Send data to server
    };

    const onQuestionSelect = (index: number) => {
        setSelectedQuestionIndex(index);
    };

    const addQuestion = () => {
        append({
            type: 'binary-radio-selector',
            props: defaultQuestionProps['binary-radio-selector'],
        });
        setSelectedQuestionIndex(watchedForm.questions.length);
    };

    const removeQuestion = (index) => {
        setSelectedQuestionIndex(selectedQuestionIndex > 0 ? selectedQuestionIndex - 1 : 0);
        remove(index);
    };

    return (
        <Grid
            container
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: 'flex', height: '75vh', overflow: 'hidden' }}
        >
            {/* Sidebar for editing properties */}
            <Grid item md={4} sx={{ p: 2, overflowY: 'auto', height: '100%' }}>
                <QuestionEditForm
                    watchedForm={watchedForm}
                    selectedQuestionIndex={selectedQuestionIndex}
                    watch={watch}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                    errors={errors}
                    fields={fields}
                    control={control}
                />
            </Grid>

            {/* Main content area */}
            <Grid
                item
                md={8}
                sx={{
                    p: 2,
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    overflowY: 'auto',
                    height: '100%',
                }}
            >
                <p>
                    {JSON.stringify(watchedForm)} {selectedQuestionIndex}
                </p>
                {watchedForm.questions.length > 0 &&
                    watchedForm.questions.map((field, index) => (
                        <Box
                            key={field.id}
                            sx={{
                                mb: 2,
                                display: 'flex',
                                gap: '8px',
                                border: `${index === selectedQuestionIndex ? '1px solid red' : ''}`,
                                borderRadius: '8px',
                                p: 2,
                                width: '100%',
                            }}
                        >
                            <Question
                                key={index}
                                type={field?.type}
                                props={field?.props}
                                // register={register}
                                errors={errors}
                                // setValue={setValue}
                                getValues={getValues}
                                control={control}
                            />
                            <Button
                                variant="outlined"
                                onClick={() => onQuestionSelect(index)}
                                style={{ minWidth: '36px', height: 'fit-content', p: 2 }}
                                size="small"
                            >
                                <EditIcon sx={{ fontSize: '1.25rem' }} />
                            </Button>

                            {watchedForm.questions.length > 1 && (
                                <Button
                                    variant="outlined"
                                    onClick={() => removeQuestion(index)}
                                    style={{
                                        minWidth: '36px',
                                        border: '1px solid red',
                                        height: 'fit-content',
                                        p: 2,
                                    }}
                                    size="small"
                                >
                                    <DeleteIcon sx={{ fontSize: '1.25rem', color: 'black' }} />
                                </Button>
                            )}
                        </Box>
                    ))}

                <Button variant="outlined" onClick={() => addQuestion()} style={{ width: 'fit-content' }}>
                    Add Question
                </Button>
            </Grid>
        </Grid>
    );
};

export default CreateForm;
