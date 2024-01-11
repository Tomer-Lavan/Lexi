// Login.tsx
import { LoginForm } from '@components/forms/LoginForm';
import { RegisterForm } from '@components/forms/RegisterForm';
import { useExperimentId } from '@hooks/useExperimentId';
import { Box, useMediaQuery } from '@mui/material';
import theme from '@root/Theme';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DividerButtonsContainer, FormSide, FormTypeButton, MainContainer } from './Login.s';

const Login: React.FC = () => {
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [firstPathSegment] = location.pathname.split('/').slice(1);
    const isAdminPage = firstPathSegment === 'admin';
    const [isSignUp, setIsSignUp] = useState(!isAdminPage);
    const [showFormTypeButtons, setShowFormTypeButtons] = useState(true);
    const experimentId = useExperimentId();

    return (
        <MainContainer>
            <FormSide elevation={4} isMobile={isMobile}>
                {showFormTypeButtons && (
                    <DividerButtonsContainer>
                        {!isAdminPage && (
                            <FormTypeButton variant="text" onClick={() => setIsSignUp(true)} isSignUp={isSignUp}>
                                First Time
                            </FormTypeButton>
                        )}
                        <FormTypeButton variant="text" onClick={() => setIsSignUp(false)} isSignUp={!isSignUp}>
                            {!isAdminPage ? 'Not First Time?' : 'Sign In'}
                        </FormTypeButton>
                    </DividerButtonsContainer>
                )}
                <Box style={{ flex: '1 1 auto' }}>
                    {isSignUp ? (
                        <RegisterForm
                            experimentId={experimentId}
                            setShowFormTypeButtons={setShowFormTypeButtons}
                        />
                    ) : (
                        <LoginForm isAdminPage={isAdminPage} experimentId={experimentId} />
                    )}
                </Box>
            </FormSide>
        </MainContainer>
    );
};

export default Login;
