import { Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';

export const AgentDetails = ({ agent }) => (
    <Grid container spacing={2} style={{ padding: '20px', paddingTop: '4px' }}>
        <Grid item xs={12} md={6} style={{ borderRight: '2px solid #eee' }}>
            <Typography variant="h6" gutterBottom>
                Chat Agent Details
            </Typography>
            <Divider style={{ marginBottom: '10px' }} />
            <List>
                <ListItem>
                    <ListItemText primary="First Chat Sentence" secondary={agent.firstChatSentence} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Chat Model" secondary={agent.model} />
                </ListItem>
                {agent.systemStarterPrompt && (
                    <ListItem>
                        <ListItemText primary="System Starter Prompt" secondary={agent.systemStarterPrompt} />
                    </ListItem>
                )}
                {agent.beforeUserSentencePrompt && (
                    <ListItem>
                        <ListItemText
                            primary="Before User Sentence Prompt"
                            secondary={agent.beforeUserSentencePrompt}
                        />
                    </ListItem>
                )}
                {agent.afterUserSentencePrompt && (
                    <ListItem>
                        <ListItemText
                            primary="After User Sentence Prompt"
                            secondary={agent.afterUserSentencePrompt}
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
                        secondary={agent.temperature !== null ? agent.temperature : 'Not Active'}
                    />
                </ListItem>

                <ListItem>
                    <ListItemText
                        primary="Max Tokens"
                        secondary={agent.maxTokens !== null ? agent.maxTokens : 'Not Active'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Top P" secondary={agent.topP !== null ? agent.topP : 'Not Active'} />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Frequency Penalty"
                        secondary={agent.frequencyPenalty !== null ? agent.frequencyPenalty : 'Not Active'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Presence Penalty"
                        secondary={agent.presencePenalty !== null ? agent.presencePenalty : 'Not Active'}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Stop Sequences"
                        secondary={agent.stopSequences.length ? agent.stopSequences.join(', ') : 'Not Active'}
                    />
                </ListItem>
            </List>
        </Grid>
    </Grid>
);
