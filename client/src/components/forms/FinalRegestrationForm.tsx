import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import RadioGroupRange from '../common/RadioGroupRange';
import { ButtonBox, FieldTitle, FormButton, FormContainer, SubFormMainContainer } from './FormStyles.s';

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

export const FinalRegisterForm = ({ register, errors, handleSubmit, setPage, setValue, control }) => (
    <SubFormMainContainer>
        <FormContainer container spacing={2}>
            <Grid item xs={12}>
                <Typography fontSize={'0.75rem'} color={'rgba(0, 0, 0, 0.6)'} style={{ padding: '8px' }}>
                    Fields marked with a '*' are mandatory.
                </Typography>
                <TextField
                    select
                    size="small"
                    error={Boolean(errors.biologicalSex)}
                    helperText={errors.biologicalSex?.message}
                    required
                    fullWidth
                    {...register('biologicalSex', { required: requiredMessage })}
                    onChange={(e) => {
                        setValue('biologicalSex', e.target.value, { shouldValidate: true });
                    }}
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
                    helperText={errors.maritalStatus?.message}
                    required
                    fullWidth
                    {...register('maritalStatus', { required: requiredMessage })}
                    onChange={(e) => {
                        setValue('maritalStatus', e.target.value, { shouldValidate: true });
                    }}
                    label="Marital Status"
                    id="maritalStatus"
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
                    helperText={errors.childrenNumber?.message}
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
                    InputProps={{ inputProps: { min: 0, max: 99 } }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    select
                    size="small"
                    error={Boolean(errors.religiousAffiliation)}
                    helperText={errors.religiousAffiliation?.message}
                    required
                    fullWidth
                    {...register('religiousAffiliation', { required: requiredMessage })}
                    onChange={(e) => {
                        setValue('religiousAffiliation', e.target.value, { shouldValidate: true });
                    }}
                    control={control}
                    label="Religious Affiliation"
                    id="religiousAffiliation"
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
                    helperText={errors.ethnicity?.message}
                    required
                    fullWidth
                    {...register('ethnicity', { required: requiredMessage })}
                    onChange={(e) => {
                        setValue('ethnicity', e.target.value, { shouldValidate: true });
                    }}
                    label="Ethnicity"
                    id="ethnicity"
                >
                    {ethnicityOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <FieldTitle>Political Affiliation *</FieldTitle>
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
                        {errors['politicalAffiliation']?.message}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <ButtonBox>
                    <FormButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{ marginBottom: 0, marginTop: 4 }}
                    >
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
    </SubFormMainContainer>
);
