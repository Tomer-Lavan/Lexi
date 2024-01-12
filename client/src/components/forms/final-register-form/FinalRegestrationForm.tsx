import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { getFormErrorMessage } from '@utils/commonFunctions';
import {
    Control,
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import RadioGroupRange from '../../common/RadioGroupRange';
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
const religiousAffiliationOptions = [
    { label: 'Jewish', value: 'jewish' },
    { label: 'Islam', value: 'islam' },
    { label: 'Christianity', value: 'christianity' },
    { label: 'Hinduism', value: 'hinduism' },
    { label: 'Buddhism', value: 'buddhism' },
    { label: 'Atheist', value: 'atheist' },
    { label: 'Other', value: 'other' },
];
const ethnicityOptions = [
    { label: 'Israeli', value: 'israeli' },
    { label: 'Arab', value: 'arab' },
    { label: 'Palestinian', value: 'palestinian' },
    { label: 'Caucasian', value: 'caucasian' },
    { label: 'Hispanic', value: 'hispanic' },
    { label: 'African', value: 'african' },
    { label: 'Asian', value: 'asian' },
    { label: 'Other', value: 'other' },
];

const requiredMessage = 'Please fill necessary field';

interface FinalRegisterFormProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    handleSubmit: (any) => void;
    setPage: (page: number) => void;
    setValue: UseFormSetValue<FieldValues>;
    control: Control<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
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
                <TextField
                    select
                    size="small"
                    error={Boolean(errors.religiousAffiliation)}
                    helperText={getFormErrorMessage(errors.religiousAffiliation)}
                    required
                    fullWidth
                    {...register('religiousAffiliation', { required: requiredMessage })}
                    onChange={(e) => {
                        setValue('religiousAffiliation', e.target.value, { shouldValidate: true });
                    }}
                    label="Religious Affiliation"
                    id="religiousAffiliation"
                    defaultValue={getValues('religiousAffiliation') || ''}
                >
                    {religiousAffiliationOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    select
                    size="small"
                    error={Boolean(errors.ethnicity)}
                    helperText={getFormErrorMessage(errors.ethnicity)}
                    required
                    fullWidth
                    {...register('ethnicity', { required: requiredMessage })}
                    onChange={(e) => {
                        setValue('ethnicity', e.target.value, { shouldValidate: true });
                    }}
                    label="Ethnicity"
                    id="ethnicity"
                    defaultValue={getValues('ethnicity') || ''}
                >
                    {ethnicityOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <SliderTitle>Political Affiliation *</SliderTitle>
                <RadioGroupRange
                    left={'Left Wing'}
                    right={'Right Wing'}
                    range={7}
                    field={'politicalAffiliation'}
                    gap="0px"
                    control={control}
                />
                {errors['politicalAffiliation'] && (
                    <Typography color="error" variant="caption">
                        {getFormErrorMessage(errors['politicalAffiliation'])}
                    </Typography>
                )}
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
