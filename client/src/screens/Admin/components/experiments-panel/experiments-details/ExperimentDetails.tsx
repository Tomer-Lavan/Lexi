import { AgentsModes, ExperimentType } from '@models/AppModels';
import { Box, Grid, Link } from '@mui/material';
import React from 'react';
import { AdressContainer, GridContainerStyled, GridItemStyled, TypographyStyled } from './ExperimentsDetails.s';

interface ExperimentDetailsProps {
    row: ExperimentType;
}

export const ExperimentDetails: React.FC<ExperimentDetailsProps> = ({ row }) => (
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
                        Active Agent: <strong>{row.activeAgent.title}</strong>
                    </TypographyStyled>
                </Grid>
            ) : (
                <GridItemStyled item>
                    <Grid item>
                        <TypographyStyled variant="subtitle1" color="textSecondary">
                            Agent A: <strong>{`${row.abAgents.agentA.title} (${row.abAgents.distA}%)`}</strong>
                        </TypographyStyled>
                    </Grid>
                    <Grid>
                        <TypographyStyled variant="subtitle1" color="textSecondary">
                            Agent B: <strong>{`${row.abAgents.agentB.title} (${row.abAgents.distB}%)`}</strong>
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
