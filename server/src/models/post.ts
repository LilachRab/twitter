export type Post = {
    id: number;
    userName: string;
    content: string;
    creationDate: string;
    photoURL: string;
    parent: number;
    usersLiked: string[];
};

export type ReturnPost = {
    id: number;
    userName: string;
    content: string;
    creationDate: number;
    photoURL: string;
    parent: number;
    usersLiked: string[];
};