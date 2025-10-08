import InfoIcon from '@mui/icons-material/Info';
import { IconButton, Tooltip } from '@mui/material';

type InfoTooltipProps = {
    message: string;
};

export const InfoTooltip = ({ message }: InfoTooltipProps) => {
    const tooltipAttributes = {
        title: message,
        placement: 'top-start' as 'top-start',
        slotProps: {
            popper: {
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, -14],
                        },
                    },
                ],
            },
        },
        componentsProps: {
            tooltip: {
                sx: {
                    width: '10rem',
                },
            },
        },
    };

    return (
        <Tooltip {...tooltipAttributes}>
            <IconButton>
                <InfoIcon fontSize="small" color="primary" />
            </IconButton>
        </Tooltip>
    );
};
