"use client"

import Link from "next/link";
import Card from "@/components/core/Card/search_list";
import Navbar from "@/components/fragments/Navbar/index";
import Footer from "@/components/fragments/Footer/index";

import "@/app/assets/css/home.css"

const productData = [
    {
      product_id: "1",
      title: "REALME 6PRO 4G 8/128",
      description: "Handphone berkualitas dengan harga terjangkau.",
      price: 3958000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "2",
      title: "SAMSUNG Galaxy A52 5G",
      description: "Smartphone terbaru dengan konektivitas 5G.",
      price: 5200000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "3",
      title: "iPhone 12 Mini",
      description: "Ukuran kecil, performa besar.",
      price: 8000000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "4",
      title: "OPPO Reno 5",
      description: "Kamera terbaik untuk fotografi mobile.",
      price: 4200000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "5",
      title: "Xiaomi Redmi Note 10",
      description: "Baterai tahan lama dengan harga ekonomis.",
      price: 2300000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "6",
      title: "Vivo V21",
      description: "Desain stylish dengan performa andal.",
      price: 3800000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "7",
      title: "Asus Zenfone 8",
      description: "Flagship compact untuk performa tinggi.",
      price: 9000000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "8",
      title: "Huawei P30 Pro",
      description: "Smartphone dengan zoom kamera terbaik.",
      price: 7500000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "9",
      title: "Infinix Hot 10",
      description: "Smartphone terjangkau dengan performa baik.",
      price: 1800000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "10",
      title: "OnePlus Nord",
      description: "Performa kelas menengah dengan fitur premium.",
      price: 5500000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "11",
      title: "Sony Xperia 5",
      description: "Pengalaman multimedia terbaik dalam genggaman.",
      price: 10500000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "12",
      title: "Nokia 5.4",
      description: "Desain klasik dengan teknologi modern.",
      price: 2200000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "13",
      title: "Realme Narzo 20",
      description: "Baterai besar dengan harga murah.",
      price: 2100000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "14",
      title: "LG Velvet",
      description: "Desain unik dengan performa mumpuni.",
      price: 6800000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "15",
      title: "Motorola Moto G30",
      description: "Kamera 64MP dengan harga terjangkau.",
      price: 2700000,
      imageUrl: "assets/image/example_product.png",
    },
    {
      product_id: "16",
      title: "Realme C25",
      description: "Baterai tahan lama untuk pemakaian seharian.",
      price: 1800000,
      imageUrl: "assets/image/example_product.png",
    },
  ];

export default function Keranjang() {

  return (
    <div>
      <Navbar/>
      <div className="container flex justify-center mx-auto mt-[100px]">
            <div className="flex w-full">
                <div className="w-1/5">
                    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start h-full max-h-[800px]">

                        <div className="mb-4 pt-4">
                            <h2 className="font-semibold text-lg mb-2">Kategori</h2>
                            <div className="ml-4 space-y-2">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Fashion
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Elektronik
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Otomotif
                            </label>
                            </div>
                        </div>

                        <div className="mb-4 border-t w-full pt-4">
                            <h2 className="font-semibold text-lg mb-2">Lokasi</h2>
                            <div className="ml-4 space-y-2">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Jakarta Selatan
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Bandung
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Bogor
                            </label>
                            </div>
                        </div>

                        <div className="mb-4 border-t w-full pt-4">
                            <h2 className="font-semibold text-lg mb-2">Kondisi</h2>
                            <div className="ml-4 space-y-2">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Brand New
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Second Hand
                            </label>
                            </div>
                        </div>

                        <div className="border-t w-full pt-4">
                            <h2 className="font-semibold text-lg mb-2">Penilaian Product</h2>
                            <div className="ml-4">
                            <label className="flex items-center mb-1">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-yellow-500">⭐</span> 5 Keatas
                            </label>
                            <label className="flex items-center mb-1">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-yellow-500">⭐</span> 4 Keatas
                            </label>
                            <label className="flex items-center mb-1">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-yellow-500">⭐</span> 3 Keatas
                            </label>
                            <label className="flex items-center mb-1">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-yellow-500">⭐</span> 2 Keatas
                            </label>
                            <label className="flex items-center mb-1">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-yellow-500">⭐</span> 1 Keatas
                            </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-4/5 p-5">

                    <p className="mb-2 font-semibold">Menampilkan 1 - 16 dari total barang untuk "Realme"</p>

                    <div className="overflow-y-auto pb-4 max-h-[800px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {productData.map((product) => (
                            <Card
                                key={product.product_id}
                                product_id={product.product_id}
                                title={product.title}
                                description={product.description}
                                price={product.price}
                                imageUrl={product.imageUrl}
                            />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>


      <Footer/>
    </div>
  );
}