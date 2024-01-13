import { AdminSections } from '@DAL/constants';
import { getAgents } from '@DAL/server-requests/agents';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import useEffectAsync from '@hooks/useEffectAsync';
import { AgentType } from '@models/AppModels';
import { Grid } from '@mui/material';
import theme from '@root/Theme';
import { useState } from 'react';
import { MainContainer, SectionContainer, SectionInnerContainer } from './Admin.s';
import { AgentsListContainer } from './components/agents-panel/agents-list/AgentsListContainer';
import { Experiments } from './components/experiments-panel/experiments/Experiments';
import { SidebarAdmin } from './components/sidebar-admin/SideBarAdmin';

const Admin = () => {
    const [agents, setAgents] = useState<AgentType[]>([]);
    const [section, setSection] = useState(AdminSections.EXPERIMENTS);
    const { openSnackbar } = useSnackbar();

    useEffectAsync(async () => {
        try {
            const res = await getAgents();
            setAgents(res);
        } catch (error) {
            openSnackbar('Failed to load agents', SnackbarStatus.ERROR);
            setAgents([]);
        }
    }, []);

    return (
        <MainContainer container>
            <Grid item xs={2} sm={2} md={2} lg={2} style={{ backgroundColor: theme.palette.primary.main }}>
                <SidebarAdmin section={section} setSection={setSection} />
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={10}>
                <SectionContainer>
                    <SectionInnerContainer container>
                        {section === AdminSections.EXPERIMENTS ? (
                            <Experiments agents={agents} />
                        ) : (
                            <AgentsListContainer agents={agents} setAgents={setAgents} />
                        )}
                    </SectionInnerContainer>
                </SectionContainer>
            </Grid>
        </MainContainer>
    );
};

export default Admin;
