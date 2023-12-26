import { Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';

export const ModelDetails = ({ model }) => (
    <Grid container spacing={2} style={{ padding: '20px', paddingTop: '4px' }}>
        <Grid item xs={12} md={6} style={{ borderRight: '2px solid #eee' }}>
            <Typography variant="h6" gutterBottom>
                Chat Model Details
            </Typography>
            <Divider style={{ marginBottom: '10px' }} />
            <List>
                <ListItem>
                    <ListItemText primary="First Chat Sentence" secondary={model.firstChatSentence} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Chat Model" secondary={model.chatModel} />
                </ListItem>
                {model.systemStarterPrompt && (
                    <ListItem>
                        <ListItemText primary="System Starter Prompt" secondary={model.systemStarterPrompt} />
                    </ListItem>
                )}
                {model.beforeUserSentencePrompt && (
                    <ListItem>
                        <ListItemText
                            primary="Before User Sentence Prompt"
                            secondary={model.beforeUserSentencePrompt}
                        />
                    </ListItem>
                )}
                {model.afterUserSentencePrompt && (
                    <ListItem>
                        <ListItemText
                            primary="After User Sentence Prompt"
                            secondary={model.afterUserSentencePrompt}
                        />
                    </ListItem>
                )}
            </List>
        </Grid>
        <Grid item xs={12} md={6} style={{ paddingLeft: 0 }}>
            <Typography variant="h6" gutterBottom style={{ paddingLeft: '12px' }}>
                Configuration
            </Typography>
            <Divider style={{ marginBottom: '10px' }} />
            <List style={{ paddingLeft: '24px' }}>
                <ListItem>
                    <ListItemText
                        primary="Temperature"
                        secondary={model.temperature !== null ? model.temperature : 'Not Active'}
                    />
                </ListItem>

                <ListItem>
                    <ListItemText
                        primary="Max Tokens"
                        secondary={model.maxTokens !== null ? model.maxTokens : 'Not Active'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Top P" secondary={model.topP !== null ? model.topP : 'Not Active'} />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Frequency Penalty"
                        secondary={model.frequencyPenalty !== null ? model.frequencyPenalty : 'Not Active'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Presence Penalty"
                        secondary={model.presencePenalty !== null ? model.presencePenalty : 'Not Active'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Stop Sequences"
                        secondary={model.stopSequences.length ? model.stopSequences.join(', ') : 'Not Active'}
                    />
                </ListItem>
            </List>
        </Grid>
    </Grid>
);
