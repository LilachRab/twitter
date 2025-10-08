import { Button } from '@mui/material';

type TweetButtonProps = {
    width: string;
    onClick: () => void;
};

export const TweetButton = ({ width, onClick }: TweetButtonProps) => {
    const tweetButtonAttributes = {
        variant: 'contained' as 'contained',
        color: 'primary' as 'primary',
        size: 'large' as 'large',
        onClick: onClick,
        sx: { width: width },
    };

    return <Button {...tweetButtonAttributes}>צייץ</Button>;
};
