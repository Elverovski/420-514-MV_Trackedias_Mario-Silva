import express from 'express';
import mediaRoutes from './routes/media.route';

const app = express();

app.use(express.json());

app.use('/api', mediaRoutes);


const port = 3000;

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});

export default app;