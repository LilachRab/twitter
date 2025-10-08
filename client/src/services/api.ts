import { AxiosError } from 'axios';
import { loginFormInput } from '../components/login/types';
import { postInsertValues } from '../components/post/types';
import { registerFormInput } from '../components/register/types';
import { axiosInstance } from './';

export const api = {
    auth: {
        login: async (data: loginFormInput) => {
            try {
                const res = await axiosInstance.post('auth/login', data);

                return res.data;
            } catch (error) {
                return null;
            }
        },
        register: async (data: registerFormInput) => {
            try {
                const res = await axiosInstance.post('auth/register', data);
                return {
                    status: res.status,
                    data: res.data,
                };
            } catch (error) {
                const axiosError = error as AxiosError;

                return {
                    status: axiosError.response?.status,
                    data: axiosError.response?.data,
                };
            }
        },
    },
    post: {
        createPost: async (newPost: postInsertValues) => {
            try {
                const res = await axiosInstance.post('api/posts/create', newPost);
                return {
                    data: res.data,
                };
            } catch (error) {
                return null;
            }
        },
        addLike: async (postID: number) => {
            try {
                const res = await axiosInstance.post(`api/posts/${postID}/likes`);
                return {
                    data: res.data,
                };
            } catch (error) {
                return null;
            }
        },
        removeLike: async (postID: number) => {
            try {
                const res = await axiosInstance.delete(`api/posts/${postID}/likes`);
                return {
                    data: res.data,
                };
            } catch (error) {
                return null;
            }
        },
        getComments: async (postID: number, sortBy: string) => {
            try {
                const res = await axiosInstance.get(`api/posts/${postID}/comments/${sortBy}`);
                return {
                    data: res.data,
                };
            } catch (error) {
                return null;
            }
        },
        getPosts: async (sortBy: string) => {
            try {
                const res = await axiosInstance.get(`api/posts/${sortBy}`);
                return {
                    data: res.data,
                };
            } catch (error) {
                return null;
            }
        },
    },
    user: {
        getUser: async (userName: string) => {
            try {
                const res = await axiosInstance.get(`api/users/${userName}`);
                return {
                    data: res.data,
                };
            } catch (error) {
                return null;
            }
        },
    },
};
