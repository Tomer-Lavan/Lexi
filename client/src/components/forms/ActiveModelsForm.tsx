import { defaultAbModels, defaultSettings } from '@DAL/constants';
import { AbModelsType, ExperimentType, ModelType, ModelsModes } from '@models/AppModels';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { AbModels } from '@screens/Admin/components/models-panel/active-models/AbModels';
import { MainContainer } from '@screens/Admin/components/models-panel/model-form/ModelForm.s';
import React, { useState } from 'react';

const modelsModes = ['Single', 'A/B'] as const;

interface ActiveModelsFormProps {
    experiment: ExperimentType;
    setExperiment: (experiment: ExperimentType) => void;
    models: ModelType[];
    isRow?: boolean;
}

export const ActiveModelsForm: React.FC<ActiveModelsFormProps> = ({
    experiment,
    setExperiment,
    models,
    isRow = true,
}) => {
    const [abModels, setAbModels] = useState<AbModelsType>(experiment.abModels || defaultAbModels);

    const handleActiveModelChange = (event) => {
        const { value } = event.target;
        const selectedModel = models.find((model) => model.title === value);
        setExperiment({ ...experiment, activeModel: selectedModel || defaultSettings });
    };

    const handleModelsModeChange = (event) => {
        const { value } = event.target;
        setExperiment({ ...experiment, modelsMode: value });
    };

    const handleChangeAB = (event) => {
        const { name, value } = event.target;
        if (name !== 'distA' && name !== 'distB') {
            const selectedModel = models.find((model) => model.title === value);
            setAbModels({ ...abModels, [name]: selectedModel });
            setExperiment({ ...experiment, abModels: { ...abModels, [name]: selectedModel } });
        } else {
            setAbModels({
                ...abModels,
                [name]: Number(value),
                ['distA' === name ? 'distB' : 'distA']: 100 - value,
            });
            setExperiment({
                ...experiment,
                abModels: { ...abModels, [name]: value, ['distA' === name ? 'distB' : 'distA']: 100 - value },
            });
        }
    };

    return (
        <MainContainer
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: isRow ? 'row' : 'column',
                alignItems: 'start',
                width: '100%',
                gap: isRow ? 4 : 0,
                padding: 0,
                justifyContent: 'start',
            }}
            disableGutters
        >
            <FormControl
                margin="normal"
                size="small"
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
            >
                <Typography>Models Mode:</Typography>
                <Select
                    labelId="model-mode-select-label"
                    value={experiment.modelsMode}
                    onChange={handleModelsModeChange}
                    name="modelsMode"
                >
                    {modelsModes.map((model) => (
                        <MenuItem key={model} value={model}>
                            {model}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {experiment.modelsMode === ModelsModes.SINGLE ? (
                <FormControl
                    margin="normal"
                    size="small"
                    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
                >
                    <Typography>Active Model:</Typography>
                    <Select
                        labelId="active-model-select-label"
                        value={experiment.activeModel ? experiment.activeModel.title : ''}
                        onChange={handleActiveModelChange}
                        name="activeModel"
                        style={{ minWidth: '100px' }}
                    >
                        {models.map((model) => (
                            <MenuItem key={model.title} value={model.title}>
                                {model.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : (
                <AbModels models={models} abModels={abModels} handleChangeAB={handleChangeAB} isRow={isRow} />
            )}
        </MainContainer>
    );
};
