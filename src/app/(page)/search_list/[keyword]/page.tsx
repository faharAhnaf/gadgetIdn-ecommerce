"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Card from "@/components/core/Card/search_list";
import Navbar from "@/components/fragments/Navbar/index";
import Footer from "@/components/fragments/Footer/index";
import SideBar from "@/components/fragments/Sidebar/ProductList"
import searchProductsByName from '@/app/api/search_list/product';
import ProductPreview from '@/app/lib/model/product_review';
import SearchListSkeleton from "@/components/core/Card/SearchListSkeleton";

import "@/app/assets/css/home.css"

export default function Keranjang() {
    const { keyword } = useParams();
    const [products, setProducts] = useState<ProductPreview[]>([]);
    const [filters, setFilters] = useState<any>({
        name: keyword
    });

    const handleFilterSubmit = (newFilters: any) => {
        setFilters(newFilters);
    };

    useEffect(() => {
        const applyFilters = async () => {
            const data = await searchProductsByName(filters);
            setProducts(data);
        };

        if (keyword) {
            applyFilters();
        }
    }, [keyword, filters]);

  return (
    <div>
      <Navbar/>
      <div className="container flex justify-center mx-auto mt-[100px]">
            <div className="flex w-full">
                <div className="w-1/5">
                    <SideBar onSubmitFilters={handleFilterSubmit} params={keyword as string} />
                </div>

                <div className="w-4/5 p-5">

                    <p className="mb-2 font-semibold">Menampilkan 1 - 16 dari total barang untuk "{keyword}"</p>

                    <div className="overflow-y-auto pb-4 max-h-[800px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                
                        {products.length === 0
                            ? Array.from({ length: 3 }).map((_, index) => (
                                <div key={index}>
                                    <SearchListSkeleton />
                                </div>
                                ))
                            : products.map((product, index) => (
                                <Card
                                    key={index}
                                    product_id={product.product_id}
                                    title={product.name}
                                    description={product.description}
                                    price={product.price}
                                    imageUrl={"/assets" + product.image_url}
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