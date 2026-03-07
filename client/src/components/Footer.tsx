import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="w-full bg-green-600 text-white mt-12">
            {/* Footer Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Layanan Pelanggan */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-green-400">
                            Layanan Pelanggan
                        </h3>
                        <ul className="space-y-2 list-none p-0 m-0">
                            <li>
                                <Link to="/contact" className="text-white no-underline hover:text-green-200 transition-colors">
                                    Hubungi Kami
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-white no-underline hover:text-green-200 transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-white no-underline hover:text-green-200 transition-colors">
                                    Kebijakan Privasi
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-white no-underline hover:text-green-200 transition-colors">
                                    Syarat & Ketentuan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Pembayaran */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-green-400">
                            Pembayaran
                        </h3>
                        <ul className="space-y-2 list-none p-0 m-0">
                            <li className="text-white">💳 Kartu Kredit</li>
                            <li className="text-white">🏦 Transfer Bank</li>
                            <li className="text-white">📱 E-Wallet</li>
                            <li className="text-white">🎁 Cicilan 0%</li>
                        </ul>
                    </div>

                    {/* Ikuti Kami */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-green-400">
                            Ikuti Kami
                        </h3>
                        <div className="flex gap-4">
                            <a 
                                href="#" 
                                className="text-white text-2xl hover:text-green-200 transition-colors"
                                aria-label="Facebook"
                            >
                                f
                            </a>
                            <a 
                                href="#" 
                                className="text-white text-2xl hover:text-green-200 transition-colors"
                                aria-label="Twitter"
                            >
                                𝕏
                            </a>
                            <a 
                                href="#" 
                                className="text-white text-2xl hover:text-green-200 transition-colors"
                                aria-label="Instagram"
                            >
                                📷
                            </a>
                            <a 
                                href="#" 
                                className="text-white text-2xl hover:text-green-200 transition-colors"
                                aria-label="YouTube"
                            >
                                ▶️
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-green-500 py-6 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-green-100 text-sm">
                        &copy; 2026 Central GPU. All rights reserved.
                    </p>
                    <p className="text-green-100 text-sm">
                        Made with ❤️ by Central GPU Team
                    </p>
                </div>
            </div>
        </footer>
    );
}
