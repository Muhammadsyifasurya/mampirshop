import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"; // Menggunakan react-icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bagian Logo dan Deskripsi */}
          <div className="space-y-4">
            <div className="text-3xl font-bold text-indigo-500">SmartShop</div>
            <p className="text-sm text-gray-400">
              Your one-stop shop for the latest products. Discover great deals
              on tech, fashion, and more.
            </p>
          </div>

          {/* Tautan Navigasi */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-400">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-indigo-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/categories" className="hover:text-indigo-300">
                  Categories
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-indigo-300">
                  Cart
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-indigo-300">
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Ikon Media Sosial */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-400">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                className="text-gray-300 hover:text-indigo-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-300 hover:text-indigo-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-300 hover:text-indigo-300"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-300 hover:text-indigo-300"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Hak Cipta */}
        <div className="text-center mt-12 text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} SmartShop. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
