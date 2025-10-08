import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton, Stack, Typography } from '@mui/material';
import { postFormInput, postGetValues } from '../post/types';
import { PostFeed } from '../postFeed';
import { headerStackAttributes, headerTypographyAttributes } from './styles';

type CommentFeedProps = {
    postID: number;
    ProfileImgURL: string;
    comments: postGetValues[];
    openDialog: boolean;
    handleCloseDialog(): void;
    createPostMethod(data: postFormInput, parent: number | null, updatePostsList: (sortBy: string) => void): void;
    getComments(sortBy: string): void;
};

export const CommentFeed = ({
    postID,
    ProfileImgURL,
    comments,
    openDialog,
    handleCloseDialog,
    createPostMethod,
    getComments,
}: CommentFeedProps) => {
    const dialogAttributes = {
        open: openDialog,
        maxWidth: 'sm' as 'sm',
        fullWidth: true,
        disableScrollLock: true,
        onClose: handleCloseDialog,
    };

    const postFeedAttributes = {
        feedParent: postID,
        postList: comments,
        ProfileImgURL: ProfileImgURL,
        createPostMethod: createPostMethod,
        updatePostsList: getComments,
    };

    return (
        <Box>
            <Dialog {...dialogAttributes}>
                <Stack {...headerStackAttributes}>
                    <IconButton onClick={handleCloseDialog}>
                        <CloseIcon />
                    </IconButton>
                    <Typography {...headerTypographyAttributes}>תגובות</Typography>
                </Stack>
                <PostFeed {...postFeedAttributes} />
            </Dialog>
        </Box>
    );
};
