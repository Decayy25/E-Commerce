import { useState } from "react";
import { Link } from "react-router";

export default function HeaderClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-green-600 text-white border-b-1 border-white fixed top-0 left-0 z-50">

      {/* Navbar */}
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center px-10 py-5">

        {/* Logo */}
        <h1 className="text-4xl font-bold justify-self-start ml-[-40px]">
          Central GPU
        </h1>

        {/* Search */}
        <div className="flex items-center bg-gray-100 rounded-md px-5 py-3 w-full max-w-md md:max-w-2xl lg:max-w-4xl justify-self-center">
          <span className="text-green-600 text-2xl mr-4">🔍</span>

          <input
            type="text"
            placeholder="Search"
            className="bg-transparent flex-1 outline-none text-gray-700 text-lg border-b-2 border-green-600"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 justify-self-end">

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 text-lg">

            <Link to="/" className="hover:text-green-200 transition">
              Shop
            </Link>

            <Link to="/cart" className="hover:text-green-200 transition">
              Cart
            </Link>

            <Link to="/contact" className="hover:text-green-200 transition">
              Contact
            </Link>

            <Link
              to="/register"
              className="bg-white text-green-600 px-4 py-2 rounded font-medium hover:bg-green-100 transition"
            >
              SignUp
            </Link>

          </nav>

          {/* Hamburger Mobile */}
          <button
            className="text-4xl md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden bg-green-600 overflow-hidden border-t border-green-700 transition-all duration-300 ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-3">

          <li>
            <Link
              to="/"
              className="block py-4 px-3 border-b border-green-700 hover:bg-green-700"
            >
              Shop
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              className="block py-4 px-3 border-b border-green-700 hover:bg-green-700"
            >
              Cart
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="block py-4 px-3 border-b border-green-700 hover:bg-green-700"
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              to="/register"
              className="block py-4 px-3 hover:bg-green-700"
            >
              SignUp
            </Link>
          </li>

        </ul>
      </nav>

    </header>
  );
}