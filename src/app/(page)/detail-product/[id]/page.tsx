"use client"

import React, { useState, useEffect } from "react";
import "@/app/assets/css/detail_produk.css";
import "@/app/assets/css/skeleton-loading.css";

import QuantitySelector from "@/components/core/Input/QuantitySelector";
import formatRupiah from "@/app/lib/format_money"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import Swal from 'sweetalert2';

import { useRouter, useParams } from 'next/navigation';
import { getProductByProductId } from "@/app/api/detail_product";
import { handleCheckout } from "@/app/api/transaksi/transaksi"

import addCartItem from '@/app/api/cart/add_cart';
import Product from '@/app/lib/model/product'

const SkeletonText = ({ width }: { width: string }) => (
    <span className="skeleton-loading" style={{ width }}></span>
  );

export default function DetailProduct() {
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();
    const { id } = useParams();
  
    useEffect(() => {
      const fetchProduct = async () => {
        
        if (id) {
          const fetchedProduct = await getProductByProductId(id as string);
         
          if (fetchedProduct) {
            setProduct(fetchedProduct);
            console.log(fetchedProduct);
            
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Product Not Found`,
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                router.push('/');
              }
            });
          }
        }
      };
  
      fetchProduct();

    }, [id, router]);

    const session = localStorage.getItem("userSession");
    const userData = JSON.parse(session!);

    const handleAddToCart = async () => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "Are you sure you want to add to cart?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, add it!",
          cancelButtonText: "Cancel",
        });
    
        if (result.isConfirmed) {
          await addCartItem(userData.user_id, id as string, product!.price, 1);
          router.push('/keranjang');
        }
  
      } catch (error) {
        Swal.fire("Failed", "Failed to remove the item from the cart.", "error");
      }
    };

    const handleQuantityChange = (newQuantity: number) => {
      setQuantity(newQuantity); 
    };
    
  return (
    <div>

      <Link href="/" className='fixed top-10 left-7 flex items-center cursor-pointer'>
        <FontAwesomeIcon icon={faArrowLeft} className="text-gray-700 text-2xl hover:text-black" />
        {/* <p className='ml-3'>Back</p> */}
      </Link>

      <div className="bg-[#f4f1eb] min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl flex flex-col md:flex-col w-full max-w-screen-xl">

            <div className="flex flex-col md:flex-row">
                <div className="p-4 md:p-6 flex justify-center">
                    <img
                        src="/assets/image/detail_produk.png"
                        alt="Detail Produk"
                        className="w-[500px] md:w-[500px] rounded-md h-auto mx-auto"
                    />
                </div>

                <div className="p-4 md:p-6 flex-1 overflow-y-auto max-h-screen md:max-h-[600px]">
                    <div className="flex flex-col mb-2">
                        <span className="bg-red-500 text-white text-xs max-w-min font-semibold px-2 py-1 mb-3 rounded-full">
                        HOTSALE
                        </span>
                        <h1 className="text-xl md:text-2xl font-bold">
                            {product ? product.name : <SkeletonText width="50%" />}
                        </h1>
                    </div>

                    <p className="text-gray-500 text-sm mb-5">
                        {product ? `${product.category?.name} | ⭐️ 4.9 (2130 reviews) | ${formatRupiah(product.price)}` : <SkeletonText width="70%" />}
                    </p>

                    <h1 className="text-lg font-semibold">Description :</h1>

                    <div className="mt-2 space-y-2 text-justify text-gray-700 text-sm md:text-base">
                        {product ? product.description : <SkeletonText width="90%" />}
                    </div>

                    <div className="mt-6 flex flex-col bg-white shadow-md p-4 rounded-lg border border-gray-200">
                        <div className='flex justify-between mb-3'>
                            <div className="flex items-center space-x-4">
                                <img
                                src="/assets/image/seller.png"
                                alt="Store Logo"
                                className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-md font-semibold">Reza Store</span>
                                        <span className="bg-green-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-md"><FontAwesomeIcon icon={faCheck} className="text-white" />
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-green-500 text-sm font-semibold">• Online</span>
                                    </div>
                                </div>
                            </div>

                            <button className="px-4 py-1 border border-green-500 text-green-500 font-semibold rounded-lg hover:bg-green-50">
                                Follow
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-gray-500 text-sm space-x-1">
                                <span>⭐️ 5.0</span>
                                <span>(8 rb)</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm space-x-1">
                                <span>⏱️ ± 1 jam</span>
                                <span>pesanan diproses</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-lg font-semibold">Select Size:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                        <button className="px-4 py-2 bg-[#f9f7f3] text-[#a7a39b] font-semibold rounded-md mb-2">
                            8/128
                        </button>
                        <button className="px-4 py-2 bg-transparent border-2 border-[#e2dfd9] text-gray-800 font-semibold rounded-md mb-2">
                            8/256
                        </button>
                        <button className="px-4 py-2 bg-transparent border-2 border-[#e2dfd9] text-gray-800 font-semibold rounded-md mb-2">
                            4/128
                        </button>
                        <button className="px-4 py-2 bg-transparent border-2 border-[#e2dfd9] text-gray-800 font-semibold rounded-md mb-2">
                            4/256
                        </button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-lg font-semibold">Select Color:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                        <button className="px-4 py-2 bg-[#f9f7f3] text-[#a7a39b] font-semibold rounded-md mb-2">
                            Gray
                        </button>
                        <button className="px-4 py-2 bg-transparent border-2 border-[#e2dfd9] font-semibold rounded-md mb-2">
                            Black
                        </button>
                        <button className="px-4 py-2 bg-transparent border-2 border-[#e2dfd9] font-semibold rounded-md mb-2">
                            White
                        </button>
                        <button className="px-4 py-2 bg-transparent border-2 border-[#e2dfd9] font-semibold rounded-md mb-2">
                            Blue
                        </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="md:left-20 md:right-20 bg-white shadow-md p-4 md:p-6 sm:px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8 rounded-b-xl overflow-x-auto">
                <div className="flex items-center space-x-4 flex-shrink-0">
                    <img
                        src="/assets/image/detail_produk.png"
                        alt="Whiskas Cat Food Thumbnail"
                        className="w-12 h-12 rounded-md"
                    />
                    <div className="text-center md:text-left">
                        <p className="font-semibold text-sm md:text-base">{product ? product.name : <SkeletonText width="150px" />}</p>
                        <p className="text-xs md:text-sm text-blue-400 font-semibold">{product ? `${product!.category!.name} | ${product!.quantityInStock}`  : <SkeletonText width="75px" />}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4 flex-shrink-0">
                    <span className="text-gray-700 font-semibold text-sm md:text-base">Qty:</span>
                    
                    <QuantitySelector onQuantityChange={handleQuantityChange} />

                    <button 
                        onClick={() => handleCheckout({
                          user_id: userData?.user_id ?? "", 
                          email: userData?.email ?? "", 
                          price: product ? [product.price] : [0],
                          amount: [quantity],
                          description: product ? product.description : "",
                          product_id: product ? [product.product_id] : ['0'],
                        })}
                        className="px-4 py-2 border border-blue-500 text-blue-500 font-semibold rounded-md text-xs md:text-sm hover:bg-blue-500 hover:text-white duration-300">
                        CHECKOUT
                    </button>

                    <button 
                        onClick={() => handleAddToCart()}
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md text-xs md:text-sm hover:bg-blue-700">
                        ADD TO CART
                    </button>
                </div>
            </div>
            
        </div>
      </div>

    </div>
  );
};