import { validateUserName } from '@DAL/server-requests/users';
import { Box, Grid, MenuItem, TextField } from '@mui/material';
import { getFormErrorMessage } from '@utils/commonFunctions';
import {
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetError,
    UseFormSetValue,
} from 'react-hook-form';
import { FormButton, FormContainer, NoteText, StyledContainer } from './CommonFormStyles.s';

const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer Not To Say', value: 'prefer not to say' },
];

interface FirstRegisterFormProps {
    setPage: (page: number) => void;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    experimentId: string;
    getValues: UseFormGetValues<FieldValues>;
    setError: UseFormSetError<FieldValues>;
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
    setValue: UseFormSetValue<FieldValues>;
}

export const FirstRegisterForm: React.FC<FirstRegisterFormProps> = ({
    setPage,
    register,
    errors,
    experimentId,
    getValues,
    setError,
    handleSubmit,
    setValue,
}) => {
    const handleContinue = async () => {
        try {
            const nickname = getValues('nickname');
            await validateUserName(nickname, experimentId);
            setPage(2);
        } catch (error) {
            setError('nickname', {
                type: 'manual',
                message: 'Nickname already exists',
            });
        }
    };

    return (
        <StyledContainer>
            <FormContainer container spacing={2}>
                <Grid item xs={12} style={{ paddingTop: 0 }}>
                    <NoteText>Fields marked with a '*' are mandatory.</NoteText>
                    <TextField
                        size="small"
                        error={Boolean(errors.nickname)}
                        helperText={getFormErrorMessage(errors.nickname)}
                        required
                        fullWidth
                        {...register('nickname', { required: 'Please fill necessary field' })}
                        label="Nickname"
                        id="nickname"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        size="small"
                        error={Boolean(errors.age)}
                        helperText={getFormErrorMessage(errors.age)}
                        required
                        fullWidth
                        {...register('age', {
                            required: 'Please fill necessary field',
                            min: { value: 18, message: 'Age must be above 18' },
                            max: { value: 200, message: 'Age must be below 200' },
                        })}
                        onChange={(e) => {
                            setValue('age', e.target.value, { shouldValidate: true });
                        }}
                        label="Age"
                        id="age"
                        InputProps={{ inputProps: { min: 18, max: 200 } }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        select
                        size="small"
                        error={Boolean(errors.gender)}
                        helperText={getFormErrorMessage(errors.gender)}
                        required
                        fullWidth
                        {...register('gender', { required: 'Please fill necessary field' })}
                        label="Gender"
                        id="gender"
                        onChange={(e) => {
                            setValue('gender', e.target.value, { shouldValidate: true });
                        }}
                        defaultValue={getValues('gender') || ''}
                    >
                        {genderOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </FormContainer>
            <Box display={'flex'} justifyContent={'center'}>
                <FormButton type="submit" onClick={handleSubmit(handleContinue)}>
                    Continue
                </FormButton>
            </Box>
        </StyledContainer>
    );
};
