import { Elysia, status, t} from "elysia";
import { cors } from "@elysiajs/cors";
import { login, register, getAccount } from "./controllers/authController.js";
import { db, usersCollection } from "./config/db.js";
import { getAccounts } from "./controllers/accountsController.js";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const port = process.env.PORT || 5000;

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
            .group("/auth", (app) =>
                app
                  .post('/login', async ({ body }) => await login(body))
                  .post('/register', async ({ body }) => await register(body))
            )

            .get("/accounts", async () => {
                try {
                    return await getAccounts();
                } catch (error) {
                    return {
                        error: "Gagal mengambil data",
                        detail: error.message
                    };
                }
            })

            .get("/me", async ({ query }) => {
                try {
                    const user = await usersCollection.findOne({ email: query.email });
                    return user || { error: "User tidak ditemukan" };
                } catch (error) {
                    return { error: error.message };
                }
            })
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
  app.listen(process.env.PORT || port);
  console.log(`\x1b[32m
  +==================================================+
  ✅ Elysia Server running!
  🌐 http://localhost:${port}
  📂 File: index.js
  +==================================================+
`);
}