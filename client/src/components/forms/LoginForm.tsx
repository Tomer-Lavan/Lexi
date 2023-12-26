import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveUser } from '../../DAL/redux/reducers/activeUserReducer';
import { login } from '../../DAL/server-requests/usersDAL';

export const LoginForm = ({ isSignUp, setIsSignUp, isAdminPage, experimentId }) => {
    const [nickname, setNickname] = useState('');
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    // const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!nickname) {
                setErrorMsg('Please fill out nickname');
                return;
            }

            const { token, user } = await login(nickname, password, experimentId);

            if (user.isAdmin && !token) {
                setIsUserAdmin(true);
            } else if (user) {
                dispatch(setActiveUser(user));
                navigate(isAdminPage ? '/admin' : `/e/${experimentId}`);
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                setErrorMsg('Nickname is Invalid, Try agian or Sign Up');
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            error={Boolean(errorMsg)}
                            helperText={errorMsg}
                            required
                            fullWidth
                            size="small"
                            name="nickname"
                            label="Nickname"
                            id="nickname"
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </Grid>
                    {!isAdminPage && !isUserAdmin && (
                        <Grid item xs={12}>
                            <Typography variant="body2" color={'grey'}>
                                please use the same nickname you sign up with.
                            </Typography>
                        </Grid>
                    )}
                    {(isAdminPage || isUserAdmin) && (
                        <Grid item xs={12}>
                            <TextField
                                // error={Boolean(errors.password)}
                                // helperText={errors.password}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                size="small"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    )}
                </Grid>
                {/* <FormControlLabel
                        control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} name="rememberMe" />}
                        label="Remember me"
                    /> */}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2, paddingLeft: 6, paddingRight: 6 }}
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </Box>
                {!isAdminPage && (
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link variant="body2" onClick={() => setIsSignUp(!isSignUp)}>
                                First time? press here to get started
                            </Link>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Container>
    );
};
