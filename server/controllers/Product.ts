import { getDb } from "../config/db";

const db = await getDb();
export async function getProduct() {
    try {
        const products = await db.collection('products').find().toArray();
        return products;
    } catch (error) {
        throw error;
    }
}

export async function addProduct(body: any) {
    const { id, name, price, image, category, stock, rating, reviews, description} = body as any;

    try {
        const product = { id, name, price, image, category, stock, rating, reviews, description};
        const result = await db.collection('products').insertOne(product);
        return { success: true, productId: result.insertedId, id};
    } catch (error) {
        throw error;
    }
}