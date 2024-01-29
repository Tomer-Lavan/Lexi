import { Button, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

// Define the type for a single form
interface Form {
    _id: string;
    name: string;
}

// Define the props for the FormsList component
interface FormsListProps {
    forms: Form[];
}

const FormsList: React.FC<FormsListProps> = ({ forms }) => (
    // <Paper elevation={3} style={{ maxWidth: 300, margin: 'auto' }}>
    <List style={{ width: '100%' }}>
        {forms?.map((form, index) => (
            <ListItem button key={form._id} sx={{ borderBottom: '1px solid black' }}>
                <ListItemText
                    style={{ fontSize: '0.875rem', marginRight: 10, marginLeft: 8 }}
                    primary={form.name}
                />
                <Button variant="contained" onClick={() => {}} size="small">
                    Edit
                </Button>
            </ListItem>
        ))}
    </List>
    // </Paper>
);

export default FormsList;
