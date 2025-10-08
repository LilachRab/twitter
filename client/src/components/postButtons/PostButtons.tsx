import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, List, ListItem, Popover, Stack } from '@mui/material';
import { useState } from 'react';
import { SORT_BY_DATE } from '../../constants';
import { postFormInput } from '../post/types';

type PostButtonsProps = {
    postID: number;
    ProfileImgURL: string;
    isLikedByMe: Boolean;
    commentsCount: number;
    usersLiked: string[];
    addLike(): void;
    removeLike(): void;
    createPostMethod(data: postFormInput, parent: number | null, updatePostsList: (sortBy: string) => void): void;
    getComments(sortBy: string): void;
    openCommentsDialog(): void;
};

export const PostButtons = ({
    isLikedByMe,
    commentsCount,
    usersLiked,
    addLike,
    removeLike,
    getComments,
    openCommentsDialog,
}: PostButtonsProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const [isLikedByMyself, setIsLikedByMyself] = useState(isLikedByMe);

    const handleCommentClick = async () => {
        getComments(SORT_BY_DATE);
        openCommentsDialog();
    };

    const handleLikeClick = () => {
        isLikedByMe ? removeLike() : addLike();
        setIsLikedByMyself(!isLikedByMyself);
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        if (usersLiked.length !== 0) {
            setAnchorEl(event.currentTarget);
        }
    };

    const commentButtonAttributes = {
        variant: 'outlined' as 'outlined',
        sx: {
            ':hover': {
                border: 'none',
            },
            border: 'none',
        },
        endIcon: <CommentIcon sx={{ marginRight: '0.5vw' }} />,
        onClick: handleCommentClick,
    };

    const likesButtonAttributes = {
        variant: 'outlined' as 'outlined',
        sx: {
            ':hover': {
                border: 'none',
            },
            border: 'none',
        },
        endIcon: isLikedByMyself ? (
            <FavoriteIcon sx={{ marginRight: '0.5vw' }} />
        ) : (
            <FavoriteBorderIcon sx={{ marginRight: '0.5vw' }} />
        ),
        onMouseEnter: handlePopoverOpen,
        onMouseLeave: () => setAnchorEl(null),
        onClick: handleLikeClick,
    };

    const popoverAttributes = {
        onClose: () => setAnchorEl(null),
        disableRestoreFocus: true,
        disableScrollLock: true,
        sx: {
            pointerEvents: 'none',
        },
        open: open,
        anchorEl: anchorEl,
        anchorOrigin: {
            vertical: 'bottom' as 'bottom',
            horizontal: 'left' as 'left',
        },
        transformOrigin: {
            vertical: 'top' as 'top',
            horizontal: 'left' as 'left',
        },
    };

    return (
        <Stack direction="row" justifyContent="right">
            <Button {...commentButtonAttributes}>{commentsCount}</Button>
            <Button {...likesButtonAttributes}>{usersLiked.length}</Button>
            <Popover {...popoverAttributes}>
                <List sx={{ listStyleType: 'none' }}>
                    {usersLiked.map((user, index) => (
                        <ListItem key={index}>{user}</ListItem>
                    ))}
                </List>
            </Popover>
        </Stack>
    );
};
