import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Client Components
import Header from "./components/Header";
import Shop from "./components/Shop";
import Footer from "./components/Footer";
import Cart from "./components/CartOrder";

// Pages
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Contact from "./pages/Contact";



// Desain
import feather from "feather-icons";  
import "devicon/devicon.min.css";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  const [account, setAccount] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false});
    feather.replace();
    fetch(`${import.meta.env.VITE_API}/api/accounts`)
      .then((response) => response.json())
      .then((data) => {
        setAccount(data);
        setTimeout(() => AOS.refresh(), 100);
      })
      .catch(err => console.error(err));
  }, []);

  
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}