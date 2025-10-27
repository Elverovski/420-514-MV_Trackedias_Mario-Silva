import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import config from 'config';
import { logger } from './utils/logger';
import { setupSwagger } from './utils/swagger';
import mediaRouteV1 from './v1/routes/media.route';
import mediaRouteV2 from './v2/routes/media.route';
import { connectDB } from './config/mongo';
import { initializeDB } from './config/initializeDb';

const app = express();
const port = process.env.PORT || 3443;

app.use(express.json());

const windowMs: number = config.get<number>('security.rateLimit.windowMs');
const max: number = config.get<number>('security.rateLimit.max');

const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 1000 ,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Trop de requêtes, veuillez réessayer plus tard'
});

// Appliquer globalement
app.use(limiter);

// Middleware de log
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Connexion HTTPS sécurisée');
});

setupSwagger(app);
app.use('/api/v1', mediaRouteV1);
app.use('/api/v2', mediaRouteV2);

// Not Found
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint non trouvé' });
});

async function startApp() {
  await connectDB();
  await initializeDB();

  const options = {
    key: fs.readFileSync(path.join(__dirname, '../key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert.pem'))
  };

  https.createServer(options, app).listen(port, () => {
    console.log(`🚀 API HTTPS disponible sur https://localhost:${port}`);
  });
}

startApp().catch(console.error);
export default app;
