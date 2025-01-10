import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const user = localStorage.getItem("user");

  useEffect(() => {
    const handleStorageChange = () => {
      const user = localStorage.getItem("user");
      if (user) {
        setUsername(user);
      } else {
        setUsername(null);
      }
    };

    console.log(username);

    window.addEventListener("storage", handleStorageChange);

    if (user) {
      setUsername(user);
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   setUsername(null);
  // };

  const { cartCount } = useCart();
  return (
    <nav className="fixed z-30 flex h-[60px] w-full items-center justify-between bg-[#0a192f] px-[20px] text-[#64ffda] shadow-md md:h-[80px] md:w-full md:justify-around">
      <ul className="hidden font-semibold md:flex items-center md:gap-10 md:text-[18px]">
        <li>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-white"
          >
            <img
              src="/MampirShop.webp"
              title="logo"
              className="h-[45px] w-[50px]"
            />
            <h2>MampirShop</h2>
          </Link>
        </li>
        <li className="transition-all duration-300 ease-in-out hover:text-[#4F9FA7]">
          <Link to="/categories" className=" hover:text-gray-200">
            Categories
          </Link>
        </li>
        <li className="transition-all duration-300 ease-in-out hover:text-[#4F9FA7]"></li>
      </ul>

      <div className="py-2 transition-all duration-300 ease-in-out flex gap-8 hover:text-[#4F9FA7] md:text-[18px] font-semibold">
        {/* {username ? (
          <div className="flex items-center text-white">
            <button className="text-white">Logout</button>
          </div>
        ) : ( */}
        <Link to="/login" className="flex gap-3 px-4 py-2 bg-white rounded-xl">
          <img src="/Like.svg" alt="" height={20} width={20} />
          <h2 className="text-[#2D3436]">Login</h2>
        </Link>
        <Link
          to="/cart"
          className="flex items-center px-4 bg-white hover:text-gray-200 rounded-xl"
        >
          <img src="/Cart.svg" alt="cart" width={24} height={24} />
          <h2 className="md:text-md ml-2 text-lg font-bold text-[#2D3436]">
            Cart
          </h2>
          {cartCount > 0 && (
            <h1 className="ml-2 flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-[#007580] text-[10px] text-[#F0F2F3]">
              {cartCount}
            </h1>
          )}
        </Link>
      </div>

      {/* Tombol hamburger untuk menu mobile */}
      <div className="flex items-center md:hidden">
        <button
          title="hamburger"
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="p-4 space-y-4 bg-indigo-700 md:hidden">
          <Link to="/" className="block text-white hover:text-gray-200">
            Home
          </Link>
          <Link
            to="/categories"
            className="block text-white hover:text-gray-200"
          >
            Categories
          </Link>
          <Link to="/cart" className="block text-white hover:text-gray-200">
            Cart
          </Link>
          <Link to="/login" className="block text-white hover:text-gray-200">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
