import express, { Request, Response, NextFunction } from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import config from 'config';
import { logger } from './utils/logger';
import { setupSwagger } from './utils/swagger';
import { connectDB } from './db/mongo';

// Routes
import mediaRouteV1 from './v1/routes/media.route';
import mediaRouteV2 from './v2/routes/media.route';
import authRouteV2 from './v2/routes/auth.route';
import userRouteV2 from './v2/routes/user.route';
import filmRouteV2 from './v2/routes/film.route'
import serieRouteV2 from './v2/routes/serie.route' 
import ratingRouteV2 from './v2/routes/rating.route'

const app = express();
const port = process.env.PORT || 3443;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: config.get<string[]>('security.cors.origins'), credentials: true }));

// Middleware de log
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
  next();
});

// Routes
app.get('/', (_req, res) => res.send('Connexion HTTPS sécurisée'));
setupSwagger(app);
app.use('/api/v1', mediaRouteV1);
app.use('/api/v2', mediaRouteV2);
app.use('/api/v2/auth', authRouteV2);
app.use('/api/v2', userRouteV2);
app.use('/api/v2', filmRouteV2);
app.use('/api/v2', serieRouteV2);
app.use('/api/v2', ratingRouteV2);
// Lancement du serveur HTTPS
async function startApp() {
  await connectDB();

  const options = {
    key: fs.readFileSync(path.join(__dirname, '../key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert.pem')),
  };

  https.createServer(options, app).listen(port, () => {
    logger.info(`🎬 Trackedias disponible sur https://localhost:${port}`);
  });
}

startApp().catch(err => {
  logger.error('❌ Échec du démarrage de l’application', { err });
  process.exit(1);
});

export default app;
