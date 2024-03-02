import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { defaultForm, defaultQuestionProps } from '../../../../../DAL/constants';
import { getForm, saveForm, updateForm } from '../../../../../DAL/server-requests/forms';
import Question, { BinaryRadioSelectorProps } from '../../../../../components/questions/Question';
import { SnackbarStatus, useSnackbar } from '../../../../../contexts/SnackbarProvider';
import useEffectAsync from '../../../../../hooks/useEffectAsync';
import { FormType } from '../../../../../models/AppModels';
import { isCamelCase } from '../../../../../utils/commonFunctions';
import QuestionEditForm from '../question-edit-form/QuestionEditForm';
import {
    AddQuestionButton,
    CreateFormContainer,
    DeleteButton,
    EditButton,
    FormEditMenuContainer,
    QuestionBox,
    QuestionsDisplayContainer,
    QuestionsDisplayHeader,
} from './CreateForm.s';
import { FormMetadataEditMenu } from './FormMetadataEditMenu';

export const CreateForm = ({ editFormId, setEditFormId, setForms }) => {
    const { openSnackbar } = useSnackbar();
    const [form, setForm] = useState<FormType>(defaultForm);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
    const [questionLength, setQuestionLength] = useState<number>(1);

    useEffectAsync(async () => {
        try {
            if (editFormId) {
                const formRes = await getForm(editFormId);
                if (formRes) {
                    methods.reset(formRes);
                    setForm(formRes);
                }
            } else {
                methods.reset(defaultForm);
                setForm(defaultForm);
            }
        } catch (error) {
            openSnackbar('Failed to load form', SnackbarStatus.ERROR);
        }
    }, [editFormId]);

    const methods = useForm<{
        name: string;
        title: string;
        instructions: string;
        questions: any[];
    }>({
        defaultValues: form,
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
            if (
                !watchedForm.questions[i].props.fieldKey ||
                !isCamelCase(watchedForm.questions[i].props.fieldKey)
            ) {
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
            if (editFormId) {
                await updateForm(data);
                if (data.name !== form.name) {
                    setForms((prevForms) =>
                        prevForms.map((curForm) => {
                            if (curForm._id === editFormId) {
                                return { ...curForm, name: data.name };
                            }
                            return curForm;
                        }),
                    );
                }
                setForm(data);
                openSnackbar('Form Updated !', SnackbarStatus.SUCCESS);
                return;
            }
            const formRes = await saveForm(data);
            setForms((prevForms) => [...prevForms, formRes]);
            setEditFormId(formRes._id);
            openSnackbar('Form Saved !', SnackbarStatus.SUCCESS);
        } catch (error) {
            openSnackbar('Form Saving Failed', SnackbarStatus.ERROR);
        }
    };

    const onQuestionSelection = (index: number) => {
        setSelectedQuestionIndex(index);
    };

    const addQuestion = useCallback(async () => {
        if (questionLength >= 15) {
            openSnackbar(`Form Qustions Limit Exceeded: ${questionLength}`, SnackbarStatus.WARNING);
            return;
        }

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
            <CreateFormContainer container>
                <QuestionsDisplayContainer item md={8}>
                    <QuestionsDisplayHeader>
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
                    </QuestionsDisplayHeader>
                    {watchedForm.questions.length > 0 &&
                        watchedForm.questions.map((field, index) => (
                            <QuestionBox key={index} selected={index === selectedQuestionIndex}>
                                <Question key={index} type={field?.type} props={field?.props} errors={errors} />
                                <EditButton
                                    variant="outlined"
                                    onClick={() => onQuestionSelection(index)}
                                    size="small"
                                >
                                    <EditIcon sx={{ fontSize: '1.25rem' }} />
                                </EditButton>

                                {watchedForm.questions.length > 1 && (
                                    <DeleteButton
                                        variant="outlined"
                                        onClick={() => removeQuestion(index)}
                                        size="small"
                                    >
                                        <DeleteIcon sx={{ fontSize: '1.25rem', color: 'black' }} />
                                    </DeleteButton>
                                )}
                            </QuestionBox>
                        ))}

                    <AddQuestionButton variant="outlined" onClick={() => addQuestion()}>
                        Add Question
                    </AddQuestionButton>
                </QuestionsDisplayContainer>

                <FormEditMenuContainer item md={4}>
                    <FormMetadataEditMenu register={register} setValue={setValue} getValues={getValues} />
                    <Typography sx={{ mb: 2 }}>{`Question ${selectedQuestionIndex + 1}`}</Typography>
                    <QuestionEditForm selectedQuestionIndex={selectedQuestionIndex} />
                </FormEditMenuContainer>
            </CreateFormContainer>
        </FormProvider>
    );
};

export default CreateForm;
