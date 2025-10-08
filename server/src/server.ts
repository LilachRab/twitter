import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { ENV_VARIABLES } from './constants';
import { errorHandler, logger } from './middleware';
import { routes } from './routes';

const app: express.Application = express();

app.use(logger);
app.use(cors());
app.use(express.json());

app.use('/', routes);
app.use(errorHandler);

app.listen(ENV_VARIABLES.port, () => {
    console.log(`listning on port ${ENV_VARIABLES.port}`);
});
