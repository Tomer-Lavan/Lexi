import { Grid } from '@mui/material';
import { useState } from 'react';
import { getModels } from '../../DAL/server-requests/modelsDAL';
import useEffectAsync from '../../hooks/useEffectAsync';
import { ModelType } from '../../models/AppModels';
import { MainContainer, SectionContainer, SectionInnerContainer } from './Admin.s';
import { Experiments } from './components/experiments-panel/experiments/Experiments';
import { ModelsListContainer } from './components/models-panel/models-list/ModelsListContainer';
import { SidebarAdmin } from './components/sidebar-admin/SideBarAdmin';

enum Sections {
    MODELS = 'models',
    EXPERIMENTS = 'experiments',
}

const Admin = () => {
    const [models, setModels] = useState<ModelType[]>([]);
    const [section, setSection] = useState(Sections.EXPERIMENTS);

    useEffectAsync(async () => {
        const res = await getModels();
        setModels(res);
    }, []);

    return (
        <MainContainer container>
            <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} style={{ backgroundColor: '#102C57' }}>
                <SidebarAdmin section={section} setSection={setSection} />
            </Grid>
            <Grid item xs={10.5} sm={10.5} md={10.5} lg={10.5}>
                <SectionContainer>
                    <SectionInnerContainer container>
                        {section === Sections.EXPERIMENTS ? (
                            <Experiments models={models} />
                        ) : (
                            <ModelsListContainer models={models} setModels={setModels} />
                        )}
                    </SectionInnerContainer>
                </SectionContainer>
            </Grid>
            {/* <Grid item xs={2} sm={2} md={2} lg={2}>
                <ActiveModels models={models} />
            </Grid> */}
        </MainContainer>
    );
};

export default Admin;
