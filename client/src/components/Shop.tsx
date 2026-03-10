import { useState, useEffect } from "react";
import feather from 'feather-icons';

// Dummy Product Data
const dummyProducts = [
    {
        id: 1,
        name: "ROG ASTRAL GeForce RTX 5090 OC 32GB GDDR7",
        price: 73069000,
        image: "https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/90f00ce51d474515a2b29cf9af278b91~tplv-aphluv4xwc-white-pad-v1:250:250.jpeg",
        category: "GPU",
        stock: 10,
        rating: 4.8,
        reviews: 124,
        description: "ASUS ROG ASTRAL GeForce RTX 5090 OC - Ultimate gaming performance"
    },
    {
        id: 2,
        name: "MSI GeForce RTX 5090 LIGHTNING Z 32GB GDDR7",
        price: 106500000,
        image: "data:image/jpeg;base64,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ym9tdPNW4xeqHg0LK+xP/p2eg+qv4fhYDzI+UFx0FrW96qNiyIPBDhcd35k/grsvSWvhaKGhu10xzOMbbzE2DcrCPZbYb7+IXkIyhwuPaFra30OvxViTE697zR0LDmeBndEy0zwb91827WDkLBBh1vRbsGmTEatschuexae2qXH9IA2br+cVH6SJ8kgjhY5znOtGwauNzoNOK6hgHUfUy2fWTiK+pa38pIfNx0HxXVeiXQOiw4XgjvJaxlkOeQ/rWs0eDQAg2nRmgdT0lPC85nMja1x4XA1stoiICIiAiIgIiICIiAiIgIiIPCuU/wDkG2R1JSsYQQ6oDS377nljsgb4Xv6hdXVippI5ABIxrrEOGYA2I2IvsUHy9hXQGd2JR4fOCwmzpCwh2SNzcwcCfMe9dj6P9U9LSwVMRcJny+xLJG3NF3SBlAOtib8FNIcEgZUvqmxgTPYI3v4lotYfAei2FkHAMe6oKvORC0PjYxjWEFrc7rjO9zSdNCdFH5uqrEx/6HHyyn5PX0/ZLKD5Tm6uMSbvTSfsn8Fn4T1Z1rhHK+lklZncJIg4QuIG1pHXy3J3sdl9OgJZUcxd1I4aRo+pZ5SsNvDVhWM/qIovu1VSPPsT/sC6vZeoOOzdQsJ9mukHnEw/IhYknUIR7OI+sH0lXbUQcPj6kKlhu2vjPnE8f7yun9Cujn2KnEbix0lyXyNbbNc6XvroLKQWXqDyy9REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH/2Q==",
        category: "GPU",
        stock: 2,
        rating: 4.7,
        reviews: 98,
        description: "MSI GeForce RTX 5090 LIGHTNING Z 32GB GDDR7 - High-performance gaming GPU"
    }
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

    useEffect(() => {
        feather.replace();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
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
                            <option value="RAM">RAM</option>
                            <option value="Motherboard">Motherboard</option>
                        </select>
                    </div>

                    {/* Cart Count */}
                    <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded">
                        <span className="text-lg font-bold text-[#3079ee] hover:text-[#589c00]"><i data-feather="shopping-cart"></i></span>
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
                                <div className="relative overflow-hidden bg-gray-200 h-64">
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
                                            {product.price.toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })}
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
