import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { handle } from "@elysiajs/node";

import { addProduct, getProduct } from "../controllers/Product";

const app = new Elysia()
  .use(cors())

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

export default handle(app);