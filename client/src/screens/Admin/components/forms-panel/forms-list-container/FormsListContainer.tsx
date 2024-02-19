import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { AddButton } from '../../experiments-panel/experiments/Experiments.s';
import FormsList from '../forms-list/FormsList'; // Assuming FormsList is in the same directory

interface Form {
    _id: string;
    name: string;
}

interface FormsListContainerProps {
    forms: Form[];
    setForms: (forms) => void;
    setSelectedFormId: (formId: string) => void;
    selectedFormId: string;
}

const FormsListContainer: React.FC<FormsListContainerProps> = ({
    forms,
    setForms,
    setSelectedFormId,
    selectedFormId,
}) => (
    <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{ borderBottom: '1px solid black', marginBottom: '8px' }}
            >
                <Typography variant="h5" gutterBottom fontWeight={500}>
                    Forms
                </Typography>
                <Box display={'flex'} justifyContent={'end'}>
                    <AddButton
                        onClick={() => setSelectedFormId(null)}
                        size="small"
                        sx={{ padding: '3px 0px', minWidth: '32px', margin: 0 }}
                    >
                        <AddIcon style={{ color: 'floralwhite' }} />
                    </AddButton>
                </Box>
            </Box>
            <Typography variant="body2" gutterBottom fontWeight={500} marginBottom={2}>
                Manage your forms, build different questions combinations, attach them later to experiments and
                more
            </Typography>
        </Box>
        <Box height={'62vh'} width={'100%'} style={{ overflowY: 'auto' }}>
            {forms.length ? (
                <FormsList
                    forms={forms}
                    setForms={setForms}
                    setSelectedFormId={setSelectedFormId}
                    selectedFormId={selectedFormId}
                />
            ) : (
                <Typography>No Forms Found</Typography>
            )}
        </Box>
    </Box>
);

export default FormsListContainer;
