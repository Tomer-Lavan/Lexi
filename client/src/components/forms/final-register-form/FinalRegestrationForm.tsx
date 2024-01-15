import { FormControlLabel, Grid, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import { getFormErrorMessage } from '@utils/commonFunctions';
import { FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormContainer, NoteText, StyledContainer } from '../CommonFormStyles.s';
import { ButtonBox, FormButton, SliderTitle } from './FinalRegestrationForm.s';

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

const requiredMessage = 'Please fill necessary field';

interface FinalRegisterFormProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    handleSubmit: (any) => void;
    setPage: (page: number) => void;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
}

export const FinalRegisterForm: React.FC<FinalRegisterFormProps> = ({
    setPage,
    register,
    setValue,
    getValues,
    handleSubmit,
    errors,
}) => (
    <StyledContainer>
        <FormContainer container spacing={2}>
            <Grid item xs={12}>
                <NoteText>Fields marked with a '*' are mandatory.</NoteText>
                <TextField
                    select
                    size="small"
                    error={Boolean(errors.biologicalSex)}
                    helperText={getFormErrorMessage(errors.biologicalSex)}
                    required
                    fullWidth
                    {...register('biologicalSex', { required: requiredMessage })}
                    onChange={(e) => {
                        setValue('biologicalSex', e.target.value, { shouldValidate: true });
                    }}
                    defaultValue={getValues('biologicalSex') || ''}
                    label="Biological Sex"
                    id="biologicalSex"
                >
                    {biologicalSexOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={7}>
                <TextField
                    select
                    size="small"
                    error={Boolean(errors.maritalStatus)}
                    helperText={getFormErrorMessage(errors.maritalStatus)}
                    required
                    fullWidth
                    {...register('maritalStatus', { required: requiredMessage })}
                    onChange={(e) => {
                        setValue('maritalStatus', e.target.value, { shouldValidate: true });
                    }}
                    label="Marital Status"
                    id="maritalStatus"
                    defaultValue={getValues('maritalStatus') || ''}
                >
                    {maritalStatusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={5}>
                <TextField
                    type="number"
                    size="small"
                    error={Boolean(errors.childrenNumber)}
                    helperText={getFormErrorMessage(errors.childrenNumber)}
                    required
                    fullWidth
                    {...register('childrenNumber', {
                        required: requiredMessage,
                        min: { value: 0, message: 'Children number is invalid' },
                    })}
                    onChange={(e) => {
                        setValue('childrenNumber', e.target.value, { shouldValidate: true });
                    }}
                    label="Children Number"
                    id="childrenNumber"
                    defaultValue={getValues('childrenNumber') || 0}
                    InputProps={{ inputProps: { min: 0, max: 99 } }}
                />
            </Grid>
            <Grid item xs={12}>
                <SliderTitle>Are you a native english speaker?</SliderTitle>
                <RadioGroup
                    row
                    aria-labelledby="native-english-speaker-label"
                    {...register('isElishSpeaker', { required: requiredMessage })}
                    defaultValue={true}
                    style={{ justifyContent: 'center', gap: '16px', paddingLeft: '26px' }}
                >
                    <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Yes"
                        {...register('nativeEnglishSpeaker', { required: requiredMessage })}
                    />
                    <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="No"
                        {...register('nativeEnglishSpeaker', { required: requiredMessage })}
                    />
                </RadioGroup>
            </Grid>
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
                        style={{ marginTop: '8px' }}
                    >
                        Back
                    </FormButton>
                </ButtonBox>
            </Grid>
        </FormContainer>
    </StyledContainer>
);
