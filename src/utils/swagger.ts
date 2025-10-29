import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';

export const setupSwagger = (app: Express): void => {
  const swaggerV1 = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../docs/swagger.v1.json'), 'utf-8')
  );
  const swaggerV2 = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../docs/swagger.v2.json'), 'utf-8')
  );

  app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerV1));
  app.use('/api-docs/v2', swaggerUi.serve, swaggerUi.setup(swaggerV2));

  console.log('Swagger v1 disponible sur http://localhost:3000/api-docs/v1');
  console.log('Swagger v2 disponible sur http://localhost:3000/api-docs/v2');
};
