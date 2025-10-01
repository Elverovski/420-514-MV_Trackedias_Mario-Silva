import express from 'express';
import mediaRoutes from './routes/media.route';
import { logger } from './utils/logger';

const app = express();

app.use(express.json());

app.use('/api', mediaRoutes);

app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
  next();
});


const port = 3000;

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});

export default app;