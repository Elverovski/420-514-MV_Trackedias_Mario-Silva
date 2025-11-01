import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';

export const setupSwagger = (app: Express): void => {
  try {
    const swaggerV1Path = path.join(process.cwd(), 'src/docs/swagger.v1.json');
    const swaggerV2Path = path.join(process.cwd(), 'src/docs/swagger.v2.json');

    if (!fs.existsSync(swaggerV1Path) || !fs.existsSync(swaggerV2Path)) {
      console.error('Fichiers Swagger introuvables ou invalides');
      return;
    }

    const swaggerV1 = JSON.parse(fs.readFileSync(swaggerV1Path, 'utf-8'));
    const swaggerV2 = JSON.parse(fs.readFileSync(swaggerV2Path, 'utf-8'));


    app.use('/api-docs/v1', swaggerUi.serveFiles(swaggerV1), swaggerUi.setup(swaggerV1));
    app.use('/api-docs/v2', swaggerUi.serveFiles(swaggerV2), swaggerUi.setup(swaggerV2));

    console.log('📘 Swagger v1 disponible sur https://localhost:3443/api-docs/v1');
    console.log('📙 Swagger v2 disponible sur https://localhost:3443/api-docs/v2');
  } catch (err) {
    console.error('Erreur lors du chargement de Swagger :', err);
  }
};
