import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error(
    "MONGO_URI is not defined. Set it in Vercel Environment Variables or create a local .env file for development."
  );
}

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
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
