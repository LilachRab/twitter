import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Button, Dialog, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../../constants';
import { logOut } from '../../services';
import { postFormInput } from '../post/types';
import { TweetButton } from '../tweetButton';
import { TweetForm } from '../tweetForm';
import {
    bodyGridAttributes,
    dialogHeaderStackAttributes,
    externalGridAttributes,
    footerGridAttributes,
    headerGridAttributes,
    headerTypographyAttributes,
    menuIconAttributes,
} from './styles';

type SideNavBarProps = {
    ProfileImgURL: string;
    createPostMethod(data: postFormInput, parent: number | null, updatePostsList: (sortBy: string) => void): void;
    updatePostsList(sortBy: string): void;
};

export const SideNavBar = ({ ProfileImgURL, createPostMethod, updatePostsList }: SideNavBarProps) => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    const menuButtonAttributes = {
        variant: 'outlined' as 'outlined',
        sx: {
            marginBottom: '2vh',
            width: '60%',
        },
    };
    const logOutLinkAttributes = {
        component: 'button',
        variant: 'body2' as 'body2',
        sx: { margin: 2 },
        onClick: () => logOut(navigate),
    };
    const tweetFormDialogAttributes = {
        open: openDialog,
        onClose: () => setOpenDialog(false),
        disableScrollLock: true,
        sx: { height: '60vh' },
    };

    const tweetFormAttributes = {
        parent: null,
        ProfileImgURL: ProfileImgURL,
        createPostMethod: createPostMethod,
        updatePostsList: updatePostsList,
    };

    const tweetButtonAttributes = {
        width: '50%',
        onClick: () => setOpenDialog(true),
    };

    const dialogBoxAttributes = {
        sx: { width: '30vw', height: '25vh' },
    };

    return (
        <Grid {...externalGridAttributes}>
            <Grid {...headerGridAttributes}>
                <Grid item>
                    <Typography {...headerTypographyAttributes}>שלום {String(Auth.userConnected)}</Typography>
                </Grid>
                <Grid item>
                    <TwitterIcon color="secondary" />
                </Grid>
            </Grid>
            <Grid {...bodyGridAttributes}>
                <Button {...menuButtonAttributes} startIcon={<HomeRoundedIcon {...menuIconAttributes} />}>
                    דף הבית
                </Button>
                <Button {...menuButtonAttributes} startIcon={<SearchRoundedIcon {...menuIconAttributes} />}>
                    חיפוש
                </Button>
                <Button
                    {...menuButtonAttributes}
                    startIcon={<NotificationsActiveRoundedIcon {...menuIconAttributes} />}
                >
                    התראות
                </Button>
                <Button {...menuButtonAttributes} startIcon={<EmailIcon {...menuIconAttributes} />}>
                    הודעות
                </Button>
                <Button {...menuButtonAttributes} startIcon={<BookmarkIcon {...menuIconAttributes} />}>
                    סימניות
                </Button>
                <Button {...menuButtonAttributes} startIcon={<FormatListBulletedIcon {...menuIconAttributes} />}>
                    רשימות
                </Button>
                <Button {...menuButtonAttributes} startIcon={<AccountBoxIcon {...menuIconAttributes} />}>
                    פרופיל
                </Button>
                <Button {...menuButtonAttributes} startIcon={<MoreHorizIcon {...menuIconAttributes} />}>
                    עוד
                </Button>
            </Grid>
            <Grid {...footerGridAttributes}>
                <TweetButton {...tweetButtonAttributes} />
                <Link {...logOutLinkAttributes}>התנתק</Link>
                <Dialog {...tweetFormDialogAttributes}>
                    <Box {...dialogBoxAttributes}>
                        <Stack {...dialogHeaderStackAttributes}>
                            <IconButton onClick={() => setOpenDialog(false)}>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h5" color="primary">
                                פוסט חדש
                            </Typography>
                        </Stack>
                        <TweetForm {...tweetFormAttributes} />
                    </Box>
                </Dialog>
            </Grid>
        </Grid>
    );
};
