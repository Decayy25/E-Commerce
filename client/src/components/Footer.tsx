import { Link } from "react-router-dom";
import { useEffect } from "react";
import Logo from "../assets/Logo.png";
import feather from "feather-icons";
import "devicon/devicon.min.css";

// payment method logo
import dana from "../assets/payment/dana.png";
import ovo from "../assets/payment/ovo.png";
import gopay from "../assets/payment/gopay.png";
import bca from "../assets/payment/bca.png";
import bni from "../assets/payment/bni.png";
import bri from "../assets/payment/bri.png";
import mandiri from "../assets/payment/mandiri.png";
import indomart from "../assets/payment/indomart.png";
import alfamart from "../assets/payment/alfamart.png";

const paymentMethods = {
  dana: dana,
  ovo: ovo,
  gopay: gopay,
  bca: bca,
  bni: bni,
  bri: bri,
  mandiri: mandiri,
  indomart: indomart,
  alfamart: alfamart,
};
export default function Footer() {
  useEffect(() => {
    feather.replace();
  }, []);


  return (
    <footer className="w-full bg-[#ffff] text-gray-50 mt-12 border-t-2 border-[#5e6973]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <img src={Logo} alt="Central GPU Logo" className="w-40 h-40 mb-4" />

            <h3 className="text-xl text-gray-800 font-bold mb-3 ml-5">
              Central GPU
            </h3>
          </div>

          {/* Layanan Pelanggan */}
          <div>
            <h3 className="text-xl text-gray-800 font-bold mb-4 pb-2 border-b-2 border-[#6abea7]">
              Layanan Pelanggan
            </h3>

            <ul className="space-y-2">

              <li>
                <Link to="/contact" className="text-gray-800 hover:text-[#589c00]">
                  Hubungi Kami
                </Link>
              </li>

              <li>
                <Link to="#" className="text-gray-800 hover:text-[#589c00]">
                  FAQ
                </Link>
              </li>

              <li>
                <Link to="#" className="text-gray-800 hover:text-[#589c00]">
                  Kebijakan Privasi
                </Link>
              </li>

              <li>
                <Link to="#" className="text-gray-800 hover:text-[#589c00]">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Pembayaran */}
          <div>
            <h3 className="text-xl text-gray-800 font-bold mb-4 pb-2 border-b-2 border-[#6abea7]">
              Pembayaran
            </h3>

            <ul className="grid grid-cols-3 sm:grid-cols-4 gap-4 items-center">
              {Object.entries(paymentMethods).map(([key, src]) => (
                <li key={key}>
                  <img 
                    src={src} 
                    alt={key} 
                    className="flex items-center justify-center p-2 bg-white rounded-md shadow-sm" 
                    />
                </li>
              ))}
            </ul>
          </div>

          {/* Ikuti Kami */}
          <div>
            <h3 className="text-xl text-gray-800 font-bold mb-4 pb-2 border-b-2 border-[#6abea7]">
              Ikuti Kami
            </h3>

            <div className="flex gap-4 text-2xl">
              <a href="#" className="text-gray-800 hover:text-[#e9001d]"><i data-feather="facebook"></i></a>
              <a href="#" className="text-gray-800 hover:text-[#e9001d] text-lg"><i className="devicon-twitter-original"></i></a>
              <a href="#" className="text-gray-800 hover:text-[#e9001d]"><i data-feather="instagram"></i></a>
              <a href="#" className="text-gray-800 hover:text-[#e9001d]"><i data-feather="youtube"></i></a>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#bdfffd] py-6 px-4 md:px-8">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">

          <p className="text-green-100 text-sm">
            © 2026 Central GPU. All rights reserved.
          </p>

          <p className="text-green-100 text-sm">
            Made with by Central GPU Team
          </p>

        </div>

      </div>

    </footer>
  );
}