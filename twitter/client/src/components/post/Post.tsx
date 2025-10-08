import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Auth } from '../../constants';
import { api } from '../../services';
import { user } from '../../types';
import { getPostTiming } from '../../utils';
import { CommentFeed } from '../commentFeed';
import { PostButtons } from '../postButtons';
import {
    bodyStackAttributes,
    bodyTypographyAttributes,
    headserStackAttributes,
    headserTypographyAttributes,
    paperAttributes,
} from './styles';
import { postFormInput, postGetValues } from './types';

type PostProps = {
    post: postGetValues;
    ProfileImgURL: string;
    createPostMethod(data: postFormInput, parent: number | null, updatePostsList: (sortBy: string) => void): void;
};

export const Post = ({ post, ProfileImgURL, createPostMethod }: PostProps) => {
    const [usersLikedList, setUsersLikedList] = useState(post.usersLiked);
    const [userPosted, setUserPosted] = useState<user | null>(null);
    const [comments, setComments] = useState<postGetValues[]>([]);
    const [openCommentsDialog, setOpenCommentsDialog] = useState(false);

    const setUser = async (userName: string) => {
        const res = await api.user.getUser(userName);

        if (!res) {
            setUserPosted(null);

            return;
        }

        setUserPosted(res.data);
    };

    const addLike = async () => {
        const res = await api.post.addLike(post.id);

        if (res) {
            setUsersLikedList([...usersLikedList, Auth.userConnected]);
        }
    };

    const removeLike = async () => {
        const res = await api.post.removeLike(post.id);

        if (res) {
            setUsersLikedList(usersLikedList.filter((userName) => userName !== Auth.userConnected));
        }
    };

    const getComments = async (sortBy: string) => {
        const res = await api.post.getComments(post.id, sortBy);

        if (res) {
            setComments(res.data);
        }
    };

    useEffect(() => {
        setUser(post.userName);
    }, []);

    const imageBoxAttributes = {
        component: 'img' as 'img',
        alt: 'post image',
        src: post.photoURL,
        sx: {
            height: '80%',
            width: '100%',
            maxHeight: '60vh',
            maxWidth: '100vh',
            borderRadius: 3,
            marginBottom: '1vh',
        },
    };

    const postButtonsAttributes = {
        postID: post.id,
        ProfileImgURL: ProfileImgURL,
        isLikedByMe: usersLikedList.includes(Auth.userConnected),
        commentsCount: comments.length,
        usersLiked: usersLikedList,
        addLike: addLike,
        removeLike: removeLike,
        createPostMethod: createPostMethod,
        getComments: getComments,
        openCommentsDialog: () => setOpenCommentsDialog(true),
    };

    const commentFeedAttributes = {
        postID: post.id,
        ProfileImgURL: ProfileImgURL,
        comments: comments,
        openDialog: openCommentsDialog,
        handleCloseDialog: () => setOpenCommentsDialog(false),
        createPostMethod: createPostMethod,
        getComments: getComments,
    };

    const avatatAttributes = {
        src: userPosted?.photoURL,
        sx: {
            width: 30,
            height: 30,
            marginLeft: '0.5rem',
        },
    };

    return (
        <Paper {...paperAttributes}>
            <Stack direction="column">
                <Stack {...headserStackAttributes}>
                    <Avatar {...avatatAttributes} />
                    <Typography {...headserTypographyAttributes}>{post.userName}</Typography>
                    <Typography variant="caption">פורסם {getPostTiming(new Date(post.creationDate))} </Typography>
                </Stack>
                <Stack {...bodyStackAttributes}>
                    <Typography {...bodyTypographyAttributes}>{post.content}</Typography>
                    {post.photoURL && <Box {...imageBoxAttributes} />}
                    <PostButtons {...postButtonsAttributes} />
                </Stack>
            </Stack>
            <CommentFeed {...commentFeedAttributes} />
        </Paper>
    );
};
