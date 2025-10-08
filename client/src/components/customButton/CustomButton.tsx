import { Button, SxProps, Theme } from '@mui/material';

type ButtonProps = {
    text: string;
    sx?: SxProps<Theme>;
    onClick: () => void;
};

export const CustomButton = ({ text, sx, onClick }: ButtonProps) => {
    return (
        <Button variant="outlined" color="primary" size="large" onClick={onClick} sx={sx}>
            {text}
        </Button>
    );
};
