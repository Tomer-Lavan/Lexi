import { updateIMS } from '@DAL/server-requests/conversations';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import theme from '@root/Theme';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FitButton } from '../CommonFormStyles.s';
import {
    RadioGroupContainer,
    StyledFormControlLabel,
    StyledRadio,
    StyledRadioGroup,
    SurveyButtonContainer,
    SurveyContainer,
    SurveyFieldTitle,
    SurveyTitle,
} from './SurveyForm.s';

interface FeelingRating {
    feeling: string;
    counterFeeling: string;
    key: string;
}

const feelingsPairs = [
    { feeling: '', counterFeeling: '' },
    { feeling: 'Worthless', counterFeeling: 'Valuable' },
    { feeling: 'Pessimistic', counterFeeling: 'Optimistic' },
    { feeling: 'Apathetic', counterFeeling: 'Motivated' },
    { feeling: 'Guilty', counterFeeling: 'Proud' },
    { feeling: 'Numb', counterFeeling: 'Interested' },
    { feeling: 'Withdrawn', counterFeeling: 'Welcoming' },
    { feeling: 'Hopeless', counterFeeling: 'Hopeful' },
    { feeling: 'Tense', counterFeeling: 'Relaxed' },
    { feeling: 'Worried', counterFeeling: 'Untroubled' },
    { feeling: 'Fearful', counterFeeling: 'Fearless' },
    { feeling: 'Anxious', counterFeeling: 'Peaceful' },
    { feeling: 'Restless', counterFeeling: 'Calm' },
];

const generateFeelingRatings = (isPreConversation: boolean): FeelingRating[] => {
    const prefix = isPreConversation ? 'imsPre' : 'imsPost';

    return feelingsPairs.map((pair, index) => ({
        ...pair,
        key: `${prefix}${index}`,
    }));
};

interface SurveyComponentProps {
    conversationId: string;
    isPreConversation: boolean;
    handleDone: () => void;
}

const SurveyComponent: React.FC<SurveyComponentProps> = ({ conversationId, isPreConversation, handleDone }) => {
    const { control, handleSubmit, watch } = useForm();
    const watchedValues = watch();
    const feelingRatings = generateFeelingRatings(isPreConversation);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            handleDone();
            await updateIMS(conversationId, data, isPreConversation);
        } catch (err) {
            console.log("Couldn't save IMS");
        }
    };

    const allQuestionsAnswered = () => feelingRatings.slice(1).every((pair) => watchedValues[pair.key]);

    return (
        <SurveyContainer isMobile={isMobile}>
            {isPreConversation && (
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton color="inherit" onClick={() => navigate(-1)}>
                        <ArrowBackIcon />
                    </IconButton>
                    <SurveyFieldTitle>Go Back Home</SurveyFieldTitle>
                </Box>
            )}
            <SurveyTitle variant="h6" gutterBottom>
                On a scale of 1 to 7, please rate how you feel now.
            </SurveyTitle>
            <Grid container spacing={isMobile ? 1.5 : 1} sx={{ marginLeft: 0 }}>
                {feelingRatings.map((pair, index) => (
                    <React.Fragment key={pair.feeling}>
                        <Grid item xs={3}>
                            <SurveyFieldTitle isMobile={isMobile}>{pair.feeling}</SurveyFieldTitle>
                        </Grid>
                        <RadioGroupContainer item xs={6}>
                            {index === 0 ? (
                                <StyledRadioGroup row aria-label={pair.feeling} isMobile={isMobile}>
                                    {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                                        <StyledFormControlLabel
                                            key={value}
                                            value={String(value)}
                                            control={
                                                <Typography textAlign={'center'} style={{ width: '24px' }}>
                                                    {value}
                                                </Typography>
                                            }
                                            label=""
                                        />
                                    ))}
                                </StyledRadioGroup>
                            ) : (
                                <Controller
                                    name={pair.key}
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <StyledRadioGroup
                                            {...field}
                                            row
                                            aria-label={pair.feeling}
                                            isMobile={isMobile}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                                                <StyledFormControlLabel
                                                    key={value}
                                                    value={String(value)}
                                                    control={<StyledRadio size="small" />}
                                                    label=""
                                                />
                                            ))}
                                        </StyledRadioGroup>
                                    )}
                                />
                            )}
                        </RadioGroupContainer>
                        <Grid item xs={3}>
                            <SurveyFieldTitle isMobile={isMobile}>{pair.counterFeeling}</SurveyFieldTitle>
                        </Grid>
                    </React.Fragment>
                ))}
                <SurveyButtonContainer>
                    <FitButton
                        variant="contained"
                        color="primary"
                        disabled={!allQuestionsAnswered()}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Continue
                    </FitButton>
                </SurveyButtonContainer>
            </Grid>
        </SurveyContainer>
    );
};

export default SurveyComponent;
