import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { register, login, getAccounts } from "./middleware/auth.js";
import { db, usersCollection } from './config/db.js';
// import { sendContactMail } from "./utils/sendMail.js";
import dotenv from "dotenv";
import path from "path";
import { register } from "module";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: path.resolve(process.cwd(), "../.env")
  });
}

const PORT = process.env.PORT || 5000;

const app = new Elysia()
    .use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }))


    .get("/", () => ({
        status: "Online",
        message: "Elysia Backend is running perfectly!",
        database: process.env.MONGO_URI ? "Connected (Env OK)" : "Missing Env"
    }))


    .group("/api", (app) =>
        app
            .post("/register", async ({ body }) => await register(body))
            .post("/login", async ({ body }) => await login(body))
            .get("/accounts", async () => await getAccounts())
            
    )

    .onError(({ code, set, error }) => {
        if (code === "NOT_FOUND") {
            set.status = 404;
            return { error: "Endpoint tidak ditemukan" };
        }
        console.error("Global Error:", error);
        return {
            status: 500,
            error: error.message
        };
    });

export default app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT);
  console.log(`\x1b[32m
  +==================================================+
  ✅ Elysia Server running!
  🌐 http://localhost:${PORT}
  📂 File: index.js
  +==================================================+
`);
}
