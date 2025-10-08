import { Pool } from 'pg';
import { ENV_VARIABLES } from '../constants';

export const pool = new Pool({
    user: ENV_VARIABLES.postgresUser,
    host: ENV_VARIABLES.postgresHost,
    database: ENV_VARIABLES.postgresDB,
    password: ENV_VARIABLES.postgresPassword,
    port: parseInt(ENV_VARIABLES.postgresPort),
});
