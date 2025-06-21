"use client";

import React, { useState, useEffect } from "react";
import "@/app/assets/css/detail_produk.css";
import "@/app/assets/css/skeleton-loading.css";
import QuantitySelector from "@/components/core/Input/QuantitySelector";
import Swal from "sweetalert2";
import { useRouter, useParams } from "next/navigation";
import { getProductByProductId } from "@/app/api/product/detail-product";
import Image from "next/image";
import addCartItem from "@/app/api/cart/add-cart";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import Product from "@/interfaces/product";
import CartItem from "@/interfaces/cart-item";
import formatRupiah from "@/utils/format-money";

const SkeletonText = ({ width }: { width: string }) => (
  <span className="skeleton-loading" style={{ width }}></span>
);

const SkeletonImg = ({ width, height }: { width: string; height: string }) => (
  <div className="skeleton-loading" style={{ width, height }}></div>
);

export default function DetailProduct() {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [userData, setUserData] = useState<any>(null);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    // Get user session safely
    const session =
      typeof window !== "undefined"
        ? localStorage.getItem("userSession")
        : null;
    if (session) {
      try {
        setUserData(JSON.parse(session));
      } catch {
        setUserData(null);
      }
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const fetchedProduct = await getProductByProductId(id as string);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          showSwalError("Product Not Found", () => router.push("/"));
        }
      }
    };
    fetchProduct();
  }, [id, router]);

  const showSwalError = (text: string, callback?: () => void) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text,
      confirmButtonText: "OK",
    }).then((result) => {
      if ((result.isConfirmed || result.isDismissed) && callback) {
        callback();
      }
    });
  };

  const handleAddToCart = async () => {
    if (!userData) {
      showSwalError("Pengguna belum login", () => router.push("/auth/sign-in"));
      return;
    }
    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda yakin ingin menambah ke keranjang?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, tambahkan!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        if (selectedSize && selectedColor && product) {
          await addCartItem(
            userData.user_id,
            id as string,
            product.price,
            quantity,
            selectedSize,
            selectedColor,
          );
          router.push("/keranjang");
        } else {
          showSwalError("Silakan pilih warna dan ukuran terlebih dahulu");
        }
      }
    } catch (error) {
      showSwalError("Gagal menambah barang ke keranjang.");
    }
  };

  const handleQuantityChange = (newQuantity: number) =>
    setQuantity(newQuantity);
  const handleSizeSelect = (size: string) => setSelectedSize(size);
  const handleColorSelect = (color: string) => setSelectedColor(color);

  const handleProceedToPayment = async () => {
    if (!product) {
      showSwalError("Data produk belum selesai dimuat. Mohon tunggu sebentar");
      return;
    }
    if (!selectedColor || !selectedSize) {
      showSwalError("Silakan pilih warna dan ukuran terlebih dahulu");
      return;
    }

    const selectedCartItems: CartItem[] = [
      {
        cart_id: "",
        product_id: product.product_id,
        image_url: product.image_url,
        name: product.name,
        description: product.description,
        selectedColor,
        selectedSize,
        quantity,
        price: product.price,
        total_price: product.price * quantity,
      },
    ];

    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda yakin ingin checkout keranjang Anda?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, checkout!",
        cancelButtonText: "Batal",
      });

      if (selectedCartItems.length > 0 && result.isConfirmed) {
        localStorage.setItem("cartSession", JSON.stringify(selectedCartItems));
        router.push("/payment");
        console.log(
          "Barang yang dipilih disimpan ke localStorage:",
          selectedCartItems,
        );
      } else if (selectedCartItems.length === 0) {
        showSwalError("Tidak ada barang yang cocok ditemukan");
      }
    } catch (error) {
      showSwalError("Gagal melanjutkan ke pembayaran.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-white p-4 md:p-8">
        <div className="flex w-full items-start">
          <Button
            variant={"ghost"}
            onClick={() => router.back()}
            className="flex cursor-pointer items-center justify-start rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
            Beranda
          </Button>
        </div>

        <div className="flex w-full flex-col rounded-xl bg-white shadow-md md:flex-col">
          <div className="flex flex-col md:flex-row">
            <div className="flex justify-center p-4 md:p-6">
              {product ? (
                <Image
                  src={product!.image_url}
                  width={500}
                  height={500}
                  priority
                  alt="Detail Produk"
                  className="rounded-md object-contain"
                />
              ) : (
                <SkeletonImg width="500px" height="500px" />
              )}
            </div>

            <div className="max-h-screen flex-1 overflow-y-auto p-4 md:max-h-[600px] md:p-6">
              <div className="mb-4 flex flex-col">
                <h1 className="text-xl font-bold md:text-2xl">
                  {product ? product.name : <SkeletonText width="50%" />}
                </h1>
              </div>

              <p className="mb-5 text-sm text-gray-500">
                {product ? (
                  `${product.category} | ${formatRupiah(product.price)}`
                ) : (
                  <SkeletonText width="70%" />
                )}
              </p>

              <h1 className="text-lg font-semibold">Deskripsi :</h1>

              <div className="mt-2 space-y-2 text-justify text-sm text-gray-700 md:text-base">
                {product ? product.description : <SkeletonText width="90%" />}
              </div>

              <div className="mt-8">
                <p className="text-lg font-semibold">Pilih Ukuran:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product
                    ? product.variant?.map((variant, index) => (
                        <button
                          key={index}
                          onClick={() => handleSizeSelect(variant)}
                          className={`mb-2 rounded-md px-4 py-2 font-semibold ${
                            selectedSize === variant
                              ? "bg-blue-500 text-white"
                              : "border border-gray-300 bg-transparent text-gray-800 hover:border-blue-500"
                          }`}
                        >
                          {variant}
                        </button>
                      ))
                    : Array.from({ length: 3 }).map((_, index) => (
                        <div key={index}>
                          <div className="h-8 w-[100px] rounded-md bg-gray-300"></div>
                        </div>
                      ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-lg font-semibold">Pilih Warna:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product
                    ? product.color?.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => handleColorSelect(color)}
                          className={`mb-2 rounded-md px-4 py-2 font-semibold ${
                            selectedColor === color
                              ? "bg-blue-500 text-white"
                              : "border border-gray-300 bg-transparent text-gray-800 hover:border-blue-500"
                          }`}
                        >
                          {color}
                        </button>
                      ))
                    : Array.from({ length: 3 }).map((_, index) => (
                        <div key={index}>
                          <div className="h-8 w-[100px] rounded-md bg-gray-300"></div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between space-y-4 overflow-x-auto rounded-b-xl border-t border-gray-100 bg-white p-4 sm:px-4 md:left-20 md:right-20 md:flex-row md:space-x-8 md:space-y-0 md:p-6">
            <div className="flex flex-shrink-0 items-center space-x-4">
              {product ? (
                <img
                  src={product!.image_url}
                  alt="Detail Produk"
                  className="h-[50px] w-[50px] rounded-md border border-gray-200 object-cover"
                />
              ) : (
                <SkeletonImg width="50px" height="50px" />
              )}
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold md:text-base">
                  {product ? product.name : <SkeletonText width="150px" />}
                </p>
                <p className="text-xs font-semibold text-blue-500 md:text-sm">
                  {product ? (
                    `${product!.category} | Stok: ${product!.quantityInStock}`
                  ) : (
                    <SkeletonText width="75px" />
                  )}
                </p>
              </div>
            </div>

            <div className="grid flex-shrink-0 items-center gap-5 lg:flex">
              <div className="mx-auto flex items-center gap-3 lg:justify-between">
                <span className="text-sm font-semibold text-gray-700 md:text-base">
                  Jumlah:
                </span>

                <QuantitySelector onQuantityChange={handleQuantityChange} />
              </div>

              <div className="flex w-full items-center justify-between gap-5">
                <button
                  onClick={() => handleProceedToPayment()}
                  className="rounded-md border border-blue-500 px-6 py-2 text-xs font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white md:text-sm"
                >
                  BAYAR
                </button>

                <button
                  onClick={() => handleAddToCart()}
                  className="rounded-md bg-blue-500 px-6 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-blue-600 md:text-sm"
                >
                  TAMBAH KE KERANJANG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
