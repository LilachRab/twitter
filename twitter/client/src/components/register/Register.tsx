import CloseIcon from '@mui/icons-material/Close';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogContent,
    FormControl,
    FormLabel,
    IconButton,
    InputAdornment,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAME_RULES, PASSWORD_RULES, REQUIRED_FIELD, SUCCESS_STATUS } from '../../constants';
import { api } from '../../services';
import { validateRegisterForm } from '../../utils';
import { ErrorIndicator } from '../errorIndicator';
import { GenderSelector } from '../genderSelector/GenderSelector';
import { InfoTooltip } from '../infoTooltip';
import { registerFormInput } from './types';
import { headerStackAttributes } from './styles';

type RegisterProps = {
    closeDialog(): void;
};

export const Register = ({ closeDialog }: RegisterProps) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<registerFormInput>({
        userName: '',
        name: '',
        email: '',
        birthDate: '',
        gender: '',
        photoURL: '',
        password: '',
        confirmPassword: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [failureMessage, setFailureMessage] = useState('');
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [fieldError, setFieldError] = useState({
        userName: '',
        name: '',
        email: '',
        birthDate: '',
        gender: '',
        photoURL: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSelectGenderChange = (value: string) => {
        setFormData((prevFormData) => ({ ...prevFormData, ['gender']: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(true);
        setFieldError(await validateRegisterForm(formData));
    };

    const clearField = (fieldName: string) => {
        setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: '' }));
    };

    const sendDetailsToServer = async () => {
        const res = await api.auth.register(formData);

        if (res.status === SUCCESS_STATUS) {
            setSuccessMessage('ההרשמה בוצעה בהצלחה');
            setOpenSuccessAlert(true);

            return;
        }

        setFailureMessage('ההרשמה נכשלה, הודעת שרת: ' + `${res.data.message}`);
        setOpenDialog(true);
    };

    const handleCloseAlert = (_event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessAlert(false);
        navigate('/');
        window.location.reload();
    };

    const handleCloseDialog = (_event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenDialog(false);
    };

    useEffect(() => {
        if (
            isSubmitted &&
            fieldError.birthDate &&
            fieldError.confirmPassword &&
            fieldError.email &&
            fieldError.gender &&
            fieldError.name &&
            fieldError.password &&
            fieldError.photoURL &&
            fieldError.userName
        ) {
            sendDetailsToServer();
        }
    }, [fieldError]);

    const externalBoxAttributes = {
        component: 'form' as 'form',
        autoComplete: 'off',
        onSubmit: handleSubmit,
        sx: { padding: '1vw', textAlign: 'center' },
    };

    const userNameTextFieldAttributes = {
        fullWidth: true,
        value: formData.userName,
        name: 'userName',
        placeholder: 'שם משתמש',
        onChange: handleChange,
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

    const nameTextFieldAttributes = {
        fullWidth: true,
        value: formData.name,
        name: 'name',
        placeholder: 'שם מלא',
        onChange: handleChange,
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => clearField('name')} size="small">
                        <CloseIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </InputAdornment>
            ),
        },
    };

    const emailTextFieldAttributes = {
        fullWidth: true,
        value: formData.email,
        name: 'email',
        placeholder: 'מייל',
        onChange: handleChange,
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => clearField('email')} size="small">
                        <CloseIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </InputAdornment>
            ),
        },
    };

    const birthDateTextFieldAttributes = {
        fullWidth: true,
        type: 'date',
        name: 'birthDate',
        value: formData.birthDate,
        onChange: handleChange,
    };

    const photoURLTextFieldAttributes = {
        fullWidth: true,
        type: 'text',
        value: formData.photoURL,
        name: 'photoURL',
        placeholder: 'קישור לתמונת פרופיל',
        onChange: handleChange,
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => clearField('photoURL')} size="small">
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
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => clearField('password')} size="small">
                        <CloseIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </InputAdornment>
            ),
        },
    };

    const confirmPasswordTextFieldAttributes = {
        value: formData.confirmPassword,
        type: 'password',
        name: 'confirmPassword',
        placeholder: 'אימות סיסמה',
        onChange: handleChange,
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => clearField('confirmPassword')} size="small">
                        <CloseIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </InputAdornment>
            ),
        },
    };

    const snackbarAttributes = {
        open: openSuccessAlert,
        autoHideDuration: 2000,
        onClose: handleCloseAlert,
        sx: { width: '30vw', height: '3vh' },
    };

    return (
        <Box {...externalBoxAttributes}>
            <Stack {...headerStackAttributes}>
                <IconButton onClick={closeDialog}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" color="primary">
                    טופס הרשמה
                </Typography>
            </Stack>
            <Stack direction="row" sx={{ marginBottom: '0.5vh', gap: '27%' }}>
                <FormLabel>
                    * שם משתמש
                    <InfoTooltip message={'יכול להיות בעברית וגם באנגלית'} />
                </FormLabel>
                <FormLabel>
                    * שם מלא
                    <InfoTooltip message={NAME_RULES} />
                </FormLabel>
            </Stack>
            <Stack direction="row" sx={{ marginBottom: '2vh', gap: '2%' }}>
                <FormControl>
                    <TextField {...userNameTextFieldAttributes} />
                    {isSubmitted && formData.userName === '' && <ErrorIndicator error={REQUIRED_FIELD} />}
                    {fieldError.userName !== '' && <ErrorIndicator error={fieldError.userName} />}
                </FormControl>
                <FormControl>
                    <TextField {...nameTextFieldAttributes} />
                    {isSubmitted && formData.name === '' && <ErrorIndicator error={REQUIRED_FIELD} />}
                    {fieldError.name !== '' && <ErrorIndicator error={fieldError.name} />}
                </FormControl>
            </Stack>
            <Stack direction="column" sx={{ marginBottom: '2vh', textAlign: 'right' }}>
                <FormLabel sx={{ marginBottom: '0.5vh' }}>* מייל</FormLabel>
                <FormControl>
                    <TextField {...emailTextFieldAttributes} />
                    {isSubmitted && formData.email === '' && <ErrorIndicator error={REQUIRED_FIELD} />}
                    {fieldError.email !== '' && <ErrorIndicator error={fieldError.email} />}
                </FormControl>
            </Stack>
            <Stack direction="row" sx={{ marginBottom: '0.5vh', gap: '37%' }}>
                <FormLabel>* בחר מגדר</FormLabel>
                <FormLabel>* תאריך לידה</FormLabel>
            </Stack>
            <Stack direction="row" justifyContent="center" sx={{ marginBottom: '2vh', gap: '2%' }}>
                <FormControl sx={{ minWidth: '50%' }}>
                    <GenderSelector updateGender={handleSelectGenderChange} />
                    {isSubmitted && formData.gender === '' && <ErrorIndicator error={REQUIRED_FIELD} />}
                    {fieldError.gender !== '' && <ErrorIndicator error={fieldError.gender} />}
                </FormControl>
                <FormControl sx={{ minWidth: '50%' }}>
                    <TextField {...birthDateTextFieldAttributes} />
                    {isSubmitted && formData.birthDate === '' && <ErrorIndicator error={REQUIRED_FIELD} />}
                    {fieldError.birthDate !== '' && <ErrorIndicator error={fieldError.birthDate} />}
                </FormControl>
            </Stack>
            <Stack direction="column" sx={{ marginBottom: '2vh', textAlign: 'right' }}>
                <FormLabel sx={{ marginBottom: '0.5vh' }}>קישור לתמונת פרופיל</FormLabel>
                <TextField {...photoURLTextFieldAttributes} />
                {fieldError.photoURL !== '' && <ErrorIndicator error={fieldError.photoURL} />}
            </Stack>
            <Stack direction="row" sx={{ marginBottom: '0.5vh', gap: '34%' }}>
                <FormLabel>
                    * סיסמה
                    <InfoTooltip message={PASSWORD_RULES} />
                </FormLabel>
                <FormLabel>
                    * אימות סיסמה
                    <InfoTooltip message={'סיסמה תואמת לסיסמה שבחרת'} />
                </FormLabel>
            </Stack>
            <Stack direction="row" sx={{ marginBottom: '2vh', gap: '2%' }}>
                <FormControl sx={{ maxWidth: '50%' }}>
                    <TextField {...passwordTextFieldAttributes} />
                    {isSubmitted && formData.password === '' && <ErrorIndicator error={REQUIRED_FIELD} />}
                    {fieldError.password !== '' && <ErrorIndicator error={fieldError.password} />}
                </FormControl>
                <FormControl>
                    <TextField {...confirmPasswordTextFieldAttributes} />
                    {isSubmitted && formData.confirmPassword === '' && <ErrorIndicator error={REQUIRED_FIELD} />}
                    {fieldError.confirmPassword !== '' && <ErrorIndicator error={fieldError.confirmPassword} />}
                </FormControl>
            </Stack>
            <Button type="submit" variant="outlined" sx={{ width: '50%', fontSize: 'medium' }}>
                הירשם
            </Button>
            <Snackbar {...snackbarAttributes}>
                <Alert onClose={handleCloseAlert} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
            <Dialog open={openDialog} disableScrollLock>
                <Alert onClose={handleCloseDialog} severity="error">
                    <DialogContent sx={{ fontSize: 'medium' }}>{failureMessage}</DialogContent>
                </Alert>
            </Dialog>
        </Box>
    );
};
