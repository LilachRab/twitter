export type postFormInput = {
    content: string;
    photoURL: string;
};

export type postGetValues = {
    id: number;
    userName: string;
    content: string;
    photoURL: string;
    creationDate: number;
    parent: number | null;
    usersLiked: string[];
};

export type postInsertValues = {
    userName: string;
    content: string;
    photoURL: string;
    creationDate: Date;
    parent: number | null;
};
