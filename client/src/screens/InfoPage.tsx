import InfoIcon from '@mui/icons-material/Info';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';

const InfoPage: React.FC = () => (
    <Container maxWidth="sm" sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card raised sx={{ width: '100%' }}>
            <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <InfoIcon color="primary" sx={{ fontSize: 60 }} />
                    <Typography variant="h5" gutterBottom align="center" sx={{ mt: 2 }}>
                        It seems your experiment is no longer active
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    </Container>
);

export default InfoPage;
