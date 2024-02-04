import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { AddButton } from '../../screens/Admin/components/experiments-panel/experiments/Experiments.s';
import FormsList from './FormsList'; // Assuming FormsList is in the same directory

interface Form {
    _id: string;
    name: string;
}

interface FormsListContainerProps {
    forms: Form[];
    onAddClick: () => void;
    setSelectedFormId: (formId: string) => void;
}

const FormsListContainer: React.FC<FormsListContainerProps> = ({ forms, onAddClick, setSelectedFormId }) => (
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
                        onClick={() => {}}
                        size="small"
                        sx={{ padding: '4px 0px', minWidth: '36px', margin: 0 }}
                    >
                        <AddIcon style={{ color: 'floralwhite' }} />
                        {/* <Typography fontSize={'0.875rem'} color={'floralwhite'}>
                            Add Form
                        </Typography> */}
                    </AddButton>
                </Box>
            </Box>
            <Typography variant="body2" gutterBottom fontWeight={500} marginBottom={2}>
                Manage your forms, build different questions combinations, attach them later to experiments and
                more
            </Typography>
        </Box>
        {forms.length ? (
            <FormsList forms={forms} setSelectedFormId={setSelectedFormId} />
        ) : (
            <Typography>No Forms Found</Typography>
        )}
    </Box>
);

export default FormsListContainer;
