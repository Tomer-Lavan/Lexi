import { Pages } from '@app/App';
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ContentContainer,
    FooterText,
    MainContainer,
    StyledButton,
    StyledPaper,
    StyledTypography,
} from './ProjectOverview.s';

const ProjectOverview: React.FC = () => {
    const navigate = useNavigate();
    const handleGitHubRedirect = () => {
        window.location.href = 'https://github.com/Tomer-Lavan/Lexi';
    };

    const handleAdminRedirect = () => {
        navigate(Pages.ADMIN);
    };

    return (
        <MainContainer>
            <ContentContainer>
                <StyledTypography variant="h3" gutterBottom fontFamily={'Work Sans'} fontWeight={500}>
                    Lexi Project
                </StyledTypography>
                <StyledTypography
                    variant="h6"
                    fontWeight={400}
                    sx={{ maxWidth: '600px', textAlign: 'center', marginBottom: 4 }}
                >
                    Lexi is an innovative platform designed in collaboration with Cambridge University. It serves
                    as a state-of-the-art environment for conducting extensive research and experiments in the
                    field of user interaction with bots and Language Learning & Modeling Systems (LLMS).
                </StyledTypography>
                <StyledPaper>
                    <Button variant="contained" sx={{ marginRight: 2 }} onClick={handleGitHubRedirect}>
                        Visit GitHub
                    </Button>
                    <StyledTypography display="inline" sx={{ marginRight: 2 }}>
                        Are you an admin?
                    </StyledTypography>
                    <StyledButton variant="outlined" onClick={handleAdminRedirect}>
                        Admin Page
                    </StyledButton>
                </StyledPaper>
            </ContentContainer>
            <FooterText variant="body2">
                © {new Date().getFullYear()} Lexi Project. All Rights Reserved.
            </FooterText>
        </MainContainer>
    );
};

export default ProjectOverview;
