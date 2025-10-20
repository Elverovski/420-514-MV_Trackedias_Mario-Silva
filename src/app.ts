import express from 'express';
import { logger } from './v1/utils/logger';
import v1 from './v1/routes/media.route';
//import v2 from './v2/routes/index.route';

const app = express();

app.use(express.json());


app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
  next();
});


app.use('/api/v1', v1);
//app.use('/api/v2', v2);


app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

export default app;
