import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import theme from '@root/Theme';
import { useCallback, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { saveForm } from '../../DAL/server-requests/forms';
import { SnackbarStatus, useSnackbar } from '../../contexts/SnackbarProvider';
import QuestionEditForm from './QuestionEditForm';
import Question, { BinaryRadioSelectorProps, QuestionType, QuestionTypeProps } from './questions/Question';

interface FormType {
    name: string;
    title: string;
    instructions: string;
    questions: Array<{ type: QuestionType; props: QuestionTypeProps }>;
}

const defaultQuestionProps = {
    'binary-radio-selector': { fieldKey: '', label: 'Example For a binary question:' },
    'scale-radio': {
        fieldKey: '',
        label: 'Choose on the scale:',
        left: 'Left Option',
        right: 'Right Option',
        range: 5,
    },
    'selection-text-input': {
        fieldKey: '',
        label: 'Select an option',
        selectionOptions: [{ label: 'Option 1', value: 'option1' }],
    },
    'number-input': { fieldKey: '', label: 'Insert a number', min: 0, max: 100, defaultValue: null },
    'radio-selection': {
        fieldKey: '',
        label: 'Select one of the following options:',
        selectionOptions: [{ label: 'Option 1', value: 'option1' }],
    },
};
export const CreateForm = () => {
    const { openSnackbar } = useSnackbar();
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
    const [questionLength, setQuestionLength] = useState<number>(1);

    const methods = useForm<{
        name: string;
        title: string;
        instructions: string;
        questions: any[];
    }>({
        defaultValues: {
            name: 'Untitled',
            title: '',
            instructions: '',
            questions: [{ type: 'selection-text-input', props: defaultQuestionProps['selection-text-input'] }],
        },
    });

    const {
        register,
        control,
        trigger,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        watch,
    } = methods;

    const { append, remove } = useFieldArray({
        control,
        name: 'questions',
    });

    const validateQuestions = async () => {
        for (let i = 0; i < watchedForm.questions.length; i++) {
            if (!watchedForm.questions[i].props.fieldKey) {
                setSelectedQuestionIndex(i);
                return false;
            }
        }

        return true;
    };

    const watchedForm = watch();

    const onSubmit = async (data: FormType) => {
        const isValid = await validateQuestions();
        if (!isValid) {
            openSnackbar('Please fill in all required fields', SnackbarStatus.ERROR);
            return;
        }

        try {
            await saveForm(data);
            openSnackbar('Form Saved !', SnackbarStatus.SUCCESS);
        } catch (error) {
            openSnackbar('Form Saving Failed', SnackbarStatus.ERROR);
        }
    };

    const onQuestionSelection = (index: number) => {
        setSelectedQuestionIndex(index);
    };

    const addQuestion = useCallback(async () => {
        const response = await trigger(`questions.${selectedQuestionIndex}.props.fieldKey`);
        if (response) {
            append({
                type: 'binary-radio-selector',
                props: defaultQuestionProps['binary-radio-selector'] as BinaryRadioSelectorProps,
            });
            setSelectedQuestionIndex(questionLength);
            setQuestionLength(questionLength + 1);
        }
    }, [append, questionLength, selectedQuestionIndex]);

    const removeQuestion = useCallback(
        (index) => {
            setSelectedQuestionIndex(selectedQuestionIndex > 0 ? selectedQuestionIndex - 1 : 0);
            remove(index);
            setQuestionLength((prevLength) => prevLength - 1);
        },
        [remove, selectedQuestionIndex],
    );

    return (
        <FormProvider {...methods}>
            <Grid container sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
                <Grid
                    item
                    md={8}
                    sx={{
                        p: 2,
                        paddingTop: 3,
                        flexDirection: 'column',
                        display: 'flex',
                        alignItems: 'center',
                        overflowY: 'auto',
                        height: '100%',
                    }}
                >
                    <Box sx={{ mb: 2, width: '100%' }}>
                        <Box width={'100%'} display={'flex'} justifyContent={'space-between'} marginTop={2}>
                            <Typography variant="h4">{watchedForm.title}</Typography>
                            <Button
                                variant="contained"
                                onClick={handleSubmit(onSubmit)}
                                style={{ width: 'fit-content' }}
                                size={'small'}
                                color="secondary"
                            >
                                Save Form
                            </Button>
                        </Box>
                        <Typography variant="subtitle1">{watchedForm.instructions}</Typography>
                    </Box>
                    {watchedForm.questions.length > 0 &&
                        watchedForm.questions.map((field, index) => (
                            <Box
                                key={index}
                                sx={{
                                    mb: 2,
                                    display: 'flex',
                                    gap: '8px',
                                    border: `${
                                        index === selectedQuestionIndex
                                            ? `1px solid ${theme.palette.secondary.main}`
                                            : ''
                                    }`,
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
                                    // getValues={getValues}
                                    // control={control}
                                />
                                <Button
                                    variant="outlined"
                                    onClick={() => onQuestionSelection(index)}
                                    sx={{ minWidth: '36px', height: 'fit-content', p: 1 }}
                                    size="small"
                                >
                                    <EditIcon sx={{ fontSize: '1.25rem' }} />
                                </Button>

                                {watchedForm.questions.length > 1 && (
                                    <Button
                                        variant="outlined"
                                        onClick={() => removeQuestion(index)}
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
                        ))}

                    <Button variant="outlined" onClick={() => addQuestion()} style={{ width: 'fit-content' }}>
                        Add Question
                    </Button>
                </Grid>

                <Grid
                    item
                    md={4}
                    sx={{ p: 2, overflowY: 'auto', height: '100%', borderLeft: '1px solid #c0c0c0' }}
                >
                    <TextField
                        label={'name'}
                        type={'text'}
                        {...register(`name`)}
                        onChange={(e) => {
                            setValue(`name`, e.target.value, {
                                shouldValidate: true,
                            });
                        }}
                        defaultValue={getValues('name') || ''}
                        size="small"
                        sx={{ mb: 1 }}
                    />
                    <TextField
                        label={'title'}
                        type={'text'}
                        {...register(`title`)}
                        onChange={(e) => {
                            setValue(`title`, e.target.value, {
                                shouldValidate: true,
                            });
                        }}
                        defaultValue={''}
                        size="small"
                        sx={{ mb: 1 }}
                    />
                    <TextField
                        maxRows={3}
                        rows={3}
                        multiline
                        fullWidth
                        label={'instructions'}
                        type={'text'}
                        {...register(`instructions`)}
                        onChange={(e) => {
                            setValue(`instructions`, e.target.value, {
                                shouldValidate: true,
                            });
                        }}
                        defaultValue={''}
                        size="small"
                        sx={{ mb: 2 }}
                    />
                    <Typography sx={{ mb: 2 }}>{`Question ${selectedQuestionIndex + 1}`}</Typography>

                    <QuestionEditForm selectedQuestionIndex={selectedQuestionIndex} />
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default CreateForm;
