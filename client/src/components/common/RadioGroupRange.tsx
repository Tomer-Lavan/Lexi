import { FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';

const RadioGroupRange = ({ left, right, range, field, values, handleRadioChange, gap = '16px' }) => {
    const valuesArray = Array.from({ length: range }, (_, i) => i + 1);

    return (
        <Box key={left} style={{ display: 'flex' }}>
            <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography textAlign={'left'} color={'grey'}>
                    {left}
                </Typography>
            </Grid>
            <Grid
                item
                xs={8}
                style={{
                    borderLeft: '1px solid #D3D3D3',
                    borderRight: '1px solid #D3D3D3',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <RadioGroup
                    row
                    aria-label={left}
                    name={left}
                    value={values[field] || ''}
                    onChange={handleRadioChange(field)}
                    sx={{ gap }}
                >
                    {valuesArray.map((value) => (
                        <FormControlLabel
                            key={value}
                            value={String(value)}
                            control={<Radio size="small" />}
                            label=""
                        />
                    ))}
                </RadioGroup>
            </Grid>
            <Grid item xs={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Typography textAlign={'right'} color={'grey'}>
                    {right}
                </Typography>
            </Grid>
        </Box>
    );
};

export default RadioGroupRange;
