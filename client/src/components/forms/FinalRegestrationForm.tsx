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

export const FinalRegisterForm = ({ values, errors, handleSubmit, handleChange, handleRadioChange, setPage }) => (
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
                    helperText={errors.biologicalSex}
                    required
                    fullWidth
                    name="biologicalSex"
                    label="Biological Sex"
                    id="biologicalSex"
                    value={values.biologicalSex}
                    onChange={handleChange}
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
                    helperText={errors.maritalStatus}
                    required
                    fullWidth
                    name="maritalStatus"
                    label="Marital Status"
                    id="maritalStatus"
                    value={values.maritalStatus}
                    onChange={handleChange}
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
                    helperText={errors.childrenNumber}
                    required
                    fullWidth
                    name="childrenNumber"
                    label="Children Number"
                    id="childrenNumber"
                    value={values.childrenNumber}
                    InputProps={{ inputProps: { min: 0, max: 99 } }}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    select
                    size="small"
                    error={Boolean(errors.religiousAffiliation)}
                    helperText={errors.religiousAffiliation}
                    required
                    fullWidth
                    name="religiousAffiliation"
                    label="Religious Affiliation"
                    id="religiousAffiliation"
                    value={values.religiousAffiliation}
                    onChange={handleChange}
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
                    helperText={errors.ethnicity}
                    required
                    fullWidth
                    name="ethnicity"
                    label="Ethnicity"
                    id="ethnicity"
                    value={values.ethnicity}
                    onChange={handleChange}
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
                    values={values}
                    handleRadioChange={handleRadioChange}
                    gap="0px"
                />
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
