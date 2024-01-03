import { validateUserName } from '@DAL/server-requests/users';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { ButtonBox, FormButton, FormContainer, SubFormMainContainer } from './FormStyles.s';

export const FirstRegisterForm = ({ setPage, values, setValues, handleChange, experimentId }) => {
    const [errors, setErrors] = useState<any>({
        nickname: '',
        age: '',
        gender: '',
    });

    const handleContinue = async (event) => {
        event.preventDefault();
        try {
            const currentErrors: any = {
                nickname: values.nickname ? '' : 'Please fill necessary field',
                age: values.age ? '' : 'Please fill necessary field',
                gender: values.gender ? '' : 'Please fill necessary field',
            };

            setErrors(currentErrors);

            if (Object.values(currentErrors).every((error) => error === '')) {
                try {
                    await validateUserName(values.nickname, experimentId);
                    setPage(2);
                } catch (error) {
                    setErrors({ ...currentErrors, nickname: 'Nickname is already exist' });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SubFormMainContainer size={'80%'}>
            <FormContainer container spacing={2}>
                <Grid item xs={12}>
                    <Typography fontSize={'0.75rem'} color={'rgba(0, 0, 0, 0.6)'} style={{ padding: '8px' }}>
                        Fields marked with a '*' are mandatory.
                    </Typography>
                    <TextField
                        size="small"
                        error={Boolean(errors.nickname)}
                        helperText={errors.nickname}
                        required
                        fullWidth
                        value={values.nickname}
                        name="nickname"
                        label="Nickname"
                        id="nickname"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        size="small"
                        error={Boolean(errors.age)}
                        helperText={
                            errors.age ||
                            (Number(values.age) < 18 || Number(values.age) > 120 ? 'Age must be above 18' : '')
                        }
                        required
                        fullWidth
                        name="age"
                        label="Age"
                        id="age"
                        value={values.age}
                        InputProps={{ inputProps: { min: 18, max: 120 } }}
                        onChange={handleChange}
                        onBlur={(event) => {
                            let age = event.target.value ? parseInt(event.target.value) : '';
                            if (Number(age) < 18) age = 18;
                            if (Number(age) > 120) age = 120;
                            setValues({ ...values, age: age.toString() });
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        select
                        size="small"
                        error={Boolean(errors.gender)}
                        helperText={errors.gender}
                        required
                        fullWidth
                        name="gender"
                        label="Gender"
                        id="gender"
                        value={values.gender}
                        onChange={handleChange}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                        <MenuItem value="prefer not to say">Prefer Not To Say</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                    <ButtonBox flexDirection={'row'}>
                        <FormButton variant="contained" color="primary" onClick={handleContinue}>
                            Continue
                        </FormButton>
                    </ButtonBox>
                </Grid>
            </FormContainer>
        </SubFormMainContainer>
    );
};
