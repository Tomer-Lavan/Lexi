import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Grid, IconButton, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateConversationMetadata } from '../../../DAL/server-requests/conversations';
import theme from '../../../Theme';
import { Pages } from '../../../app/App';
import { useConversationId } from '../../../hooks/useConversationId';
import { useExperimentId } from '../../../hooks/useExperimentId';
import Question from '../../questions/Question';
import { FitButton } from '../CommonFormStyles.s';
import {
    ConversationFormButtonContainer,
    ConversationFormContainer,
    ConversationFormFieldTitle,
    ConversationFormTitle,
} from './ConversationForm.s';

interface FinalRegisterFormProps {
    form: any;
    isPreConversation: boolean;
    handleDone: () => void;
}

export const ConversationForm: React.FC<FinalRegisterFormProps> = ({ form, isPreConversation, handleDone }) => {
    const conversationId = useConversationId();
    const experimentId = useExperimentId();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            handleDone();
            await updateConversationMetadata(conversationId, data, isPreConversation);
        } catch (err) {
            console.log("Couldn't Save Conversation Metadata");
        }
    };

    return (
        <ConversationFormContainer
            isMobile={isMobile}
            style={{ paddingLeft: isMobile ? '4px' : '4vw', paddingRight: isMobile ? '4px' : '4vw' }}
        >
            {isPreConversation && (
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        onClick={() => navigate(`${Pages.EXPERIMENT.replace(':experimentId', experimentId)}`)}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <ConversationFormFieldTitle>Go Back Home</ConversationFormFieldTitle>
                </Box>
            )}
            <ConversationFormTitle variant="h4" gutterBottom style={{ margin: 0 }}>
                {form.title}
            </ConversationFormTitle>
            <ConversationFormTitle variant="subtitle1" gutterBottom style={{ margin: 0, marginBottom: '16px' }}>
                {form.instructions}
            </ConversationFormTitle>
            {form &&
                form?.questions.map((question, index) => (
                    <Grid item xs={12} key={index}>
                        <Question
                            type={question.type}
                            props={question.props}
                            errors={errors}
                            register={register}
                            getValues={getValues}
                            setValue={setValue}
                            control={control}
                        />
                    </Grid>
                ))}

            <ConversationFormButtonContainer>
                <FitButton variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                    Continue
                </FitButton>
            </ConversationFormButtonContainer>
        </ConversationFormContainer>
    );
};
