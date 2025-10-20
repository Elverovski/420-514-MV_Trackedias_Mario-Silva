import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const swaggerRouter = Router();

const swaggerDocs = {
  v1: JSON.parse(fs.readFileSync(path.join(__dirname, '../swagger/v1/swagger.json'), 'utf-8')),
  v2: JSON.parse(fs.readFileSync(path.join(__dirname, '../swagger/v2/swagger.json'), 'utf-8')),
};

swaggerRouter.use('/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocs.v1));
swaggerRouter.use('/v2', swaggerUi.serve, swaggerUi.setup(swaggerDocs.v2));

export default swaggerRouter;