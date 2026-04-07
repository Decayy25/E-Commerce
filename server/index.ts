import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { db, usersCollection } from './config/db.ts';
import { addProduct, getProduct } from "./controllers/Product.ts";
// import { sendContactMail } from "./utils/sendMail.js";
// import { register, login, getAccounts } from "./middleware/auth.ts";

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
            // .group("/auth", (app) =>
            //     app
            //         .post("/register", async ({ body }) => await register(body as any))
            //         .post("/login", async ({ body }) => await login(body as any))
            //         .get("/accounts", async () => await getAccounts())
            // )
            .group("/product", (app) =>
                app
                    .get("/get", async () => await getProduct())
                    .post("/add", async ({ body }) => await addProduct(body as any))
            )
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
  app.listen(process.env.PORT || 5001);
  console.log(`\x1b[32m
+==================================================+
✅ Elysia Server running!
🌐 http://localhost:${PORT}
📂 File: index.ts
+==================================================+
`);
}
