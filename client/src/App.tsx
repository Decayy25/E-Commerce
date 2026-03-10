import { Routes, Route } from "react-router-dom";

// Client Components
import Header from "./components/Header";
import Shop from "./components/Shop";
import Footer from "./components/Footer";

// Pages
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";



// Desain
import feather from "feather-icons";
import "devicon/devicon.min.css";
import "./index.css";

feather.replace();

export default function App() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}