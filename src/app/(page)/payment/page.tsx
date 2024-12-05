"use client"

import { useState } from "react";
import Navbar from "@/components/fragments/Navbar/index";
import DropdownShipping from "@/components/core/Dropdown/Shipping";
import QuantitySelector from "@/components/core/Input/QuantitySelector";
import React from "react";

const Checkout = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  return (
    <div>
      <Navbar></Navbar>
    <div className="bg-gray-100 min-h-screen">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto my-24 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-20 text-center">Check Out</h1>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-x-10 gap-y-5">
          {/* Alamat Pengiriman */}
          <div>
            <div className="p-4 border rounded-lg bg-gray-50">
            <h2 className="text-2xl font-medium mb-4">Alamat Pengiriman</h2>
              <p className="font-semibold">Nama Penerima</p>
              <p>(+62) 888-8888-8888</p>
              <p>
                Jl. Moch Kahfi II Gg. Suro, Cipedak, Kec. Jagakarsa, Kota
                Jakarta Selatan, Daerah Khusus Ibukota Jakarta, ID 12630.
              </p>
              <button className="text-blue-500 underline mt-2">Ubah</button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="row-span-3">
            <div className="p-4 border rounded-lg bg-gray-50">
            <h2 className="text-2xl font-medium mb-4">Order summary</h2>
              <div className="space-y-4">
                {/* Item */}
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="flex border-b pb-4"
                  >
                    <img
                      src="/assets/image/Samsung_A55.png"
                      alt="Product"
                      className="w-15 h-15"
                    />
                    <div>
                      <p className="font-semibold">Samsung A55 5G</p>
                      <p className="text-sm text-gray-600">Variant: 8/256</p>
                      <p className="text-sm text-gray-600">
                        Color: Awesome Blue
                      </p>
                      <QuantitySelector></QuantitySelector>
                    </div>
                    <p className="ml-64 font-semibold">Rp6,500,000</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Masukkan Kode Voucher"
                  className="border w-full p-2 rounded mb-2"
                />
                <button className="w-full bg-blue-500 text-white py-2 rounded">
                  Apply
                </button>
              </div>
              <div className="mt-4 text-sm">
                <div className="flex justify-between">
                  <span>NewMember2024</span>
                  <span className="text-green-600">-Rp90,000</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span>Subtotal Produk</span>
                  <span>Rp6,500,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal Pengiriman</span>
                  <span>Rp10,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Diskon Pengiriman</span>
                  <span className="text-green-600">-Rp10,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Voucher Digunakan</span>
                  <span className="text-green-600">-Rp90,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Penanganan</span>
                  <span>Rp1,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Layanan</span>
                  <span>Rp1,500</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total Pesanan</span>
                  <span>Rp6,413,000</span>
                </div>
              </div>
            </div>
            <div className="mt-6 row-span-4">
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">
              Place Order
            </button>
          </div>   

          </div>

              {/* Payment Method */}

          <div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <div className="space-y-2">
            <h2 className="text-2xl font-medium mb-4">Payment Method</h2>
              <div>
                <input
                  type="radio"
                  id="transfer-bank"
                  name="payment-method"
                  className="mr-2"
                  value="transfer"
                  onChange={(e) => setSelectedMethod(e.target.value)}
                />
                <label htmlFor="transfer-bank">Transfer Bank</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="cod"
                  name="payment-method"
                  className="mr-2"
                  value="cod"
                  onChange={(e) => setSelectedMethod(e.target.value)}
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>
          </div>

          {/* shipping */}
           {selectedMethod === "transfer" && (
            <div className="mt-4">
            <DropdownShipping></DropdownShipping>

          </div>
           )}         
          
                 {/* Place Order Button */}
              
          
        </div>
        
     
      </div>
    </div>
  </div>
  </div>
  );
};

export default Checkout;