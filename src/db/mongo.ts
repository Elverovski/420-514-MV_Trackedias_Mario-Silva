// src/db/mongo.ts
import mongoose from 'mongoose';
import config from 'config';
import { logger } from '../utils/logger';

const uri: string = config.get<string>('db.uri');
const dbName: string = config.get<string>('db.name');

export async function connectDB() {
  try {
    await mongoose.connect(uri, {
      dbName,
    });
    logger.info(`✅ Connecté à MongoDB : ${dbName}`);
  } catch (error) {
    logger.error('❌ Erreur de connexion à MongoDB', { error });
    throw error;
  }
}

export async function closeDB() {
  await mongoose.connection.close();
  logger.info('🔌 Connexion MongoDB fermée');
}
