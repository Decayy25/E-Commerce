import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri);

let cachedDb: any = null;

export async function getDb() {
  if (cachedDb) return cachedDb;

  await client.connect();
  const db = client.db(process.env.MONGO_DB_NAME || "myapp");

  cachedDb = db;
  return db;
}