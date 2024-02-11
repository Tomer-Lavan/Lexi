import { Grid, Radio, RadioGroup, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import theme from '@root/Theme';
import { getFormErrorMessage } from '@utils/commonFunctions';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';

interface ScaleRadioProps {
    fieldKey: string;
    label?: string;
    left: string;
    right: string;
    range: number;
    required: boolean;
    gap?: string;
    numbered?: boolean;
    control?: Control<FieldValues>;
    errors: FieldErrors;
}

const ScaleRadio: React.FC<ScaleRadioProps> = ({
    fieldKey,
    label,
    left,
    right,
    range,
    required = false,
    numbered = false,
    gap = '0px',
    control,
    errors,
}) => {
    const valuesArray = Array.from({ length: range }, (_, i) => i + 1);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const mobileRadioBtnStyle = {
        padding: '3px',
        '& .MuiSvgIcon-root': {
            padding: 0,
            margin: 0,
            fontSize: '1rem',
        },
    };

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {label && (
                <Typography style={{ color: 'grey', marginBottom: '8px', borderBottom: '1px solid grey' }}>
                    {label} {required ? '*' : ''}
                </Typography>
            )}
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
                    {/* <RadioGroup
                            row
                            aria-label={fieldKey}
                            name={fieldKey}
                            sx={{ gap, justifyContent: 'space-between' }}
                        >
                            {valuesArray.map((val) => (
                                <FormControlLabel
                                    key={val}
                                    value={String(val)}
                                    sx={{ margin: 0 }}
                                    control={
                                        <Typography textAlign={'center'} style={{ width: '36px' }}>
                                            {val}
                                        </Typography>
                                    }
                                    label=""
                                />
                            ))}
                        </RadioGroup> */}

                    {control ? (
                        <Controller
                            name={fieldKey || 'field'}
                            control={control}
                            rules={required ? { required: 'This field is required' } : {}}
                            render={({ field: { onChange, value } }) => (
                                <RadioGroup
                                    row
                                    value={value}
                                    onChange={onChange}
                                    aria-label={fieldKey}
                                    sx={{ gap, justifyContent: 'flex-start' }}
                                >
                                    {valuesArray.map((val) => (
                                        <Box key={val} sx={{ textAlign: 'center', margin: '0 0px' }}>
                                            {numbered && <Typography variant="body2">{val}</Typography>}
                                            <Radio
                                                checked={value === String(val)}
                                                onChange={onChange}
                                                value={String(val)}
                                                sx={isMobile ? mobileRadioBtnStyle : {}}
                                                size="small"
                                            />
                                        </Box>
                                    ))}
                                </RadioGroup>
                            )}
                        />
                    ) : (
                        <RadioGroup row aria-label={fieldKey} sx={{ gap, justifyContent: 'flex-start' }}>
                            {valuesArray.map((val) => (
                                <Box key={val} sx={{ textAlign: 'center', margin: '0 0px' }}>
                                    {numbered && <Typography variant="body2">{val}</Typography>}
                                    <Radio
                                        value={String(val)}
                                        sx={isMobile ? mobileRadioBtnStyle : {}}
                                        size="small"
                                    />
                                </Box>
                            ))}
                        </RadioGroup>
                    )}
                </Grid>
                <Grid item xs={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Typography textAlign={'right'} color={'grey'}>
                        {right}
                    </Typography>
                </Grid>
            </Box>
            {errors[fieldKey] && (
                <Typography color="error" variant="caption">
                    {getFormErrorMessage(errors[fieldKey])}
                </Typography>
            )}
        </Box>
    );
};

export default ScaleRadio;
