import { setActiveUser } from '@DAL/redux/reducers/activeUserReducer';
import { login } from '@DAL/server-requests/users';
import { Pages } from '@app/App';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({ isSignUp, setIsSignUp, isAdminPage, experimentId }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isUserAdmin, setIsUserAdmin] = useState(false);

    const getErrorMessage = (error) => (error && typeof error.message === 'string' ? error.message : '');

    const onSubmit = async (data) => {
        try {
            const { token, user } = await login(data.nickname, data.password, experimentId);

            if (user.isAdmin && !token) {
                setIsUserAdmin(true);
            } else if (user) {
                dispatch(setActiveUser(user));
                navigate(isAdminPage ? Pages.ADMIN : Pages.EXPERIMENT.replace(':experimentId', experimentId));
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                setError('nickname', {
                    type: 'manual',
                    message: `Nickname ${
                        isUserAdmin || isAdminPage ? 'or Password are' : 'is'
                    } Invalid, Try again or Sign Up`,
                });
            } else {
                setError('nickname', { type: 'manual', message: 'Something went wrong, please try again later' });
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3, width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            error={Boolean(errors.nickname)}
                            helperText={getErrorMessage(errors.nickname)}
                            required
                            fullWidth
                            size="small"
                            {...register('nickname', { required: 'Please fill out nickname' })}
                            label="Nickname"
                            id="nickname"
                        />
                    </Grid>
                    {!isAdminPage && (
                        <Grid item xs={12}>
                            <Typography variant="body2" color={'grey'}>
                                Please use the same nickname you signed up with.
                            </Typography>
                        </Grid>
                    )}
                    {(isAdminPage || true) && (
                        <Grid item xs={12}>
                            <TextField
                                error={Boolean(errors.password)}
                                helperText={getErrorMessage(errors.password)}
                                required
                                fullWidth
                                {...register('password', { required: 'Password is required' })}
                                label="Password"
                                type="password"
                                id="password"
                                size="small"
                                autoComplete="current-password"
                            />
                        </Grid>
                    )}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2, paddingLeft: 6, paddingRight: 6 }}
                    >
                        Login
                    </Button>
                </Box>
                {!isAdminPage && (
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link variant="body2" onClick={() => setIsSignUp(!isSignUp)}>
                                First time? Press here to get started
                            </Link>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Container>
    );
};
