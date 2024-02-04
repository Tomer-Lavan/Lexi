import { AdminSections } from '@DAL/constants';
import { getAgents } from '@DAL/server-requests/agents';
import { CreateForm } from '@components/forms/CreateForm';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import useEffectAsync from '@hooks/useEffectAsync';
import { AgentType } from '@models/AppModels';
import { Grid } from '@mui/material';
import theme from '@root/Theme';
import { useState } from 'react';
import { getForms } from '../../DAL/server-requests/forms';
import FormsListContainer from '../../components/forms/FormsListContainer';
import { MainContainer, SectionContainer, SectionInnerContainer } from './Admin.s';
import { AgentsListContainer } from './components/agents-panel/agents-list/AgentsListContainer';
import { Experiments } from './components/experiments-panel/experiments/Experiments';
import { SidebarAdmin } from './components/sidebar-admin/SideBarAdmin';

interface Form {
    _id: string;
    name: string;
}

const Admin = () => {
    const [agents, setAgents] = useState<AgentType[]>([]);
    const [forms, setForms] = useState<Form[]>([]);
    const [section, setSection] = useState(AdminSections.EXPERIMENTS);
    const [selectedFormId, setSelectedFormId] = useState(null);
    const { openSnackbar } = useSnackbar();

    useEffectAsync(async () => {
        try {
            const [agentsRes, formsRes] = await Promise.all([getAgents(), getForms()]);
            setAgents(agentsRes);
            setForms(formsRes);
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
                <SectionContainer
                    sx={{
                        '&.MuiContainer-root': { maxWidth: 'none', padding: 0 },
                        marginLeft: 0,
                        marginRight: 0,
                        padding: 0,
                    }}
                >
                    <SectionInnerContainer container>
                        {section === AdminSections.EXPERIMENTS ? (
                            <Experiments agents={agents} />
                        ) : section === AdminSections.AGENTS ? (
                            <AgentsListContainer agents={agents} setAgents={setAgents} />
                        ) : (
                            <Grid container>
                                <Grid
                                    item
                                    md={3}
                                    style={{
                                        paddingLeft: '32px',
                                        paddingTop: '32px',
                                        paddingRight: '16px',
                                        borderRight: '1px solid #c0c0c0',
                                        backgroundColor: '#f5f5f5',
                                    }}
                                >
                                    <FormsListContainer
                                        forms={forms}
                                        onAddClick={() => console.log('boo')}
                                        setSelectedFormId={setSelectedFormId}
                                    />
                                </Grid>
                                <Grid item md={9}>
                                    <CreateForm editFormId={selectedFormId} setForms={setForms} />
                                </Grid>
                            </Grid>
                        )}
                    </SectionInnerContainer>
                </SectionContainer>
            </Grid>
        </MainContainer>
    );
};

export default Admin;
