import dotenv from 'dotenv';
import { NotFoundError } from './errors';

type EnvVariablesTypes = {
    port: string | number;
    postgresUser: string;
    postgresHost: string;
    postgresDB: string;
    postgresPassword: string;
    postgresPort: string;
    jwtSecret: string;
    jwtExpiration: string;
};

let instance: EnvVariablesTypes;

export const getEnvVariablesSingleton = () => {
    if (instance) {
        return instance;
    }

    dotenv.config();

    const {
        PORT,
        POSTGRES_USER,
        POSTGRES_HOST,
        POSTGRES_DB,
        POSTGRES_PASSWORD,
        POSTGRES_PORT,
        JWT_SECRET,
        JWT_EXPIRATION,
    } = process.env;
    const envVariables = {
        port: PORT,
        postgresUser: POSTGRES_USER,
        postgresHost: POSTGRES_HOST,
        postgresDB: POSTGRES_DB,
        postgresPassword: POSTGRES_PASSWORD,
        postgresPort: POSTGRES_PORT,
        jwtSecret: JWT_SECRET,
        jwtExpiration: JWT_EXPIRATION,
    };

    for (const [key, value] of Object.entries(envVariables)) {
        if (!value) {
            throw new NotFoundError('env variable: ' + key + ' is undefined');
        }
    }

    instance = {
        port: envVariables.port || 4000,
        postgresUser: envVariables.postgresUser as string,
        postgresHost: envVariables.postgresHost as string,
        postgresDB: envVariables.postgresDB as string,
        postgresPassword: envVariables.postgresPassword as string,
        postgresPort: envVariables.postgresPort as string,
        jwtSecret: envVariables.jwtSecret as string,
        jwtExpiration: envVariables.jwtExpiration as string,
    };

    return instance;
};
