import { mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  console.warn("⚠️ MONGO_URI environment variable is not set. Please set it in your .env file.");
  process.exit(1);
}

export const MongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/ECommerce";
export const db = mongoose.createConnection(MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const usersBuyCollection = db.collection("usersBuy");
export const productsCollection = db.collection("products");
export const usersCollection = db.collection("users");