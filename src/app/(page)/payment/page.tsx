"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Navbar from "@/components/fragments/Navbar/index";
import DropdownShipping from "@/components/core/Dropdown/Shipping";
import QuantitySelectorPayment from "@/components/core/Input/QuantitySelectorPayment";
import { handleCheckout } from "@/app/api/transaksi/transaksi";

import removeCartItem from '@/app/api/cart/remove_cart';
import { useRouter } from 'next/navigation';

interface Product {
  cart_id: string;
  product_id: string;
  image_url: string;
  name: string;
  description: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  price: number;
  total_price: number;
}

export default function Checkout() {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const session = localStorage.getItem("userSession");
  const userData = JSON.parse(session!);

  const [products, setProducts] = useState<Product[]>([]);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [selectedShipping, setSelectedShipping] = useState("");
  const [selectedShippingETA, setSelectedETA] = useState("");

  const router = useRouter();

  useEffect(() => {
    const updateProducts = () => {
      const cartData = localStorage.getItem("cartSession");
      if (cartData) {
        const parsedCartData = JSON.parse(cartData);
        setProducts(parsedCartData);
      }
    };

    window.addEventListener("storage", updateProducts);
    updateProducts();

    return () => {
      window.removeEventListener("storage", updateProducts);
    };
  }, []);

  const subtotal = products.reduce(
    (sum, product) => sum + (product.price * product.quantity), 
    0
  );

  const HANDLING_FEE = 1500;
  const SERVICE_COST = 10000;

  const totalOrder = subtotal + shippingCost + HANDLING_FEE + SERVICE_COST;

  const handleShippingSelect = (option: { price: string, name: string, eta: string }) => {
    setShippingCost(parseInt(option.price));
    setSelectedShipping(option.name);
    setSelectedETA(option.eta);
  };

  const handleCheckoutClick = async () => {
    if (!selectedMethod) {
      Swal.fire({
        icon: "warning",
        title: "Empty Payment Method",
        text: "Please select a payment method before proceeding!",
      });
      return;
    }

    if (!shippingCost) {
      Swal.fire({
        icon: "warning",
        title: "Expedition Not Selected",
        text: "Please select an expedition before continuing!",
      });
      return;
    }

    if (products.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Empty Cart",
        text: "There are no products in the cart for checkout",
      });
      return;
    }

    await handleCheckout({
      user_id: userData?.user_id ?? "",
      email: userData?.email ?? "",
      description: "Terima kasih telah berbelanja di toko kami! 😊, Kami sangat menghargai kepercayaan Anda dalam memilih produk kami. Silakan selesaikan pembayaran untuk memproses pesanan Anda segera. Jangan khawatir, proses pembayaran aman dan mudah! 💳, Jika Anda mengalami kesulitan, tim kami siap membantu kapan saja. Selamat berbelanja dan semoga hari Anda menyenangkan! 🌟",
      price: products.map((p) => p.price),
      amount: products.map((p) => p.quantity),
      color: products.map((p) => p.selectedColor),
      variant: products.map((p) => p.selectedSize),
      product_id: products.map((p) => p.product_id),

      shippingName: selectedShipping,
      shippingCost: shippingCost,
      shippingETA: selectedShippingETA,
    });

    const result = await Swal.fire({
      title: "Checkout Successful",
      text: "Want to go to invoice page?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel",
    });

    products.forEach(product => {
      if(product.cart_id && product.cart_id != ""){
        removeCartItem(product.cart_id);
      }
    })

    localStorage.removeItem("cartSession");

    if (result.isConfirmed) {
      router.push('/invoice');
    }

  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto my-24 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-20 text-center">Check Out</h1>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-x-10 gap-y-5">
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

            <div className="row-span-3">
              <div className="p-4 border rounded-lg bg-gray-50">
                <h2 className="text-2xl font-medium mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.cart_id} className="flex border-b pb-4">
                      <img
                        src={"assets" + product.image_url}
                        alt="Product"
                        className="w-[100px] h-[100px]"
                      />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-600">
                          Variant: {product.selectedSize}
                        </p>
                        <p className="text-sm text-gray-600">
                          Color: {product.selectedColor}
                        </p>
                        <QuantitySelectorPayment
                          onQuantityChange={(quantity, price) => {
                            const cartSessions = JSON.parse(localStorage.getItem("cartSession") || "[]");
                            const cartIndex = cartSessions.findIndex((item: any) => item.cart_id === product.cart_id);
                            
                            if (cartIndex > -1) {
                              cartSessions[cartIndex] = {
                                ...cartSessions[cartIndex],
                                quantity: quantity,
                                total_price: price
                              };
                              
                              localStorage.setItem("cartSession", JSON.stringify(cartSessions));
                              window.dispatchEvent(new Event("storage"));
                            }
                          }}
                          cartId={product.cart_id}
                          unitPrice={product.price}
                        />
                      </div>
                      <p className="ml-64 font-semibold">
                        Rp{product.total_price.toLocaleString("id-ID")}
                      </p>
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
                  <hr className="my-2" />
                  <div className="flex justify-between">
                    <span>Subtotal Produk</span>
                    <span>Rp{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal Pelayanan</span>
                    <span>Rp {SERVICE_COST.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Penanganan</span>
                    <span>Rp {HANDLING_FEE.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Expedisi</span>
                    <span>Rp {shippingCost.toLocaleString()}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total Pesanan</span>
                    <span>Rp {totalOrder.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 row-span-4">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold"
                >
                  Checkout
                </button>
              </div>
            </div>

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
                    <label htmlFor="transfer-bank">Cashless</label>
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

              {selectedMethod === "transfer" && (
                <div className="mt-4">
                  <DropdownShipping onShippingSelect={handleShippingSelect} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};