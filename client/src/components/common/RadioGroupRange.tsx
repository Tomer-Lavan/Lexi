import { FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Controller } from 'react-hook-form';

const RadioGroupRange = ({ left, right, range, field, gap = '16px', control }) => {
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
                <Controller
                    name={field}
                    control={control}
                    rules={{ required: 'This field is required' }}
                    render={({ field: { onChange, value } }) => (
                        <RadioGroup
                            row
                            value={value}
                            onChange={onChange}
                            aria-label={field}
                            name={field}
                            sx={{ gap }}
                        >
                            {valuesArray.map((val) => (
                                <FormControlLabel
                                    key={val}
                                    value={String(val)}
                                    sx={{ margin: 0 }}
                                    control={
                                        <Radio
                                            size="small"
                                            sx={{
                                                padding: '3px',
                                                '& .MuiSvgIcon-root': {
                                                    // Adjust the radio icon size
                                                    padding: 0,
                                                    margin: 0,
                                                    fontSize: '1rem', // Smaller size (adjust as needed)
                                                },
                                            }}
                                        />
                                    }
                                    label=""
                                />
                            ))}
                        </RadioGroup>
                    )}
                />
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
