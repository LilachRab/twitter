import { Autocomplete, Box, TextField } from '@mui/material';
import { HTMLAttributes, SyntheticEvent } from 'react';
import { genderType } from './types';

type GenderSelectorProps = {
    updateGender(gender: string): void;
};

const genders: readonly genderType[] = [
    { id: '1', value: 'אישה' },
    { id: '2', value: 'גבר' },
    { id: '3', value: 'אחר' },
];

export const GenderSelector = ({ updateGender }: GenderSelectorProps) => {
    const handleSelectChange = (_event: SyntheticEvent, value: genderType | null, reason: string) => {
        if (reason === 'clear' || !value) {
            updateGender('');

            return;
        }

        updateGender(value.id);
    };

    const autocompleteAttributes = {
        fullWidth: true,
        noOptionsText: 'אין אפשרות מתאימה',
        options: genders,
        autoHighlight: true,
        getOptionLabel: (option: genderType) => option.value,
        onChange: handleSelectChange,
        renderOption: (props: HTMLAttributes<HTMLLIElement>, option: genderType) => {
            const { ...optionProps } = props;

            return (
                <Box component="li" key={option.id} {...optionProps}>
                    {option.value}
                </Box>
            );
        },
        renderInput: (params: any) => (
            <TextField
                {...params}
                placeholder="בחר מגדר"
                inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                }}
            />
        ),
    };

    return <Autocomplete {...autocompleteAttributes} />;
};
