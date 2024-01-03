import { updateIMS } from '@DAL/server-requests/conversations';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import theme from '@root/Theme';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FitButton,
    RadioGroupContainer,
    StyledFormControlLabel,
    StyledRadio,
    StyledRadioGroup,
    SurveyButtonContainer,
    SurveyContainer,
    SurveyFieldTitle,
    SurveyTitle,
} from './FormStyles.s';

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
    const [selectedValues, setSelectedValues] = useState<Record<string, string | null>>({});
    const feelingRatings = generateFeelingRatings(isPreConversation);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const handleRadioChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValues({ ...selectedValues, [key]: event.target.value });
    };

    const saveIms = async () => {
        try {
            handleDone();
            await updateIMS(conversationId, selectedValues, isPreConversation);
        } catch (err) {
            console.log("Couldn't save IMS");
        }
    };

    return (
        <SurveyContainer>
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
            <Grid container spacing={isMobile ? 2 : 1} alignItems="center">
                {feelingRatings.map((pair, index) => (
                    <React.Fragment key={pair.feeling}>
                        <Grid item xs={3}>
                            <SurveyFieldTitle isMobile={isMobile}>{pair.feeling}</SurveyFieldTitle>
                        </Grid>
                        <RadioGroupContainer item xs={6}>
                            <StyledRadioGroup
                                row
                                aria-label={pair.feeling}
                                name={pair.feeling}
                                value={selectedValues[pair.key] || ''}
                                onChange={handleRadioChange(pair.key)}
                                isMobile={isMobile}
                            >
                                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                                    <StyledFormControlLabel
                                        key={value}
                                        value={String(value)}
                                        control={
                                            index === 0 ? (
                                                <Typography textAlign={'center'} style={{ width: '24px' }}>
                                                    {value}
                                                </Typography>
                                            ) : (
                                                <StyledRadio size="small" />
                                            )
                                        }
                                        label=""
                                    />
                                ))}
                            </StyledRadioGroup>
                        </RadioGroupContainer>
                        <Grid item xs={3}>
                            <SurveyFieldTitle>{pair.counterFeeling}</SurveyFieldTitle>
                        </Grid>
                    </React.Fragment>
                ))}
                <SurveyButtonContainer>
                    <FitButton
                        variant="contained"
                        color="primary"
                        disabled={Object.keys(selectedValues).length < feelingRatings?.length - 1}
                        onClick={saveIms}
                    >
                        Continue
                    </FitButton>
                </SurveyButtonContainer>
            </Grid>
        </SurveyContainer>
    );
};

export default SurveyComponent;
