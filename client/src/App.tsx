import { Routes, Route } from "react-router-dom";

// Client Components
import HeaderClient from "./components/HeaderClient";
import Shop from "./components/Shop";
import Footer from "./components/Footer";

// Pages
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";

// Administrator
// import HeaderAdmin from "./components/HeaderAdmin";

export default function App() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <HeaderClient />
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