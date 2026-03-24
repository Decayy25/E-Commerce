import { useState, useEffect } from "react";
import feather from 'feather-icons';

// Dummy Product Data
const dummyProducts = [
    {
        id: 1,
        name: "ROG ASTRAL GeForce RTX 5090 OC 32GB GDDR7",
        price: 73069000,
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQPtBSy5KjNegQwPsbh8UJEKN5qykxqC_EgqPfFsf-CZyDEzzeOEyGzm6J0wDSliahmwztNA95U9NRHdM6bX8yhRFi7t5z9",
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
        image: "https://asset.msi.com/resize/image/global/product/product_17676039907891dedb6bfd993248f5617995beb9a9.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png",
        category: "GPU",
        stock: 2,
        rating: 4.7,
        reviews: 98,
        description: "MSI GeForce RTX 5090 LIGHTNING Z 32GB GDDR7 - High-performance gaming GPU"
    },
    {
        id: 3,
        name: "AORUS GeForce RTX™ 5090 MASTER 32G",
        price: 57172000,
        image: "https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/img/VqbcmM/2025/4/22/a3ddcf5a-3628-4f65-9287-806c71289c58.jpg~tplv-aphluv4xwc-resize-jpeg:700:0.jpg",
        category: "GPU",
        stock: 15,
        rating: 4.5,
        reviews: 76,
        description: "AORUS GeForce RTX™ 5090 MASTER 32G - Premium gaming GPU with advanced features"
    },
    {
        id: 4,
        name: "ROG Strix GeForce RTX 4080 Super 16GB GDDR6X OC",
        price:  23999000,
        image: "https://wpg-indonesia.com/storage/app/media/ASUS%20Product/ASUS%20GRAPHIC%20CARD/ASUS%20ROG%20Strix%20GeForce%20RTX%204080%20SUPER%2016GB%20GDDR6X%20OC%20Edition/6.png",
        category: "GPU",
        stock: 20,
        rating: 4.6,
        reviews: 89,
        description: "ASUS ROG Strix GeForce RTX 4080 Super 16GB GDDR6X OC Edition - High-performance gaming GPU"
    },
    {
        id: 5,
        name: "ROG STRIX Z690-E GAMING WIFI",
        price: 5750000,
        image: "https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/img/VqbcmM/2022/2/8/aeb6fec3-8886-421e-bac6-58ebdacda0d3.jpg~tplv-aphluv4xwc-resize-jpeg:700:0.jpg",
        category: "Motherboard",
        stock: 25,
        rating: 4.6,
        reviews: 90,
        description: "IntelZ690 LGA 1700 ATX motherboard with PCIe5.0, 16+1 power stages, DDR5 memory support, Two-Way AI Noise Cancelation, AI Overclocking, AI Cooling, AI Networking, WiFi 6E (802.11ax), Intel2.5 Gb Ethernet, four M.2 slots with heatsinks, PCIe 4.0 NVMeSSD support, M.2 backplate, PCIeSlot Q-Release, USB 3.2 Gen 2x2 Type-C, SATA and Aura Sync RGB lighting"
    },
    {
        id: 6,
        name: "ROG STRIX B850-F GAMING WIFI",
        price: 5799000,
        image: "https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/img/VqbcmM/2025/1/9/5910c5f0-6068-4ce6-b856-cda3379791cd.jpg~tplv-aphluv4xwc-resize-jpeg:700:0.jpg",
        category: "Motherboard",
        stock: 10,
        rating: 4.4,
        reviews: 63,
        description: "Motherboard ATX premium berbasis chipset AMD B850 (soket AM5) yang dirancang untuk prosesor Ryzen 7000/8000/9000 series. Fitur utamanya mencakup dukungan PCIe 5.0 penuh, RAM DDR5 cepat, WiFi 7, dan 19 port USB (termasuk 20Gbps)"
    },
    {
        id: 7,
        name: "X870E AORUS MASTER GAMING WIFI 7",
        price: 7530000,
        image: "https://static.gigabyte.com/StaticFile/Image/Global/6742038c90b90dbde85a56e33c573323/Product/44015",
        category: "Motherboard",
        stock: 15,
        rating: 4.4,
        reviews: 98,
        description: "Motherboard ATX premium  socket AM5, mendukung AMD Ryzen 9000/8000/7000 Series. Menampilkan teknologi tercanggih, motherboard ini mengunggulkan PCIe 5.0 (GPU & M.2), WiFi 7, USB4 40Gbps, VRM digital kokoh, serta fitur ramah rakit seperti EZ-Latch Plus"
    },
    {
        id: 8,
        name: "B850 AORUS ELITE WIFI 7 ICE (Rev. 1.x)",
        price: 4310000,
        image: "https://static.gigabyte.com/StaticFile/Image/Global/62e16c53d6c6410d314525f21864d47a/Product/46274",
        category: "Motherboard",
        stock: 20,
        rating: 4.6,
        reviews: 288,
        description: "Motherboard ATX premium berwarna putih (ICE) untuk soket AMD AM5, didesain untuk Ryzen 7000/8000/9000 series. Fitur utamanya mencakup dukungan DDR5 (hingga 8200+ MT/s), slot PCIe 5.0 x16, M.2 PCIe 5.0, Wi-Fi 7, 2.5GbE LAN, dan sistem daya 14+2+2 VRM untuk stabilitas tinggi."
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
    const handleAddToCart = async (productId: number) => {
        const product = dummyProducts.find(p => p.id === productId);
        if (!product) return;

        const token = localStorage.getItem("token");
        const payload = {
            productId: product.id.toString(),
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/carts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                setCart([...cart, productId]);
            }
        } catch (err) {
            console.error("Gagal menghubungkan ke server: ", err);
        }
    }

    useEffect(() => {
        feather.replace();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            <div className="bg-green-600 text-white py-8 mb-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Shop</h1>
                    <p className="text-green-100">Discover premium GPUs at unbeatable prices</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-lg shadow">
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
                                        className="w-full h-full bg-white object-cover hover:scale-105 transition-transform duration-300"
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
