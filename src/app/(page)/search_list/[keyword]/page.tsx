"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Card from "@/components/core/Card/search_list";
import Navbar from "@/components/fragments/Navbar/Navbar";
import Footer from "@/components/fragments/Footer/Footer";
import SideBar from "@/components/fragments/Sidebar/ProductList";
import searchProductsByName from '@/app/api/search_list/product';
import ProductPreview from '@/app/lib/model/product_review';
import SearchListSkeleton from "@/components/core/Skeleton/SearchListSkeleton";

import "@/app/assets/css/home.css";

export default function Keranjang() {
  const { keyword } = useParams();
  const [products, setProducts] = useState<ProductPreview[]>([]);
  const [filters, setFilters] = useState<any>({
    name: keyword
  });
  const [loading, setLoading] = useState(true);
  const [noItems, setNoItems] = useState(false);

  const handleFilterSubmit = (newFilters: any) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      setNoItems(false);
      const data = await searchProductsByName(filters);
      setProducts(data);
      setLoading(false);
    };

    if (keyword) {
      applyFilters();
    }
  }, [keyword, filters]);

  useEffect(() => {
    if (loading) {
      
      if (products.length == 0) {
        const timer = setTimeout(() => {
          setNoItems(true);
        }, 4000);
        return () => clearTimeout(timer);
      }

    }
  }, [loading, products, keyword]);

  return (
    <div>
      <Navbar />
      <div className="container flex justify-center mx-auto mt-[100px] mb-5">
        <div className="flex w-full">
          <div className="w-1/5">
            <SideBar onSubmitFilters={handleFilterSubmit} params={keyword as string} />
          </div>

          <div className="w-4/5 p-5">
            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index}>
                    <SearchListSkeleton />
                  </div>
                ))}
              </div>
            ) : noItems ? (
              <div className="h-[400px]">
                <p className="text-center text-gray-500 mt-10">No items match</p>
              </div>
            ) : (
              <div>
                {
                  loading ? '' : products.length === 0 ? (
                      <div className="h-[400px]">
                        <p className="text-center text-gray-500 mt-10">No items match</p>
                      </div>
                  ) : (
                    <p className="mb-2 font-semibold">
                      `Menampilkan 1 - {products.length} dari total barang untuk "Seluruh Kategori"`
                    </p>
                  )
                }


                <div className="overflow-y-auto pb-4 max-h-[800px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product, index) => (
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
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}