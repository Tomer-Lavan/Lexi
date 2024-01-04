import { validateUserName } from '@DAL/server-requests/users';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { ButtonBox, FormButton, FormContainer, SubFormMainContainer } from './FormStyles.s';

const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer Not To Say', value: 'prefer not to say' },
];

export const FirstRegisterForm = ({
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
            debugger;
            console.log(errors);
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
        <SubFormMainContainer size={'80%'}>
            <FormContainer container spacing={2}>
                <Grid item xs={12}>
                    <Typography fontSize={'0.75rem'} color={'rgba(0, 0, 0, 0.6)'} style={{ padding: '8px' }}>
                        Fields marked with a '*' are mandatory.
                    </Typography>
                    <TextField
                        size="small"
                        error={Boolean(errors.nickname)}
                        helperText={errors.nickname?.message}
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
                        helperText={errors.age?.message}
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
                        helperText={errors.gender?.message}
                        required
                        fullWidth
                        {...register('gender', { required: 'Please fill necessary field' })}
                        label="Gender"
                        id="gender"
                        onChange={(e) => {
                            setValue('gender', e.target.value, { shouldValidate: true });
                        }}
                    >
                        {genderOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                    <ButtonBox flexDirection={'row'}>
                        <FormButton variant="contained" color="primary" onClick={handleSubmit(handleContinue)}>
                            Continue
                        </FormButton>
                    </ButtonBox>
                </Grid>
            </FormContainer>
        </SubFormMainContainer>
    );
};
