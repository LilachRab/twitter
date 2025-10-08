import { Box, Stack, Typography } from '@mui/material';
import { boxAttributes, stackAttributes, typographyAttributes } from './styles';

export const PageNotFound = () => {
    return (
        <Box sx={{ marginTop: '10vh' }}>
            <Stack {...stackAttributes}>
                <Typography {...typographyAttributes}>404 Page Not Found, Wrong Path</Typography>
                <Box {...boxAttributes} />
            </Stack>
        </Box>
    );
};
