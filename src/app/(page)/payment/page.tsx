"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Navbar from "@/components/fragments/Navbar/Navbar";
import DropdownShipping from "@/components/core/Dropdown/ShippingDropdown";
import QuantitySelectorPayment from "@/components/core/Input/QuantitySelectorPayment";
import { handleCheckout } from "@/app/api/transaksi/transaksi";

import { getProfileByUserId } from "@/app/api/profile/profile";
import { PhoneInput } from "@/components/ui/phone-input";
import removeCartItem from "@/app/api/cart/remove-cart";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [selectedShipping, setSelectedShipping] = useState("");
  const [selectedShippingETA, setSelectedETA] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [alamat, setAlamat] = useState({
    nama: "Nama Penerima",
    nomor: "+6288888888888",
    detail:
      "Jl. Moch Kahfi II Gg. Suro, Cipedak, Kec. Jagakarsa, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta, ID 12630.",
  });

  const [formInput, setFormInput] = useState(alamat);
  const [session, setSession] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const handleUbah = () => {
    setIsEditing(true);
  };

  const handleSimpan = () => {
    setAlamat(formInput);
    setIsEditing(false);
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
  }, []);

  useEffect(() => {
    const updateProducts = () => {
      if (typeof window !== "undefined") {
        const cartData = localStorage.getItem("cartSession");
        if (cartData) {
          try {
            const parsedCartData = JSON.parse(cartData);
            setProducts(parsedCartData);
          } catch (error) {
            console.error("Error parsing cart data:", error);
          }
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", updateProducts);
      updateProducts();

      return () => {
        window.removeEventListener("storage", updateProducts);
      };
    }
  }, []);

  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const HANDLING_FEE = 1500;
  const SERVICE_COST = 1000;

  const totalOrder = subtotal + shippingCost + HANDLING_FEE + SERVICE_COST;

  const handleShippingSelect = (option: {
    price: string;
    name: string;
    eta: string;
  }) => {
    setShippingCost(parseInt(option.price));
    setSelectedShipping(option.name);
    setSelectedETA(option.eta);
  };

  const handleDefault = async () => {
    try {
      if (!userData?.user_id) {
        Swal.fire({
          icon: "error",
          title: "ID Pengguna Tidak Ditemukan",
          text: "Tidak dapat mengambil profil. Silakan login terlebih dahulu.",
        });
        return;
      }

      const profile = await getProfileByUserId(userData.user_id);

      if (profile) {
        setFormInput({
          nama: profile.name || "Nama Penerima",
          nomor: profile.phone || "(+62) 888-8888-8888",
          detail: profile.location || "Alamat lengkap",
        });

        Swal.fire({
          icon: "success",
          title: "Profil Dimuat",
          text: "Profil default telah berhasil dimuat.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat profil default. Silakan coba lagi.",
      });
    }
  };

  const handleCheckoutClick = async () => {
    if (!selectedMethod) {
      Swal.fire({
        icon: "warning",
        title: "Metode Pembayaran Kosong",
        text: "Silakan pilih metode pembayaran sebelum melanjutkan!",
      });
      return;
    }

    if (!shippingCost) {
      Swal.fire({
        icon: "warning",
        title: "Ekspedisi Belum Dipilih",
        text: "Silakan pilih ekspedisi sebelum melanjutkan!",
      });
      return;
    }

    if (products.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Keranjang Kosong",
        text: "Tidak ada produk di keranjang untuk checkout",
      });
      return;
    }

    // Jika metode pembayaran adalah COD (Bayar di Tempat), langsung proses transaksi
    if (selectedMethod === "cod") {
      try {
        Swal.fire({
          title: "Memproses pesanan",
          text: "Mohon Tunggu",
          icon: "info",
          allowOutsideClick: false,
          showConfirmButton: false
        });

        const timestamp = Date.now();
        const transaksiId = `cod-${timestamp}`;
    
        // Buat data transaksi untuk COD dengan format yang konsisten
        const data = {
          ekspedisi_id: doc(db, "ekspedisi", "Oz52qy0DaKJ5V8xmKtLd"), // Gunakan reference, bukan string
          product_id: products.map((p) => doc(db, "product", p.product_id)), // Gunakan reference, bukan string
          user_id: userData?.user_id ?? "",
          recipient: alamat.nama ?? "",
          telepon: alamat.nomor ?? "",
          address: alamat.detail ?? "",
          transaksi_id: transaksiId,
    
          payer_email: userData?.email ?? "",
          payment_channel: "COD",
          payment_method: "CASH_ON_DELIVERY",
    
          paid_amount: totalOrder, // Total harga yang harus dibayar
          current_price: products.map((p) => p.price),
          amount: products.map((p) => p.quantity),
          color: products.map((p) => p.selectedColor),
          variant: products.map((p) => p.selectedSize),
          totalQuantity: products.reduce((sum, p) => sum + p.quantity, 0),
    
          shippingName: selectedShipping,
          shippingCost: shippingCost,
          shippingETA: selectedShippingETA,
    
          serviceFee: SERVICE_COST,
          handlingFee: HANDLING_FEE,
    
          status: "PROCESSING", // Status awal untuk COD
          confirmed: false, // Tambahkan properti confirmed
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
    
        console.log("Saving COD transaction data:", data);
        
        // Simpan transaksi ke Firestore
        const docRef = doc(db, "transaksi", transaksiId);
        await setDoc(docRef, data);
        
        console.log("Transaction saved with ID:", transaksiId);
    
        // Hapus item dari keranjang
        for (const product of products) {
          if (product.cart_id && product.cart_id !== "") {
            await removeCartItem(product.cart_id);
          }
        }
    
        // Hapus sesi keranjang dari localStorage
        localStorage.removeItem("cartSession");
    
        // Tutup SweetAlert sebelumnya
        Swal.close();
    
        // Tampilkan pesan sukses dan alihkan ke halaman invoice
        await Swal.fire({
          title: "Pesanan Berhasil!",
          text: "Pesanan Anda telah berhasil dibuat. Kurir akan menghubungi Anda untuk konfirmasi dan pembayaran saat barang tiba.",
          icon: "success",
          confirmButtonText: "Lihat Riwayat Transaksi",
        });
    
        // Alihkan ke halaman invoice dengan delay yang lebih lama
        setTimeout(() => {
          window.location.href = "/invoice";
        }, 1000);
      } catch (error) {
        console.error("Error saat checkout COD:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.",
        });
      }
    } else {
      // Untuk metode pembayaran non-tunai, gunakan handleCheckout yang sudah ada
      await handleCheckout({
        user_id: userData?.user_id ?? "",
        email: userData?.email ?? "",
        recipient: alamat.nama ?? "",
        telepon: alamat.nomor ?? "",
        address: alamat.detail ?? "",
        description:
          "Terima kasih telah berbelanja di toko kami! 😊, Kami sangat menghargai kepercayaan Anda dalam memilih produk kami. Silakan selesaikan pembayaran untuk memproses pesanan Anda segera. Jangan khawatir, proses pembayaran aman dan mudah! 💳, Jika Anda mengalami kesulitan, tim kami siap membantu kapan saja. Selamat berbelanja dan semoga hari Anda menyenangkan! 🌟",
        price: products.map((p) => p.price),
        amount: products.map((p) => p.quantity),
        color: products.map((p) => p.selectedColor),
        variant: products.map((p) => p.selectedSize),
        product_id: products.map((p) => p.product_id),
        cart_id: products.map((p) => p.cart_id),

        shippingName: selectedShipping,
        shippingCost: shippingCost,
        shippingETA: selectedShippingETA,
      });
    }
  };

  // Memindahkan akses localStorage ke dalam fungsi yang aman
  const updateCartItem = (cartId: string, quantity: number, price: number) => {
    if (typeof window !== "undefined") {
      try {
        const cartSessions = JSON.parse(
          localStorage.getItem("cartSession") || "[]",
        );
        const cartIndex = cartSessions.findIndex(
          (item: any) => item.cart_id === cartId,
        );

        if (cartIndex > -1) {
          cartSessions[cartIndex] = {
            ...cartSessions[cartIndex],
            quantity: quantity,
            total_price: price,
          };

          localStorage.setItem("cartSession", JSON.stringify(cartSessions));
          window.dispatchEvent(new Event("storage"));
        }
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    }
  };

  return (
    <div className="">
      <div className="flex min-h-screen justify-center bg-gray-100">
        <div className="m-10 w-full rounded-lg bg-white p-4 shadow-lg sm:p-6">
          <h1 className="my-3 text-center text-2xl font-bold sm:my-10 sm:text-3xl">
            Checkout
          </h1>

          <div className="grid gap-4 sm:gap-6 md:gap-x-10 md:gap-y-5 lg:grid-cols-2">
            <div>
              <div className="rounded-lg border bg-gray-50 p-4 shadow-md sm:p-6">
                <h2 className="mb-4 text-xl font-medium sm:text-2xl">
                  Alamat Pengiriman
                </h2>
                {!isEditing ? (
                  <div className="space-y-2">
                    <p className="font-semibold">{alamat.nama}</p>
                    <p>{alamat.nomor}</p>
                    <p className="text-sm sm:text-base">{alamat.detail}</p>
                    <button
                      onClick={handleUbah}
                      className="mt-2 text-blue-500 underline hover:text-blue-700"
                    >
                      Ubah
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label
                        className="mb-2 block font-semibold"
                        htmlFor="nama"
                      >
                        Nama Penerima
                      </label>
                      <input
                        id="nama"
                        type="text"
                        value={formInput.nama}
                        onChange={(e) =>
                          setFormInput((prev) => ({
                            ...prev,
                            nama: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label
                        className="mb-2 block font-semibold"
                        htmlFor="nomor"
                      >
                        Nomor Telepon
                      </label>
                      <PhoneInput
                        className="w-full"
                        maxLength={13}
                        limitMaxLength
                        defaultCountry="ID"
                        id="nomor"
                        value={formInput.nomor}
                        onChange={(value) => {
                          setFormInput((prev) => ({
                            ...prev,
                            nomor: value,
                          }));
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="mb-2 block font-semibold"
                        htmlFor="detail"
                      >
                        Alamat Lengkap
                      </label>
                      <textarea
                        id="detail"
                        value={formInput.detail}
                        onChange={(e) =>
                          setFormInput((prev) => ({
                            ...prev,
                            detail: e.target.value,
                          }))
                        }
                        rows={4}
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        onClick={handleSimpan}
                        className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                      >
                        Simpan
                      </button>

                      <button
                        onClick={handleDefault}
                        className="rounded-lg border border-blue-500 px-4 py-2 text-blue-500 shadow hover:bg-blue-500 hover:text-white"
                      >
                        Profil Default
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="order-first lg:order-none lg:row-span-3">
              <div className="rounded-lg border bg-gray-50 p-4">
                <h2 className="mb-4 text-xl font-medium sm:text-2xl">
                  Ringkasan Pesanan
                </h2>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.cart_id}
                      className="flex flex-col space-y-2 border-b pb-4 sm:flex-row sm:space-x-2 sm:space-y-0"
                    >
                      <div className="mx-auto w-24 sm:mx-0">
                        <img
                          src={product.image_url}
                          alt="Produk"
                          className="h-[80px] w-[80px]"
                        />
                      </div>

                      <div className="w-full">
                        <div className="flex flex-col justify-between sm:flex-row">
                          <p className="font-semibold">{product.name}</p>
                          <p className="font-semibold">
                            Rp{product.total_price.toLocaleString("id-ID")}
                          </p>
                        </div>

                        <p className="text-sm text-gray-600">
                          Varian: {product.selectedSize}
                        </p>

                        <p className="mb-3 text-sm text-gray-600">
                          Warna: {product.selectedColor}
                        </p>

                        <QuantitySelectorPayment
                          onQuantityChange={(quantity, price) => {
                            updateCartItem(product.cart_id, quantity, price);
                          }}
                          cartId={product.cart_id}
                          unitPrice={product.price}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm">
                  <hr className="my-2" />
                  <div className="flex justify-between">
                    <span>Subtotal Produk</span>
                    <span>Rp{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal Layanan</span>
                    <span>Rp {SERVICE_COST.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Penanganan</span>
                    <span>Rp {HANDLING_FEE.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Pengiriman</span>
                    <span>Rp {shippingCost.toLocaleString()}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total Pesanan</span>
                    <span>Rp {totalOrder.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white"
                >
                  Checkout
                </button>
              </div>
            </div>

            <div>
              <div className="rounded-lg border bg-gray-50 p-4">
                <div className="space-y-2">
                  <h2 className="mb-4 text-xl font-medium sm:text-2xl">
                    Metode Pembayaran
                  </h2>
                  <div>
                    <input
                      type="radio"
                      id="transfer-bank"
                      name="payment-method"
                      className="mr-2"
                      value="transfer"
                      onChange={(e) => setSelectedMethod(e.target.value)}
                    />
                    <label htmlFor="transfer-bank">Non Tunai</label>
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
                    <label htmlFor="cod">Bayar di Tempat</label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <DropdownShipping onShippingSelect={handleShippingSelect} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
