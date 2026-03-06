// import { useState, useEffect } from "react";
import { Link , Routes, Route } from "react-router-dom";

// Client
import HeaderClient from "./components/HeaderClient.tsx";
import Home from "./components/Home.tsx";
import Footer from "./components/Footer.tsx";
// import About from "./components/About.tsx";
// import Services from "./components/Services.tsx";
// import Contact from "./components/Contact.tsx";
// import Shop from "./pages/Shop.tsx";





// Administrator
// import HeaderAdmin from "./components/HeaderAdmin.jsx";

export default function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  return (
    <>
      {/* {user ? (
        user.role === "admin" ? (
          <HeaderAdmin />

        ) : (
          <HeaderClient />
        )
      ) : (
        <p>Please log in to see the content.</p>
      )} */}

      <HeaderClient />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/services" element={<Services />} />
        <route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}