import { Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../../../../../Theme';

export const CreateFormContainer = styled(Grid)(() => ({
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
}));

export const QuestionsDisplayHeader = styled(Box)(() => ({
    marginBottom: theme.spacing(2),
    width: '100%',
}));

export const QuestionsDisplayContainer = styled(Grid)(() => ({
    padding: '8px',
    paddingTop: '12px',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    overflowY: 'auto',
    height: '100vh',
}));

export const QuestionBox = styled(Box)<{ selected: boolean }>(({ selected }) => ({
    marginBottom: theme.spacing(2),
    display: 'flex',
    gap: theme.spacing(2),
    border: selected ? `1px solid ${theme.palette.secondary.main}` : '',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    width: '100%',
}));

export const EditButton = styled(Button)(() => ({
    minWidth: '36px',
    height: 'fit-content',
    padding: theme.spacing(1),
    fontSize: '1.25rem',
}));

export const DeleteButton = styled(Button)(() => ({
    minWidth: '36px',
    border: `1px solid red`,
    height: 'fit-content',
    padding: theme.spacing(1),
    fontSize: '1.25rem',
    color: 'black',
}));

export const AddQuestionButton = styled(Button)(() => ({
    width: 'fit-content',
}));

export const FormEditMenuContainer = styled(Grid)(() => ({
    padding: theme.spacing(2),
    overflowY: 'auto',
    height: '100vh',
    borderLeft: '1px solid #c0c0c0',
}));
