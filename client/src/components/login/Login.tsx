import CloseIcon from '@mui/icons-material/Close';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogContent,
    FormLabel,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from 'typescript-cookie';
import { api } from '../../services';
import { auth } from '../../types';
import {
    formLabelAttributes,
    headerStackAttributes,
    headerTypographyAttributes,
    submitButtonAttributes,
} from './styles';
import { loginFormInput } from './types';

type LoginProps = {
    closeDialog(): void;
};

export const Login = ({ closeDialog }: LoginProps) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<loginFormInput>({
        userName: '',
        password: '',
    });
    const [failureMessage, setFailureMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await api.auth.login(formData);

        if (!res) {
            setFailureMessage('ההתחברות נכשלה, הפרטים שגויים');
            setOpenDialog(true);

            return;
        }

        const user: auth = {
            userConnected: formData.userName,
            token: res,
        };
        setCookie('auth', JSON.stringify(user), { expires: 2 });
        navigate('/feed');
        window.location.reload();
    };

    const handleCloseDialog = (_event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenDialog(false);
    };

    const clearField = (fieldName: string) => {
        setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: '' }));
    };

    const externalFormBoxAttributes = {
        component: 'form' as 'form',
        autoComplete: 'off',
        onSubmit: handleSubmit,
        sx: {
            textAlign: 'center',
            padding: '1vw',
        },
    };

    const userNameTextFieldAttributes = {
        value: formData.userName,
        name: 'userName',
        placeholder: 'שם משתמש',
        onChange: handleChange,
        sx: { marginBottom: '2vh' },
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => clearField('userName')} size="small">
                        <CloseIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </InputAdornment>
            ),
        },
    };

    const passwordTextFieldAttributes = {
        value: formData.password,
        type: 'password',
        name: 'password',
        placeholder: 'סיסמה',
        onChange: handleChange,
        sx: { marginBottom: '2vh' },
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => clearField('password')}>
                        <CloseIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </InputAdornment>
            ),
        },
    };

    return (
        <Box {...externalFormBoxAttributes}>
            <Stack {...headerStackAttributes}>
                <IconButton onClick={closeDialog}>
                    <CloseIcon />
                </IconButton>
                <Typography {...headerTypographyAttributes}>טופס התחברות</Typography>
            </Stack>
            <Stack direction="column" textAlign="right">
                <FormLabel {...formLabelAttributes}>שם משתמש</FormLabel>
                <TextField {...userNameTextFieldAttributes} />
                <FormLabel {...formLabelAttributes}>סיסמה</FormLabel>
                <TextField {...passwordTextFieldAttributes} />
                <Button {...submitButtonAttributes}>התחבר</Button>
            </Stack>
            <Dialog dir="ltr" open={openDialog} disableScrollLock>
                <Alert onClose={handleCloseDialog} severity="error">
                    <DialogContent sx={{ fontSize: 'medium' }}>{failureMessage}</DialogContent>
                </Alert>
            </Dialog>
        </Box>
    );
};
