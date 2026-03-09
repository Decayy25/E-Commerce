import { Link } from "react-router-dom";
import Logo from "../assets/Logo-cirle.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#5e6973] text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <img src={Logo} alt="Central GPU Logo" className="w-40 mb-4" />

            <h3 className="text-xl font-bold mb-3 ml-5">
              Central GPU
            </h3>
          </div>

          {/* Layanan Pelanggan */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-[#9FFFF5]">
              Layanan Pelanggan
            </h3>

            <ul className="space-y-2">

              <li>
                <Link to="/contact" className="hover:text-[#7cffc4]">
                  Hubungi Kami
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-[#7cffc4]">
                  FAQ
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-[#7cffc4]">
                  Kebijakan Privasi
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-[#7cffc4]">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Pembayaran */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-[#9FFFF5]">
              Pembayaran
            </h3>

            <ul className="space-y-2">
              <li>💳 Kartu Kredit</li>
              <li>🏦 Transfer Bank</li>
              <li>📱 E-Wallet</li>
              <li>🎁 Cicilan 0%</li>
            </ul>
          </div>

          {/* Ikuti Kami */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-[#9FFFF5]">
              Ikuti Kami
            </h3>

            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-[#e9001d]">f</a>
              <a href="#" className="hover:text-[#e9001d]">𝕏</a>
              <a href="#" className="hover:text-[#e9001d]">📷</a>
              <a href="#" className="hover:text-[#e9001d]">▶️</a>
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
            Made with ❤️ by Central GPU Team
          </p>

        </div>

      </div>

    </footer>
  );
}