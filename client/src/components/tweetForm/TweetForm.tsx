import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, FormControl, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { REQUIRED_FIELD } from '../../constants';
import { isValidImg } from '../../utils';
import { ErrorIndicator } from '../errorIndicator';
import { postFormInput } from '../post/types';
import { TweetButton } from '../tweetButton';
import { contentStackAttributes, externalBoxAttributes, footerStackAttributes } from './styles';

type TweetFormProps = {
    parent: number | null;
    ProfileImgURL: string;
    createPostMethod(data: postFormInput, parent: number | null, updatePostsList: (sortBy: string) => void): void;
    updatePostsList(sortBy: string): void;
};

export const TweetForm = ({ parent, ProfileImgURL, createPostMethod, updatePostsList }: TweetFormProps) => {
    const [newPostInput, setNewPostInput] = useState<postFormInput>({
        content: '',
        photoURL: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setIsSubmitted(false);
        setNewPostInput((prevPostInput) => ({ ...prevPostInput, [name]: value }));
    };

    const handleTweetClicked = async () => {
        setIsSubmitted(true);

        if (!newPostInput.content) {
            return;
        }

        if (newPostInput.photoURL && !(await isValidImg(newPostInput.photoURL))) {
            setErrorMessage('קישור תמונה לא תקין');
            setErrorVisible(true);

            return;
        }

        setErrorVisible(false);
        createPostMethod(newPostInput, parent, updatePostsList);
        setNewPostInput({ content: '', photoURL: '' });
        setIsSubmitted(false);
    };

    const clearField = (fieldName: string) => {
        setNewPostInput((prevFormData) => ({ ...prevFormData, [fieldName]: '' }));
    };

    const contentTextFieldAttributes = {
        name: 'content',
        variant: 'standard' as 'standard',
        autoComplete: 'off',
        placeholder: 'ציף ציף ציף',
        multiline: true,
        maxRows: 4,
        value: newPostInput.content,
        sx: { marginRight: '1vw', width: '100%', border: 'none' },
        onChange: handleChange,
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => clearField('content')} size="small">
                        <CloseIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </InputAdornment>
            ),
        },
    };

    const photoURLTextFieldAttributes = {
        type: 'url',
        name: 'photoURL',
        variant: 'standard' as 'standard',
        autoComplete: 'off',
        placeholder: 'הכנס קישור לתמונה',
        value: newPostInput.photoURL,
        sx: { marginBottom: '1vh', marginRight: '1.5%', width: '100%' },
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

    const photoIconButtonAttributes = {
        onClick: () => setInputVisible(!inputVisible),
        sx: { marginLeft: 'auto', marginRight: '3rem', color: 'purple' },
    };

    const tweetButtonAttributes = {
        width: '20%',
        onClick: handleTweetClicked,
    };

    return (
        <Box {...externalBoxAttributes}>
            <Stack {...contentStackAttributes}>
                <Avatar src={ProfileImgURL} />
                <FormControl sx={{ width: '89%' }}>
                    <TextField {...contentTextFieldAttributes} />
                    {isSubmitted && !newPostInput.content && <ErrorIndicator error={REQUIRED_FIELD} />}
                </FormControl>
            </Stack>
            {inputVisible && (
                <FormControl sx={{ width: '100%' }}>
                    <TextField {...photoURLTextFieldAttributes} />
                    {isSubmitted && errorVisible && <ErrorIndicator error={errorMessage} />}
                </FormControl>
            )}
            <Stack {...footerStackAttributes}>
                <IconButton {...photoIconButtonAttributes}>
                    <AddPhotoAlternateIcon />
                </IconButton>
                <TweetButton {...tweetButtonAttributes} />
            </Stack>
        </Box>
    );
};
