// Login.tsx
import { LoginForm } from '@components/forms/LoginForm';
import { RegisterForm } from '@components/forms/RegisterForm';
import { useExperimentId } from '@hooks/useExperimentId';
import { useMediaQuery } from '@mui/material';
import theme from '@root/Theme';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DividerButton, DividerButtonsContainer, FormSide, GradientSide, MainContainer } from './Login.s';

const Login: React.FC = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();
    const [firstPathSegment] = location.pathname.split('/').slice(1);
    const isAdminPage = firstPathSegment === 'admin';
    const [isSignUp, setIsSignUp] = useState(!isAdminPage);
    const experimentId = useExperimentId();

    return (
        <MainContainer isMobile={isMobile}>
            <FormSide elevation={1} sx={{ overflowY: 'auto' }}>
                {isSignUp ? (
                    <RegisterForm experimentId={experimentId} />
                ) : (
                    <LoginForm
                        isAdminPage={isAdminPage}
                        isSignUp={isSignUp}
                        setIsSignUp={setIsSignUp}
                        experimentId={experimentId}
                    />
                )}
            </FormSide>
            <GradientSide isMobile={isMobile}>
                {!isAdminPage && (
                    <DividerButtonsContainer isMobile={isMobile}>
                        <DividerButton
                            isActive={isSignUp}
                            isMobile={isMobile}
                            variant="contained"
                            fullWidth
                            onClick={() => setIsSignUp(true)}
                        >
                            First Time
                        </DividerButton>
                        <DividerButton
                            isActive={!isSignUp}
                            isMobile={isMobile}
                            variant="contained"
                            fullWidth
                            onClick={() => setIsSignUp(false)}
                        >
                            Not First Time?
                        </DividerButton>
                    </DividerButtonsContainer>
                )}
            </GradientSide>
        </MainContainer>
    );
};

export default Login;
