"use client";

import GrearMarket from "@/components/core/Label/GrearMarket";
import Link from "next/link";
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfileDropdown } from "@/components/core/Dropdown/ProfileDropdown";
import { useSearchProduct } from "@/stores/search";
import { logout } from "@/app/api/auth/google";

interface UserData {
  email: string;
  expiresAt: Date;
  name: string;
  user_id: string;
}

function buttonLogin() {
  return (
    <div className="hidden gap-4 lg:flex">
      <Link href="/auth/sign-in">
        <button className="text-md rounded-lg border border-blue-500 px-4 py-1 text-blue-500 transition duration-300 hover:bg-blue-500 hover:text-white">
          Masuk
        </button>
      </Link>
      <Link href="/auth/sign-up">
        <button className="text-md rounded-lg bg-blue-500 px-4 py-1 text-white transition duration-300 hover:bg-blue-600">
          Daftar
        </button>
      </Link>
    </div>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [session, setSession] = useState<string | null>(null);
  const router = useRouter();
  const { text, setText } = useSearchProduct();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logout();
    router.push("/");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userSession = localStorage.getItem("userSession");
      setSession(userSession);

      if (userSession) {
        try {
          const parsedUserData = JSON.parse(userSession);
          setUserData(parsedUserData);
        } catch (error) {
          console.error("Error parsing user session:", error);
        }
      }
    }
    setIsMobileMenuOpen(false);
  }, []);

  const handleSearch = () => {
    setText(searchKeyword);
    router.push("/");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-[#f4f1eb] shadow-lg">
      <div className="mx-4 flex items-center justify-between py-3 sm:mx-6 md:py-4 lg:mx-20">
        <div className="flex items-center">
          <GrearMarket />

          <div className="ml-5 hidden gap-6 text-black lg:flex">
            <Link href="/">
              <p className="hover:text-blue-500 hover:duration-700">Beranda</p>
            </Link>
            {session && (
              <Link href="/invoice">
                <p className="hover:text-blue-500 hover:duration-700">
                  Riwayat Transaksi
                </p>
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden items-center sm:flex">
            <input
              type="text"
              placeholder="Cari Berdasarkan Nama Produk"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-96 rounded-lg border bg-gray-100 px-3 py-1.5 text-sm focus:outline-none sm:px-5 sm:py-2"
            />
            <FiSearch
              onClick={handleSearch}
              className="absolute right-3 cursor-pointer text-gray-500"
            />
          </div>

          {session && (
            <div className="flex items-center gap-3 text-base text-gray-500 sm:gap-4 sm:text-lg">
              <Link href="/keranjang">
                <FiShoppingCart className="cursor-pointer" />
              </Link>

              <ProfileDropdown />
            </div>
          )}

          <div className="hidden h-[30px] w-[2.5px] rounded-lg bg-gray-500 sm:block md:h-[40px]"></div>

          {session && userData ? (
            <p className="hidden items-center text-sm sm:block sm:text-base">
              {userData.name}
            </p>
          ) : (
            buttonLogin()
          )}

          <div className="lg:hidden">
            <FiMenu
              onClick={toggleMobileMenu}
              className="cursor-pointer text-xl"
            />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="mx-4 mb-2 flex items-center justify-between sm:hidden">
        <div className="relative flex w-full items-center">
          <input
            type="text"
            placeholder="Cari Produk"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg border bg-gray-100 px-3 py-1.5 text-sm focus:outline-none"
          />
          <FiSearch
            onClick={handleSearch}
            className="absolute right-3 cursor-pointer text-gray-500"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed right-0 top-0 h-full bg-[#f4f1eb] shadow-lg transition-transform duration-300 ${
          isMobileMenuOpen
            ? "translate-x-0 transform"
            : "translate-x-full transform"
        } z-50 w-64`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <GrearMarket />
          <FiX onClick={toggleMobileMenu} className="cursor-pointer text-xl" />
        </div>

        <div className="flex h-[calc(100vh-64px)] flex-col space-y-4 overflow-y-auto p-6 text-black">
          <Link href="/">
            <p
              onClick={toggleMobileMenu}
              className="hover:text-blue-500 hover:duration-700"
            >
              Beranda
            </p>
          </Link>

          <Link href="/invoice">
            <p
              onClick={toggleMobileMenu}
              className="hover:text-blue-500 hover:duration-700"
            >
              Riwayat Transaksi
            </p>
          </Link>

          {!session ? (
            <div className="mt-4 flex flex-col gap-4">
              <Link href="/auth/sign-in">
                <button
                  onClick={toggleMobileMenu}
                  className="text-md w-full rounded-full border border-blue-500 px-4 py-1 text-blue-500 transition duration-300 hover:bg-blue-500 hover:text-white"
                >
                  Masuk
                </button>
              </Link>
              <Link href="/auth/sign-up">
                <button
                  onClick={toggleMobileMenu}
                  className="text-md w-full rounded-full bg-blue-500 px-4 py-1 text-white transition duration-300 hover:bg-blue-600"
                >
                  Daftar
                </button>
              </Link>
            </div>
          ) : (
            <button
              onClick={(e) => handleLogout(e)}
              className="text-md w-full rounded-full bg-blue-500 px-4 py-1 text-white transition duration-300 hover:bg-blue-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
