import { NotFoundPicture } from '../../assets';

export const stackAttributes = {
    spacing: 5,
    sx: {
        direction: 'column',
        alignItems: 'center',
    },
};

export const typographyAttributes = {
    variant: 'h4' as 'h4',
    color: 'primary',
};

export const boxAttributes = {
    component: 'img' as 'img',
    src: NotFoundPicture,
    alt: 'logo',
    sx: {
        width: '40vw',
        height: '65vh',
    },
};
