import 'dotenv/config';
import { MongoClient } from 'mongodb';

const mongo_uri = process.env.MONGO_URI;
const dbName = 'react-web-dashboard-cluster';

let client;
let db;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
  }
  return db;
};

export const loadUserCollection = async () => {
  const db = await connectToDatabase();
  return db.collection('users');
};

export const loadCompanyCollection = async () => {
  const db = await connectToDatabase();
  return db.collection('companies');
};

export const loadArticleCollection = async () => {
  const db = await connectToDatabase();
  return db.collection('articles');
};

