import config from 'config';
import { MongoClient, Db } from 'mongodb';

const uri = config.get<string>('db.uri');
const dbName = config.get<string>('db.name');

const client = new MongoClient(uri);
let db: Db;

export async function connectDB() {
  await client.connect();
  db = client.db(dbName);
  console.log(`Connectée à la DB: ${dbName}`);
}

export function getDB(): Db {
  if (!db) throw new Error('DB n’est pas connectée');
  return db;
}

export async function closeDB() {
  await client.close();
  console.log('Connexion fermée');
}
