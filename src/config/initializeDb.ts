import { getDB } from './mongo';
import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../utils/logger';
import config from 'config';

export async function initializeDB() {
  try {
    const db = getDB();

    const dataPath = path.join(__dirname, '../v2/data');

    const loadJSON = <T>(filename: string): T[] => {
      const filePath = path.join(dataPath, filename);
      if (!fs.existsSync(filePath)) {
        logger.warn(`Fichier manquant : ${filename}`);
        return [];
      }
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw) as T[];
    };

    // Chargement des fichiers
    const films = loadJSON<any>('films.json');
    const series = loadJSON<any>('series.json');
    const users = loadJSON<any>('users.json');
    const ratings = loadJSON<any>('ratings.json');

    // Effaces les collections existantes
    await Promise.all([
      db.collection('films').deleteMany({}),
      db.collection('series').deleteMany({}),
      db.collection('users').deleteMany({}),
      db.collection('ratings').deleteMany({}),
    ]);

    // Insertion des donnees
    if (films.length) await db.collection('films').insertMany(films);
    if (series.length) await db.collection('series').insertMany(series);
    if (users.length) await db.collection('users').insertMany(users);
    if (ratings.length) await db.collection('ratings').insertMany(ratings);

    logger.info('MongoDB synchronisee avec les JSON');
  } catch (error) {
    logger.error('Erreur lors de la synchronisation de la BD :', error);
    throw error; 
  }
}
