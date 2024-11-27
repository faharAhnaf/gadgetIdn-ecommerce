"use client";

import Navbar from "@/components/fragments/Navbar/index";
import QuantitySelector from "@/components/core/Input/QuantitySelector";
import React from "react";

const Checkout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-100">
        {/* Main Content */}
        <div className="mx-auto my-24 max-w-7xl rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-20 text-center text-3xl font-bold">Check Out</h1>
          <div className="grid grid-cols-2 gap-x-10 gap-y-5 md:grid-cols-2">
            {/* Alamat Pengiriman */}
            <div>
              <div className="rounded-lg border bg-gray-50 p-4">
                <h2 className="mb-4 text-2xl font-medium">Alamat Pengiriman</h2>
                <p className="font-semibold">Nama Penerima</p>
                <p>(+62) 888-8888-8888</p>
                <p>
                  Jl. Moch Kahfi II Gg. Suro, Cipedak, Kec. Jagakarsa, Kota
                  Jakarta Selatan, Daerah Khusus Ibukota Jakarta, ID 12630.
                </p>
                <button className="mt-2 text-blue-500 underline">Ubah</button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="row-span-3">
              <div className="rounded-lg border bg-gray-50 p-4">
                <h2 className="mb-4 text-2xl font-medium">Order summary</h2>
                <div className="space-y-4">
                  {/* Item */}
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex border-b pb-4">
                      <img
                        src="/assets/image/Samsung A55.png"
                        alt="Product"
                        className="w-15 h-15"
                      />
                      <div>
                        <p className="font-semibold">Samsung A55 5G</p>
                        <p className="text-sm text-gray-600">Variant: 8/256</p>
                        <p className="text-sm text-gray-600">
                          Color: Awesome Blue
                        </p>
                        {/* <QuantitySelector></QuantitySelector> */}
                      </div>
                      <p className="ml-64 font-semibold">Rp6,500,000</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Masukkan Kode Voucher"
                    className="mb-2 w-full rounded border p-2"
                  />
                  <button className="w-full rounded bg-blue-500 py-2 text-white">
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
            </div>

            {/* Payment Method */}

            <div>
              <div className="rounded-lg border bg-gray-50 p-4">
                <div className="space-y-2">
                  <h2 className="mb-4 text-2xl font-medium">Payment Method</h2>
                  <div>
                    <input
                      type="radio"
                      id="transfer-bank"
                      name="payment-method"
                      className="mr-2"
                    />
                    <label htmlFor="transfer-bank">Transfer Bank</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="cod"
                      name="payment-method"
                      className="mr-2"
                    />
                    <label htmlFor="cod">Cash on Delivery</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Choose Bank */}

            <div>
              <div className="space-y-2 rounded-lg border bg-gray-50 p-4">
                <h2 className="mb-4 text-2xl font-medium">Choose Bank</h2>
                <div className="flex">
                  <img
                    src="/assets/image/mandiri.jpg"
                    alt="Bank Logo"
                    className="mr-3 h-10 w-10"
                  />
                  <input type="radio" name="bank" className="mr-2" />
                  <label className="mt-2">Bank Mandiri</label>
                </div>
                <div className="flex">
                  <img
                    src="/assets/image/bca.png"
                    alt="Bank Logo"
                    className="mr-3 h-10 w-10"
                  />
                  <input type="radio" name="bank" className="mr-2" />
                  <label className="mt-2">Bank BCA</label>
                </div>
                <div className="flex">
                  <img
                    src="/assets/image/seabank.png"
                    alt="Bank Logo"
                    className="mr-3 h-10 w-10"
                  />
                  <input type="radio" name="bank" className="mr-2" />
                  <label className="mt-2">Seabank</label>
                </div>
                <div className="flex">
                  <img
                    src="/assets/image/bni.jpeg"
                    alt="Bank Logo"
                    className="mr-3 h-10 w-10"
                  />
                  <input type="radio" name="bank" className="mr-2" />
                  <label className="mt-2">Bank BNI</label>
                </div>
                <div className="flex">
                  <img
                    src="/assets/image/bri.jpg"
                    alt="Bank Logo"
                    className="mr-3 h-10 w-10"
                  />
                  <input type="radio" name="bank" className="mr-2" />
                  <label className="mt-2">Bank BRI</label>
                </div>
                <div className="flex">
                  <img
                    src="/assets/image/bsi.jpeg"
                    alt="Bank Logo"
                    className="mr-3 h-10 w-10"
                  />
                  <input type="radio" name="bank" className="mr-2" />
                  <label className="mt-2">Bank Syariah Indonesia</label>
                </div>
                <div className="flex">
                  <img
                    src="/assets/image/permata.jpg"
                    alt="Bank Logo"
                    className="mr-3 h-10 w-10"
                  />
                  <input type="radio" name="bank" className="mr-2" />
                  <label className="mt-2">Bank Permata</label>
                </div>
                <div className="flex">
                  <img
                    src="/assets/image/bank.jpg"
                    alt="Bank Logo"
                    className="mr-3 h-10 w-10"
                  />
                  <input type="radio" name="bank" className="mr-2" />
                  <label className="mt-2">Bank Lainnya</label>
                </div>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="mt-6">
            <button className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
