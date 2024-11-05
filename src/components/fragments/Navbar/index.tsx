import GrearMarket from "../../core/Label/GrearMarket";
import Link from "next/link";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <nav className="bg-[#f4f1eb] border-b border-gray-200 shadow-lg fixed top-0 w-full z-50">
      <div className="flex items-center justify-between mx-6 lg:mx-20 py-4">
        <div className="flex items-center">
          <GrearMarket />

          <div className="hidden lg:flex gap-6 text-black ml-5">
            <Link href="/">
              <p className="hover:text-blue-500 hover:duration-700">Home</p>
            </Link>
            <Link href="/shop">
              <p className="hover:text-blue-500 hover:duration-700">Shop</p>
            </Link>
            <Link href="/contact">
              <p className="hover:text-blue-500 hover:duration-700">Contact</p>
            </Link>
            <Link href="/chatbot">
              <p className="hover:text-blue-500 hover:duration-700">Chatbot</p>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center w-[350px]">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-gray-100 border rounded-full px-5 py-2 text-sm w-full max-w-[350px] focus:outline-none"
            />
            <FiSearch className="absolute right-3 text-gray-500" />
          </div>

          <div className="flex items-center gap-4 text-black text-lg">
            <FiShoppingCart className="cursor-pointer" />
            <div className="rounded-full w-[35px] h-[35px] bg-black flex items-center justify-center">
              <FiUser className="cursor-pointer text-white" />
            </div>
          </div>

          <div className="lg:block hidden w-[1.5px] h-[40px] rounded-md bg-black"></div>

          <div className="hidden lg:flex gap-4">
            <Link href="/auth/sign-in">
              <button className="px-4 py-1 text-md rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300">
                Sign In
              </button>
            </Link>
            <Link href="/auth/sign-up">
              <button className="px-4 py-1 text-md rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
                Sign Up
              </button>
            </Link>
          </div>

          <div className="lg:hidden">
            <FiMenu
              onClick={toggleMobileMenu}
              className="cursor-pointer text-xl"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#f4f1eb] shadow-lg transition-transform duration-300 ${
          isMobileMenuOpen
            ? "transform translate-x-0"
            : "transform translate-x-full"
        } w-64 z-50`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <GrearMarket />
          <FiX onClick={toggleMobileMenu} className="cursor-pointer text-xl" />
        </div>

        <div className="flex flex-col p-6 space-y-4 text-black overflow-y-auto h-[calc(100vh-64px)]">
          <Link href="/">
            <p
              onClick={toggleMobileMenu}
              className="hover:text-blue-500 hover:duration-700"
            >
              Home
            </p>
          </Link>
          <Link href="/shop">
            <p
              onClick={toggleMobileMenu}
              className="hover:text-blue-500 hover:duration-700"
            >
              Shop
            </p>
          </Link>
          <Link href="/contact">
            <p
              onClick={toggleMobileMenu}
              className="hover:text-blue-500 hover:duration-700"
            >
              Contact
            </p>
          </Link>
          <Link href="/chatbot">
            <p
              onClick={toggleMobileMenu}
              className="hover:text-blue-500 hover:duration-700"
            >
              Chatbot
            </p>
          </Link>

          <div className="flex flex-col gap-4 mt-4">
            <Link href="/auth/sign-in">
              <button
                onClick={toggleMobileMenu}
                className="w-full px-4 py-1 text-md rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
              >
                Sign In
              </button>
            </Link>
            <Link href="/auth/sign-up">
              <button
                onClick={toggleMobileMenu}
                className="w-full px-4 py-1 text-md rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
