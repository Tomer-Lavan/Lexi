import { AdminSections } from '@DAL/constants';
import { getModels } from '@DAL/server-requests/models';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import useEffectAsync from '@hooks/useEffectAsync';
import { ModelType } from '@models/AppModels';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { MainContainer, SectionContainer, SectionInnerContainer } from './Admin.s';
import { Experiments } from './components/experiments-panel/experiments/Experiments';
import { ModelsListContainer } from './components/models-panel/models-list/ModelsListContainer';
import { SidebarAdmin } from './components/sidebar-admin/SideBarAdmin';

const Admin = () => {
    const [models, setModels] = useState<ModelType[]>([]);
    const [section, setSection] = useState(AdminSections.EXPERIMENTS);
    const { openSnackbar } = useSnackbar();

    useEffectAsync(async () => {
        try {
            const res = await getModels();
            setModels(res);
        } catch (error) {
            openSnackbar('Failed to load models', SnackbarStatus.ERROR);
            setModels([]);
        }
    }, []);

    return (
        <MainContainer container>
            <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} style={{ backgroundColor: '#102C57' }}>
                <SidebarAdmin section={section} setSection={setSection} />
            </Grid>
            <Grid item xs={10.5} sm={10.5} md={10.5} lg={10.5}>
                <SectionContainer>
                    <SectionInnerContainer container>
                        {section === AdminSections.EXPERIMENTS ? (
                            <Experiments models={models} />
                        ) : (
                            <ModelsListContainer models={models} setModels={setModels} />
                        )}
                    </SectionInnerContainer>
                </SectionContainer>
            </Grid>
        </MainContainer>
    );
};

export default Admin;
