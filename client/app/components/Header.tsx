import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

export default function Header({ setToken }) {
    const [IsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        navigate('/login');
    }

    return (
        <header className="bg-white stiky top-0 z-50 shadow-md">
            <div className="container-head">
                <div className="w-full mx-auto px-6 py-4 flex items-center justify-between">
                    <span className="text-xl font-bold">Central Electronic</span>
                </div>

                <button
                    className="text-gray-500 focus:outline-none md:hidden"
                    onClick={() => setIsOpen(!IsOpen)}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <nav className={`
                        fixed lg:static top-[72px] left-0 w-full lg:w-auto 
                        bg-[#1a1b26] lg:bg-transparent
                        flex flex-col lg:flex-row items-center gap-6 
                        transition-all duration-300 ease-in-out
                        px-6 py-8 lg:p-0
                        ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100"}
                    `}>
                    <a href="/" className="text-white hover:text-blue-500 font-medium" onClick={() => setIsOpen(false)}>Home</a>
                    <a href="/about" className="text-white hover:text-blue-500 font-medium" onClick={() => setIsOpen(false)}>About</a>
                    <a href="/shop" className="text-white hover:text-blue-500 font-medium" onClick={() => setIsOpen(false)}>Shop</a>
                    <a href="/blog" className="text-white hover:text-blue-500 font-medium" onClick={() => setIsOpen(false)}>Blog</a>
                        
                    <button
                        type="button"
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full transition-colors w-full lg:w-auto"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
}