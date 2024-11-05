"use client"

import Link from "next/link";
import Navbar from "@/components/fragments/Navbar/index";
import Footer from "@/components/fragments/Footer/index";
import ShoppingCart  from "@/components/fragments/Cart/index";

export default function Keranjang() {

  return (
    <div>
      <Navbar/>

      <div className="container mx-auto px-4 md:px-0 lg:px-0 sm:px-5">

        <ShoppingCart />
      </div>

      <Footer/>
    </div>
  );
}