"use client";

import Link from "next/link";
import Navbar from "@/components/fragments/Navbar/Navbar";
import Footer from "@/components/fragments/Footer/Footer";
import ShoppingCart from "@/components/fragments/Cart/ShoppingCart";

export default function Keranjang() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="mx-auto w-full flex-1 px-4 sm:px-6 lg:px-8">
        <ShoppingCart />
      </div>

      <Footer />
    </div>
  );
}
