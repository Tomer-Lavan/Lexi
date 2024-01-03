import { Pages } from '@app/App';
import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Box, Button, Paper, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectOverview: React.FC = () => {
    const navigate = useNavigate();
    const handleGitHubRedirect = () => {
        window.location.href = 'https://github.com/Tomer-Lavan/Lexi';
    };

    const handleAdminRedirect = () => {
        navigate(Pages.ADMIN);
    };

    return (
        <Box
            style={{
                backgroundColor: 'white',
                color: 'black',
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                margin: 0,
                padding: 0,
            }}
        >
            <AppBar position="static" sx={{ bgcolor: 'grey.900', marginBottom: 4 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Lexi Project
                    </Typography>
                    <Button
                        color="inherit"
                        href="https://github.com/Tomer-Lavan/Lexi"
                        sx={{ textTransform: 'none' }}
                        startIcon={<GitHubIcon />}
                    >
                        <Typography variant="h6" component="div">
                            GitHub Project
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom>
                    Lexi Project
                </Typography>
                <Typography variant="h6" sx={{ maxWidth: '600px', textAlign: 'center', marginBottom: 4 }}>
                    Lexi is an innovative platform designed in collaboration with Cambridge University. It serves
                    as a state-of-the-art environment for conducting extensive research and experiments in the
                    field of user interaction with bots and Language Learning & Modeling Systems (LLMS).
                </Typography>
                <Paper sx={{ padding: 2, elevation: 12, border: '0.5px solid rgba(0, 0, 0, 0.1)' }}>
                    <Button variant="contained" sx={{ marginRight: 2 }} onClick={handleGitHubRedirect}>
                        Visit GitHub
                    </Button>
                    <Typography display="inline" sx={{ marginRight: 2 }}>
                        Are you an admin?
                    </Typography>
                    <Button variant="outlined" onClick={handleAdminRedirect}>
                        Admin Page
                    </Button>
                </Paper>
            </Box>

            <Typography variant="body2" align="center" sx={{ color: 'grey.500', paddingBottom: 2 }}>
                © {new Date().getFullYear()} Lexi Project. All Rights Reserved.
            </Typography>
        </Box>
    );
};

export default ProjectOverview;
