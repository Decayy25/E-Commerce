import { useState } from "react";

// Dummy Product Data
const dummyProducts = [
    {
        id: 1,
        name: "RTX 4090",
        price: 1999,
        image: "https://images.unsplash.com/photo-1587829191301-b5b19941dcb5?w=400&h=400&fit=crop",
        category: "GPU",
        stock: 5,
        rating: 4.8,
        reviews: 124,
        description: "NVIDIA GeForce RTX 4090 Super - Top tier gaming GPU"
    },
    {
        id: 2,
        name: "RTX 4080",
        price: 1199,
        image: "https://images.unsplash.com/photo-1587829191301-b5b19941dcb5?w=400&h=400&fit=crop",
        category: "GPU",
        stock: 8,
        rating: 4.7,
        reviews: 98,
        description: "NVIDIA GeForce RTX 4080 - High performance gaming"
    },
    {
        id: 3,
        name: "RTX 4070",
        price: 599,
        image: "https://images.unsplash.com/photo-1587829191301-b5b19941dcb5?w=400&h=400&fit=crop",
        category: "GPU",
        stock: 12,
        rating: 4.6,
        reviews: 156,
        description: "NVIDIA GeForce RTX 4070 - Great value for performance"
    },
    {
        id: 4,
        name: "RTX 4060 Ti",
        price: 399,
        image: "https://images.unsplash.com/photo-1587829191301-b5b19941dcb5?w=400&h=400&fit=crop",
        category: "GPU",
        stock: 15,
        rating: 4.5,
        reviews: 203,
        description: "NVIDIA GeForce RTX 4060 Ti - Budget friendly option"
    },
    {
        id: 5,
        name: "RX 7900 XTX",
        price: 899,
        image: "https://images.unsplash.com/photo-1587829191301-b5b19941dcb5?w=400&h=400&fit=crop",
        category: "GPU",
        stock: 7,
        rating: 4.6,
        reviews: 87,
        description: "AMD Radeon RX 7900 XTX - Excellent performance"
    },
    {
        id: 6,
        name: "RX 7800 XT",
        price: 499,
        image: "https://images.unsplash.com/photo-1587829191301-b5b19941dcb5?w=400&h=400&fit=crop",
        category: "GPU",
        stock: 10,
        rating: 4.5,
        reviews: 145,
        description: "AMD Radeon RX 7800 XT - High value GPU"
    },
    {
        id: 7,
        name: "RTX 4090 Liquid Cooled",
        price: 2499,
        image: "https://images.unsplash.com/photo-1587829191301-b5b19941dcb5?w=400&h=400&fit=crop",
        category: "GPU",
        stock: 3,
        rating: 4.9,
        reviews: 45,
        description: "Premium liquid cooled RTX 4090"
    },
    {
        id: 8,
        name: "RTX 4070 Super",
        price: 699,
        image: "https://images.unsplash.com/photo-1587829191301-b5b19941dcb5?w=400&h=400&fit=crop",
        category: "GPU",
        stock: 9,
        rating: 4.7,
        reviews: 112,
        description: "NVIDIA GeForce RTX 4070 Super - Enhanced performance"
    },
];

export default function Shop() {
    const [cart, setCart] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Filter products
    const filteredProducts = dummyProducts.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Add to cart
    const handleAddToCart = (productId: number) => {
        setCart([...cart, productId]);
        alert("Product added to cart!");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Shop Header */}
            <div className="bg-green-600 text-white py-8 mb-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Shop</h1>
                    <p className="text-green-100">Discover premium GPUs at unbeatable prices</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                {/* Filters */}
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-lg shadow">
                    {/* Search */}
                    <div className="flex-1 min-w-0">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2">
                        <label className="font-medium text-gray-700">Category:</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                        >
                            <option value="All">All</option>
                            <option value="GPU">GPU</option>
                            <option value="CPU">CPU</option>
                            <option value="Memory">Memory</option>
                        </select>
                    </div>

                    {/* Cart Count */}
                    <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded">
                        <span className="text-lg font-bold text-green-600">🛒</span>
                        <span className="font-medium text-gray-700">
                            Cart: {cart.length}
                        </span>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
                            >
                                {/* Product Image */}
                                <div className="relative overflow-hidden bg-gray-200 h-48">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                    {product.stock <= 5 && (
                                        <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-xs font-bold">
                                            Low Stock
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-yellow-400">⭐</span>
                                        <span className="text-sm font-medium text-gray-700">
                                            {product.rating}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            ({product.reviews})
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-3">
                                        <p className="text-2xl font-bold text-green-600">
                                            ${product.price.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Stock: {product.stock} available
                                        </p>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => handleAddToCart(product.id)}
                                        disabled={product.stock === 0}
                                        className="w-full mt-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 rounded transition-colors duration-300"
                                    >
                                        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">No products found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
