import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { postFormInput, postGetValues, postInsertValues } from '../../components/post/types';
import { PostFeed } from '../../components/postFeed';
import { SideNavBar } from '../../components/sideNavBar';
import { Auth, SORT_BY_DATE } from '../../constants';
import { api } from '../../services';
import { user } from '../../types';
import {
    externalGridAttributes,
    postFeedGridAttributes,
    postFeedTypographyAttributes,
    sideNavBarGridAttributes,
} from './styles';

export const Feed = () => {
    const [posts, setPosts] = useState<postGetValues[]>([]);
    const [connectedUserDetails, setConnectedUserDetails] = useState<user>({
        userName: '',
        name: '',
        email: '',
        password: '',
        birthDate: '',
        photoURL: '',
        gender: '',
    });

    const setUser = async (userName: string) => {
        const res = await api.user.getUser(userName);

        if (!res) {
            return;
        }

        if (res.data.userName === Auth.userConnected) {
            setConnectedUserDetails(res.data);
        }
    };

    const getPosts = async (sortBy: string) => {
        const res = await api.post.getPosts(sortBy);

        if (res) {
            setPosts(res.data);
        }
    };

    const createPost = async (
        postInput: postFormInput,
        parentNum: number,
        updatePostsList: (sortBy: string) => void
    ) => {
        const currentDateAndTime = new Date();
        const newPost: postInsertValues = {
            userName: Auth.userConnected,
            content: postInput.content,
            photoURL: postInput.photoURL,
            creationDate: currentDateAndTime,
            parent: parentNum ? parentNum : null,
        };

        const res = await api.post.createPost(newPost);

        if (res) {
            updatePostsList(SORT_BY_DATE);
        }
    };

    useEffect(() => {
        setUser(Auth.userConnected);
        getPosts(SORT_BY_DATE);
    }, []);

    const sideNavBarAttributes = {
        ProfileImgURL: connectedUserDetails.photoURL,
        createPostMethod: createPost,
        updatePostsList: getPosts,
    };

    const postFeedAttributes = {
        feedParent: null,
        postList: posts,
        ProfileImgURL: connectedUserDetails.photoURL,
        createPostMethod: createPost,
        updatePostsList: getPosts,
    };

    return (
        <Grid {...externalGridAttributes}>
            <Grid {...sideNavBarGridAttributes}>
                <SideNavBar {...sideNavBarAttributes} />
            </Grid>
            <Grid {...postFeedGridAttributes}>
                <Box textAlign="center">
                    <Typography {...postFeedTypographyAttributes}>פיד פוסטים</Typography>
                    <PostFeed {...postFeedAttributes} />
                </Box>
            </Grid>
        </Grid>
    );
};
