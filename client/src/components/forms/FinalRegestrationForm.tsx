import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import RadioGroupRange from '../common/RadioGroupRange';
import { ButtonBox, FieldTitle, FormButton, FormContainer, SubFormMainContainer } from './FormStyles.s';

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
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                    <MenuItem value="prefer not to say">Prefer Not To Say</MenuItem>
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
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="married">Married</MenuItem>
                    <MenuItem value="divorced">Divorced</MenuItem>
                    <MenuItem value="widowed">Widowed</MenuItem>
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
                    <MenuItem value="jewish">Jewish</MenuItem>
                    <MenuItem value="islam">Islam</MenuItem>
                    <MenuItem value="christianity">Christianity</MenuItem>
                    <MenuItem value="hinduism">Hinduism</MenuItem>
                    <MenuItem value="buddhism">Buddhism</MenuItem>
                    <MenuItem value="atheist">Atheist</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
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
                    <MenuItem value="israeli">Israeli</MenuItem>
                    <MenuItem value="arab">Arab</MenuItem>
                    <MenuItem value="palestinian">Palestinian</MenuItem>
                    <MenuItem value="caucasian">Caucasian</MenuItem>
                    <MenuItem value="hispanic">Hispanic</MenuItem>
                    <MenuItem value="african">African</MenuItem>
                    <MenuItem value="asian">Asian</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
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
