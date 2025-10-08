import { FormHelperText } from '@mui/material';

type ErrorIndicatorProps = {
    error: string;
};

export const ErrorIndicator = ({ error }: ErrorIndicatorProps) => {
    return (
        <FormHelperText error sx={{ textAlign: 'right' }}>
            {error}
        </FormHelperText>
    );
};
