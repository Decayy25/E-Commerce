import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { handle } from "@elysiajs/node"; // GANTI 'node' MENJADI 'handle'

import { addProduct, getProduct } from "./controllers/Product";

const app = new Elysia()
  .use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
  }))

  .get("/", () => ({
    status: "Online",
    message: "Elysia Serverless Running"
  }))

  .group("/api", (app) =>
    app.group("/product", (app) =>
      app
        .get("/get", async () => await getProduct())
        .post("/add", async ({ body }) => await addProduct(body as any))
    )
  );

// Ekspor menggunakan handle agar Vercel bisa menjalankan Elysia di Node.js
export default handle(app);