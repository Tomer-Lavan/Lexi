import { Grid } from '@mui/material';
import {
    Control,
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import { FormContainer, NoteText, StyledContainer } from '../CommonFormStyles.s';
import Question, { QuestionType, QuestionTypeProps } from '../questions/Question';
import { ButtonBox, FormButton } from './FinalRegestrationForm.s';

const biologicalSexOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'prefer not to say' },
];
const maritalStatusOptions = [
    { label: 'Single', value: 'single' },
    { label: 'Married', value: 'married' },
    { label: 'Divorced', value: 'divorced' },
    { label: 'Widowed', value: 'widowed' },
];

interface Question {
    type: QuestionType;
    props: QuestionTypeProps;
}

const questions: Question[] = [
    {
        type: 'selection-text-input',
        props: {
            fieldKey: 'biologicalSex',
            selectionOptions: biologicalSexOptions,
            label: 'Biological Sex',
            required: false,
        },
    },
    {
        type: 'selection-text-input',
        props: {
            fieldKey: 'maritalStatus',
            selectionOptions: maritalStatusOptions,
            label: 'Marital Status',
            required: false,
        },
    },
    {
        type: 'number-input',
        props: { fieldKey: 'childrenNumber', label: 'Children Number', min: 0, max: 200, required: false },
    },
    {
        type: 'binary-radio-selector',
        props: {
            fieldKey: 'nativeEnglishSpeaker',
            label: 'Are you a native English speaker?',
            required: true,
        },
    },
    {
        type: 'scale-radio',
        props: {
            label: 'Political Affiliation',
            left: 'Left Wing',
            right: 'Right Wing',
            range: 7,
            fieldKey: 'politicalAffiliation',
            required: false,
            numbered: true,
        },
    },
    {
        type: 'radio-selection',
        props: {
            label: 'Best NBA Player:',
            fieldKey: 'nba',
            selectionOptions: [
                { label: 'Lebron', value: 'L' },
                { label: 'Jim', value: 'j' },
                { label: 'Tom', value: 't' },
            ],
            required: false,
        },
    },
];

interface FinalRegisterFormProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    handleSubmit: (any) => void;
    setPage: (page: number) => void;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    control: Control<FieldValues>;
}

export const FinalRegisterForm: React.FC<FinalRegisterFormProps> = ({
    setPage,
    register,
    setValue,
    getValues,
    handleSubmit,
    control,
    errors,
}) => (
    <StyledContainer>
        <FormContainer container spacing={2}>
            <NoteText>Fields marked with a '*' are mandatory.</NoteText>

            {questions.map((question, index) => (
                <Grid item xs={12} key={index}>
                    <Question
                        type={question.type}
                        props={question.props}
                        errors={errors}
                        register={register}
                        getValues={getValues}
                        setValue={setValue}
                        control={control}
                    />
                </Grid>
            ))}
            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <ButtonBox>
                    <FormButton type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                        Sign Up
                    </FormButton>
                    <FormButton
                        variant="outlined"
                        color="primary"
                        onClick={() => setPage(2)}
                        fullWidth
                        style={{ marginTop: '8px', marginBottom: '4px' }}
                    >
                        Back
                    </FormButton>
                </ButtonBox>
            </Grid>
        </FormContainer>
    </StyledContainer>
);
