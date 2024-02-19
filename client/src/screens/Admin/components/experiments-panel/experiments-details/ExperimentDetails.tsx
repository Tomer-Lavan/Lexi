import { AgentLeanType, AgentsModes, ExperimentType } from '@models/AppModels';
import { Box, CircularProgress, Grid, Link } from '@mui/material';
import React, { useState } from 'react';
import { getAgentLean } from '../../../../../DAL/server-requests/agents';
import { SnackbarStatus, useSnackbar } from '../../../../../contexts/SnackbarProvider';
import useEffectAsync from '../../../../../hooks/useEffectAsync';
import { AdressContainer, GridContainerStyled, GridItemStyled, TypographyStyled } from './ExperimentsDetails.s';

interface ExperimentDetailsProps {
    row: ExperimentType;
    experimentAgentDetails: {
        activeAgent: AgentLeanType | null;
        abAgents: { agentA: AgentLeanType; agentB: AgentLeanType } | null;
    };
    setExperimentAgentDetails: (experimentAgentDetails) => void;
}

export const ExperimentDetails: React.FC<ExperimentDetailsProps> = ({
    row,
    experimentAgentDetails,
    setExperimentAgentDetails,
}) => {
    const { openSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(!experimentAgentDetails);

    useEffectAsync(async () => {
        if (
            !experimentAgentDetails ||
            (experimentAgentDetails.activeAgent && experimentAgentDetails.activeAgent._id !== row?.activeAgent) ||
            experimentAgentDetails.abAgents?.agentA?._id !== row?.abAgents?.agentA ||
            experimentAgentDetails.abAgents?.agentB?._id !== row?.abAgents?.agentB
        ) {
            setIsLoading(true);
            try {
                if (row.agentsMode === AgentsModes.SINGLE) {
                    const agent = await getAgentLean(row.activeAgent);
                    setExperimentAgentDetails({ activeAgent: agent, abAgents: null });
                } else {
                    const [agentA, agentB] = await Promise.all([
                        getAgentLean(row.abAgents.agentA),
                        getAgentLean(row.abAgents.agentB),
                    ]);
                    setExperimentAgentDetails({ abAgents: { agentA, agentB }, activeAgent: null });
                }
            } catch (error) {
                openSnackbar(
                    `Failed to get ${row.agentsMode === AgentsModes.SINGLE ? 'active agent' : 'agents'}`,
                    SnackbarStatus.ERROR,
                );
            }
            setIsLoading(false);
        }
    }, [row]);

    if (isLoading) {
        return (
            <Box display={'flex'} justifyContent={'center'} width={'100%'} padding={2}>
                <CircularProgress size={32} />;
            </Box>
        );
    }

    return (
        <Box>
            <GridContainerStyled container spacing={2} justifyContent="center" alignItems="center">
                <Grid item>
                    <TypographyStyled variant="subtitle1" color="textSecondary">
                        Mode: <strong>{row.agentsMode}</strong>
                    </TypographyStyled>
                </Grid>
                {row.agentsMode === AgentsModes.SINGLE ? (
                    <Grid item>
                        <TypographyStyled variant="subtitle1" color="textSecondary">
                            Active Agent: <strong>{experimentAgentDetails?.activeAgent?.title}</strong>
                        </TypographyStyled>
                    </Grid>
                ) : (
                    <GridItemStyled item>
                        <Grid item>
                            <TypographyStyled variant="subtitle1" color="textSecondary">
                                Agent A:
                                <strong>{`${experimentAgentDetails?.abAgents?.agentA.title} (${row.abAgents.distA}%)`}</strong>
                            </TypographyStyled>
                        </Grid>
                        <Grid>
                            <TypographyStyled variant="subtitle1" color="textSecondary">
                                Agent B:
                                <strong>{`${experimentAgentDetails?.abAgents?.agentB.title} (${row.abAgents.distB}%)`}</strong>
                            </TypographyStyled>
                        </Grid>
                    </GridItemStyled>
                )}
            </GridContainerStyled>
            <AdressContainer>
                <TypographyStyled variant="subtitle1" color="textSecondary">
                    Experiment Address:
                    <Link
                        href={`${process.env.REACT_APP_FRONTEND_URL}/e/${row._id.toString()}`}
                        target="_blank"
                        rel="noopener"
                    >
                        <strong> {`${process.env.REACT_APP_FRONTEND_URL}/e/${row._id.toString()}`}</strong>
                    </Link>
                </TypographyStyled>
            </AdressContainer>
        </Box>
    );
};
