import { Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { SORT_BY_DATE, SORT_BY_LIKES } from '../../constants';
import { Post } from '../post';
import { postFormInput, postGetValues } from '../post/types';
import { TweetForm } from '../tweetForm';

type PostFeedProps = {
    feedParent: number | null;
    postList: postGetValues[];
    ProfileImgURL: string;
    createPostMethod(data: postFormInput, parent: number | null, updatePostsList: (sortBy: string) => void): void;
    updatePostsList(sortBy: string): void;
};

export const PostFeed = ({ feedParent, postList, ProfileImgURL, createPostMethod, updatePostsList }: PostFeedProps) => {
    const sortBy = {
        SORT_BY_DATE: () => updatePostsList(SORT_BY_DATE),
        SORT_BY_LIKES: () => updatePostsList(SORT_BY_LIKES),
    };
    const [sortValue, setSortValue] = useState(SORT_BY_DATE);

    const handleSortSelectionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSortValue(event.target.value);
    };

    useEffect(() => {
        sortValue === SORT_BY_DATE ? sortBy.SORT_BY_DATE() : sortBy.SORT_BY_LIKES();
    }, [sortValue]);

    const tweetFormAttributes = {
        parent: feedParent,
        ProfileImgURL: ProfileImgURL,
        createPostMethod: createPostMethod,
        updatePostsList: updatePostsList,
    };

    const radioGroupAttributes = {
        row: true,
        defaultValue: SORT_BY_DATE,
        value: sortValue,
        sx: { justifyContent: 'center', alignItems: 'center' },
    };

    const sortByDateRadioAttributes = {
        checked: sortValue === SORT_BY_DATE,
        onChange: handleSortSelectionChange,
        value: SORT_BY_DATE,
    };

    const sortByLikesRadioAttributes = {
        checked: sortValue === SORT_BY_LIKES,
        onChange: handleSortSelectionChange,
        value: SORT_BY_LIKES,
    };

    return (
        <Grid container direction="column">
            <Stack direction="column" sx={{ width: '100%' }}>
                <TweetForm {...tweetFormAttributes} />
                <RadioGroup {...radioGroupAttributes}>
                    <Radio {...sortByDateRadioAttributes} />
                    <Typography variant="body1">חדש לישן</Typography>
                    <Radio {...sortByLikesRadioAttributes} />
                    <Typography variant="body1">אהוב ביותר</Typography>
                </RadioGroup>
            </Stack>
            <Stack>
                {postList.map((post) => (
                    <Post key={post.id} post={post} ProfileImgURL={ProfileImgURL} createPostMethod={createPostMethod} />
                ))}
            </Stack>
        </Grid>
    );
};
