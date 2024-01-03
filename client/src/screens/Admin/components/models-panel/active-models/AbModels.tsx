import { AbModelsType, ModelType } from '@models/AppModels';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';

interface AbModelsProps {
    models: ModelType[];
    abModels: AbModelsType;
    handleChangeAB?: (any) => void;
    isRow?: boolean;
    setAbModels?;
}

export const AbModels: React.FC<AbModelsProps> = ({ models, abModels, handleChangeAB, isRow = true }) => (
    <Box
        style={{
            display: 'flex',
            flexDirection: isRow ? 'row' : 'column',
            gap: isRow ? '32px' : 0,
            alignItems: 'start',
        }}
    >
        <FormControl
            margin="normal"
            size="small"
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
        >
            <Typography>Model A:</Typography>
            <Select
                value={abModels ? abModels.modelA.title : ''}
                onChange={handleChangeAB}
                name="modelA"
                size="small"
                style={{ minWidth: '100px' }}
            >
                {models.map((model) => (
                    <MenuItem key={model.title} value={model.title}>
                        {model.title}
                    </MenuItem>
                ))}
            </Select>
            <input
                type="number"
                name="distA"
                value={abModels ? abModels.distA : 50}
                onChange={handleChangeAB}
                style={{ width: '40px' }}
            />
        </FormControl>
        <FormControl
            margin="normal"
            size="small"
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
        >
            <Typography>Model B:</Typography>
            <Select
                value={abModels ? abModels.modelB.title : ''}
                onChange={handleChangeAB}
                name="modelB"
                size="small"
                style={{ minWidth: '100px' }}
            >
                {models.map((model) => (
                    <MenuItem key={model.title} value={model.title}>
                        {model.title}
                    </MenuItem>
                ))}
            </Select>
            <input
                type="number"
                name="distB"
                value={abModels ? abModels.distB : 50}
                onChange={handleChangeAB}
                style={{ width: '40px' }}
            />
        </FormControl>
    </Box>
);
