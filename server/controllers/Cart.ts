import { db, usersCollection, usersOrder, usersCart } from '../config/db.ts';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

interface CartItem {
    productId: string;
    quantity: number;
    price: number;
    addedAt?: Date;
    name?: string;
}

interface AddToCartBody {
    productId: string;
    quantity: number | string;
    images: string,
    price: number | string;
    name?: string;
}

interface CartResponse {
    status: number;
    error?: string;
    message?: string;
    cartId?: ObjectId;
    orderId?: ObjectId;
    items?: CartItem[];
    total?: number;
    itemCount?: number;
}

// Fungsi untuk extract user ID dari token
function getUserIdFromToken(authHeader: string): string {
    if (!authHeader) {
        throw new Error('Token tidak ditemukan');
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string };
    
    if (!decoded.id) {
        throw new Error('User ID tidak ditemukan dalam token');
    }

    return decoded.id;
}

// Tambah item ke cart user yang login
export async function addToCart(body: AddToCartBody, authHeader: string): Promise<CartResponse> {
    try {
        const userId = getUserIdFromToken(authHeader);
        const { productId, quantity, price, name } = body;

        if (!productId || !quantity || !price) {
            return {
                status: 400,
                error: 'productId, quantity, dan price wajib diisi'
            };
        }

        // Cari cart user
        let cart = await usersCart.findOne({ userId: new ObjectId(userId) });

        if (!cart) {
            const result = await usersCart.insertOne({
                userId: new ObjectId(userId),
                items: [
                    {
                        productId,
                        name,
                        quantity: parseInt(String(quantity)),
                        price: parseFloat(String(price)),
                        addedAt: new Date()
                    }
                ],
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return {
                status: 201,
                message: 'Item ditambahkan ke cart',
                cartId: result.insertedId
            };
        } else {
            // Cek apakah product sudah ada di cart
            const existingItem = cart.items.find((item: CartItem) => item.productId === productId);

            if (existingItem) {
                // Update quantity
                await usersCart.updateOne(
                    { userId: new ObjectId(userId), 'items.productId': productId },
                    {
                        $inc: { 'items.$.quantity': parseInt(String(quantity)) },
                        $set: { updatedAt: new Date() }
                    }
                );
            } else {
                // Tambah item baru ke array
                await usersCart.updateOne(
                    { userId: new ObjectId(userId) },
                    {
                        $push: {
                            items: {
                                productId,
                                name,
                                quantity: parseInt(quantity as string),
                                price: parseFloat(price as string),
                                addedAt: new Date()
                            } as any
                        },
                        $set: { updatedAt: new Date() }
                    }
                );
            }

            return {
                status: 200,
                message: 'Item berhasil ditambahkan ke cart'
            };
        }
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return {
            status: 500,
            error: errorMessage
        };
    }
}

// Get cart user yang login
export async function getCart(authHeader: string): Promise<CartResponse> {
    try {
        const userId = getUserIdFromToken(authHeader);

        const cart = await usersCart.findOne({ userId: new ObjectId(userId) });

        if (!cart) {
            return {
                status: 200,
                message: 'Cart kosong',
                items: [],
                total: 0
            };
        }

        // Hitung total harga
        const total = cart.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);

        return {
            status: 200,
            cartId: cart._id,
            items: cart.items,
            total: total,
            itemCount: cart.items.length
        };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return {
            status: 500,
            error: errorMessage
        };
    }
}

// Remove item dari cart
export async function removeFromCart(body: { productId: string }, authHeader: string): Promise<CartResponse> {
    try {
        const userId = getUserIdFromToken(authHeader);
        const { productId } = body;

        if (!productId) {
            return {
                status: 400,
                error: 'productId wajib diisi'
            };
        }

        await usersCart.updateOne(
            { userId: new ObjectId(userId) },
            {
                $pull: { items: { productId } as any },
                $set: { updatedAt: new Date() }
            }
        );

        return {
            status: 200,
            message: 'Item berhasil dihapus dari cart'
        };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return {
            status: 500,
            error: errorMessage
        };
    }
}

// Clear semua item dari cart
export async function clearCart(authHeader: string): Promise<CartResponse> {
    try {
        const userId = getUserIdFromToken(authHeader);

        await usersCart.deleteOne({ userId: new ObjectId(userId) });

        return {
            status: 200,
            message: 'Cart berhasil dihapus'
        };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return {
            status: 500,
            error: errorMessage
        };
    }
}

// Proses checkout - Buat order dari cart
export async function Order(body: { shippingAddress: string; paymentMethod: string }, authHeader: string): Promise<CartResponse> {
    try {
        const userId = getUserIdFromToken(authHeader);
        const { shippingAddress, paymentMethod } = body;

        if (!shippingAddress || !paymentMethod) {
            return {
                status: 400,
                error: 'shippingAddress dan paymentMethod wajib diisi'
            };
        }

        // Ambil cart user
        const cart = await usersCart.findOne({ userId: new ObjectId(userId) });

        if (!cart || cart.items.length === 0) {
            return {
                status: 400,
                error: 'Cart kosong, tidak bisa membuat order'
            };
        }

        // Hitung total
        const total = cart.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);

        // Buat order
        const orderResult = await usersOrder.insertOne({
            userId: new ObjectId(userId),
            items: cart.items,
            total: total,
            shippingAddress,
            paymentMethod,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Hapus cart setelah order
        await usersCart.deleteOne({ userId: new ObjectId(userId) });

        return {
            status: 201,
            message: 'Order berhasil dibuat',
            orderId: orderResult.insertedId,
            total: total,
            itemCount: cart.items.length
        };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return {
            status: 500,
            error: errorMessage
        };
    }
}