import { Grid } from '@mui/material';
import {
    Control,
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import Question from '../../questions/Question';
import { FormContainer, NoteText, StyledContainer } from '../CommonFormStyles.s';
import { ButtonBox, FormButton } from './FinalRegistrationForm.s';

interface FinalRegisterFormProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    handleSubmit: (any) => void;
    setPage: (page: number) => void;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    control: Control<FieldValues>;
    form: any;
    handleGoBack: () => void;
}

export const FinalRegisterForm: React.FC<FinalRegisterFormProps> = ({
    register,
    setValue,
    getValues,
    handleSubmit,
    handleGoBack,
    control,
    errors,
    form,
}) => (
    <StyledContainer>
        <FormContainer container spacing={2}>
            <NoteText>Fields marked with a '*' are mandatory.</NoteText>

            {form &&
                form?.questions.map((question, index) => (
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
                        onClick={handleGoBack}
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
