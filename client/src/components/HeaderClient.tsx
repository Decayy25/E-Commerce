import { useState } from "react";
import { Link } from "react-router-dom";

export default function HeaderClient() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="w-screen bg-green-600 text-white">
            <div className="flex items-center gap-2 md:gap-3 px-6 md:px-10 py-5">
                {/* Logo */}
                <h2 className="text-2xl md:text-3xl font-bold whitespace-nowrap">Central GPU</h2>

                {/* Search */}
                <div className="flex items-center justify-center bg-white rounded px-3 md:px-4 py-2 max-w-md flex-1">
                    <input 
                        type="text" 
                        placeholder="Search"
                        className="border-none outline-none flex-1 px-2 py-2 md:py-2 text-gray-800 text-sm md:text-base"
                    />
                    <button onClick={() => {}} className="bg-transparent border-none text-green-600 text-lg cursor-pointer hover:scale-110 transition-transform px-2">
                        🔍
                    </button>
                </div>

                {/* Navigation + Right Actions Container (Desktop) */}
                <div className="hidden md:flex items-center gap-0 ml-auto">
                    {/* Navigation - Desktop */}
                    <nav>
                        <ul className="flex gap-8 m-0 list-none">
                            <li>
                                <Link to="/" className="text-white no-underline font-medium text-base block py-2 px-3 border-b-2 border-b-transparent hover:border-b-white transition-all">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="text-white no-underline font-medium text-base block py-2 px-3 border-b-2 border-b-transparent hover:border-b-white transition-all">
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-white no-underline font-medium text-base block py-2 px-3 border-b-2 border-b-transparent hover:border-b-white transition-all">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                {/* Sign Up Button */}
                                <Link to="/register" className="m-10 bg-white text-green-600 px-4 font-medium rounded hover:bg-green-100 transition-colors">
                                    SignUp
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    
                </div>

                {/* Hamburger Menu & SignUp (Mobile) */}
                <div className="flex md:hidden items-center gap-3 flex-shrink-0">
                    {/* Sign Up Button - Mobile */}
                    <Link to="/register" className="bg-transparent border-2 border-white text-white px-4 py-1.5 rounded font-medium transition-all hover:bg-white hover:text-green-600 whitespace-nowrap text-sm">
                        SignUp
                    </Link>

                    {/* Hamburger Menu */}
                    <button 
                        className="flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-0"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className="w-6 h-0.5 bg-white rounded transition-all block"></span>
                        <span className="w-6 h-0.5 bg-white rounded transition-all block"></span>
                        <span className="w-6 h-0.5 bg-white rounded transition-all block"></span>
                    </button>
                </div>
            </div>



            {/* Navigation - Mobile */}
            <nav className={`md:hidden bg-green-600 overflow-hidden border-t border-green-700 transition-all duration-300 ${isMenuOpen ? "max-h-96" : "max-h-0"}`}>
                <ul className="flex flex-col gap-0 px-6 py-3 m-0 list-none">
                    <li>
                        <Link to="/" className="text-white no-underline font-medium text-base block py-4 px-3 border-b border-green-700 hover:bg-green-700 transition-all">
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="text-white no-underline font-medium text-base block py-4 px-3 border-b border-green-700 hover:bg-green-700 transition-all">
                            Cart
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-white no-underline font-medium text-base block py-4 px-3 hover:bg-green-700 transition-all">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}