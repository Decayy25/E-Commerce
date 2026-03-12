import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { register, login, getAccounts } from "./middleware/auth.ts";
import { addToCart, getCart, Order, removeFromCart, clearCart } from "./controllers/Cart.ts";
import { db, usersCollection } from './config/db.ts';
// import { sendContactMail } from "./utils/sendMail.js";
import dotenv from "dotenv";
import path from "path";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: path.resolve(process.cwd(), "../.env")
  });
}

const PORT = process.env.PORT || 5001;

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
                    .post("/register", async ({ body }) => await register(body as any))
                    .post("/login", async ({ body }) => await login(body as any))
            )
            .get("/accounts", async () => await getAccounts())
            .group("/cart", (app) =>
                app
                    .post("/add", async ({ body, headers }) => await addToCart(body as any, headers.authorization || ''))
                    .get("/", async ({ headers }) => await getCart(headers.authorization || ''))
                    .post("/remove", async ({ body, headers }) => await removeFromCart(body as any, headers.authorization || ''))
                    .delete("/clear", async ({ headers }) => await clearCart(headers.authorization || ''))
            )
            .post("/order", async ({ body, headers }) => await Order(body as any, headers.authorization || ''))
    )

    .onError(({ code, set, error }) => {
        if (code === "NOT_FOUND") {
            set.status = 404;
            return { error: "Endpoint tidak ditemukan" };
        }
        console.error("Global Error:", error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            status: 500,
            error: errorMessage
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
