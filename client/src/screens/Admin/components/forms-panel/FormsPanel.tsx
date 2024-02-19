import { Grid } from '@mui/material';
import { CreateForm } from '@screens/Admin/components/forms-panel/create-form/CreateForm';
import React, { useState } from 'react';
import FormsListContainer from './forms-list-container/FormsListContainer';

interface Form {
    _id: string;
    name: string;
}

interface FormsPanelProps {
    forms: Form[];
    setForms: (forms) => void;
}

const FormsPanel: React.FC<FormsPanelProps> = ({ forms, setForms }) => {
    const [selectedFormId, setSelectedFormId] = useState(null);

    return (
        <Grid container>
            <Grid
                item
                md={3}
                style={{
                    paddingLeft: '32px',
                    paddingTop: '32px',
                    paddingRight: '16px',
                    borderRight: '1px solid #c0c0c0',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <FormsListContainer
                    forms={forms}
                    setForms={setForms}
                    setSelectedFormId={setSelectedFormId}
                    selectedFormId={selectedFormId}
                />
            </Grid>
            <Grid item md={9}>
                <CreateForm editFormId={selectedFormId} setEditFormId={setSelectedFormId} setForms={setForms} />
            </Grid>
        </Grid>
    );
};

export default FormsPanel;
