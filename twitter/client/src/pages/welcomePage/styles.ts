import { twitterLogo } from '../../assets';

export const externalGridAttributes = {
    container: true,
    sx: {
        direction: 'row',
        textAlign: 'center',
        height: '100vh',
        overflow: 'hidden',
    },
};

export const contentGridAttributes = {
    container: true,
    direction: 'column' as 'column',
    sx: {
        alignItems: 'center',
        textAlign: 'center',
        width: '50%',
        backgroundColor: 'rgba(192,141,207,.15)',
    },
};

export const mainTypographyAttributes = {
    variant: 'h2' as 'h2',
    sx: {
        marginBottom: '20vh',
        marginTop: '20vh',
    },
};

export const authGridAttributes = {
    container: true,
    sx: {
        direction: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export const pictureGridAttributes = {
    sx: {
        textAlign: 'center',
        width: '50%',
    },
};

export const pictureBoxAttributes = {
    component: 'img' as 'img',
    src: twitterLogo,
    alt: 'logo',
    sx: { width: '100%', height: '100%' },
};
