import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: path.resolve(process.cwd(), "../.env")
  });

  if (!process.env.MONGO_URI) {
    dotenv.config({
      path: path.resolve(process.cwd(), ".env")
    });
  }
}

const uri = process.env.MONGO_URI ?? (process.env.NODE_ENV === 'production' ? undefined : "mongodb://localhost:27017/");

if (!uri) {
  throw new Error(
    "MONGO_URI is not defined. Set it in Vercel Environment Variables or create a local .env file for development."
  );
}

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
  family: 4
});

try {
    await client.connect();
    console.log(`\x1b[32m
+==================================================+
✅ MongoDB Connected
+==================================================+
        `);
} catch (err) {
    console.error("❌ MongoDB Gagal Connect: ", err);
    throw err;
}

const dbName = process.env.MONGO_DB_NAME ?? "myapp";
export const db = client.db(dbName);
export const usersCollection = db.collection("users");
export const usersOrder = db.collection("orders");
export const usersCart = db.collection("carts");
