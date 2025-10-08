import { Box, Dialog, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { CustomButton } from '../../components/customButton';
import { Login } from '../../components/login';
import { Register } from '../../components/register';
import {
    authGridAttributes,
    contentGridAttributes,
    externalGridAttributes,
    mainTypographyAttributes,
    pictureBoxAttributes,
    pictureGridAttributes,
} from './styles';

export const WelcomePage = () => {
    const [openRegister, setOpenRegister] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    const loginDialogAttributes = {
        open: openLogin,
        onClose: () => setOpenLogin(false),
        maxWidth: 'xs' as 'xs',
        fullWidth: true,
    };

    const registerDialogAttributes = {
        open: openRegister,
        onClose: () => setOpenRegister(false),
    };

    return (
        <Grid {...externalGridAttributes}>
            <Grid {...contentGridAttributes}>
                <Typography {...mainTypographyAttributes}>בואו לצייץ אצלנו</Typography>
                <Grid {...authGridAttributes}>
                    <CustomButton text="להתחברות" sx={{ marginLeft: '1vw' }} onClick={() => setOpenLogin(true)} />
                    <Dialog {...loginDialogAttributes}>
                        <Login closeDialog={() => setOpenLogin(false)} />
                    </Dialog>
                    <CustomButton text="ליצירת חשבון" onClick={() => setOpenRegister(true)} />
                    <Dialog {...registerDialogAttributes}>
                        <Register closeDialog={() => setOpenRegister(false)} />
                    </Dialog>
                </Grid>
            </Grid>
            <Grid {...pictureGridAttributes}>
                <Box {...pictureBoxAttributes} />
            </Grid>
        </Grid>
    );
};
