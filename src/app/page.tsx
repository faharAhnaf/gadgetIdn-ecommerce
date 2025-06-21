"use client";

import "@/app/assets/css/home.css";
import Navbar from "@/components/fragments/Navbar/Navbar";
import Footer from "@/components/fragments/Footer/Footer";
import HeaderSection from "@/components/fragments/HeaderSection/HeaderSection";
import Card from "@/components/core/Card/Card";
import { useEffect, useState } from "react";
import ProductPreview from "@/interfaces/product-preview";
import searchProductsByName from "./api/search-list/product";
import { useSearchProduct } from "../stores/search";
import CardSkeleton from "@/components/core/Skeleton/CardSkeleton";

export default function Home() {
  const [products, setProducts] = useState<ProductPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [noItems, setNoItems] = useState(false);
  const { text } = useSearchProduct();

  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      setNoItems(false);
      const data = await searchProductsByName(text);
      if (!data || data.length === 0) {
        setNoItems(true);
      } else {
        setNoItems(false);
      }
      setProducts(data);
      setLoading(false);
    };

    applyFilters();
  }, [text]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar></Navbar>

      <div className="my-36 flex flex-1 lg:my-24">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div>
            <HeaderSection
              title={"PRODUK KITA"}
              subtitle={"Hari Ini"}
              link={"Ini Link"}
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              ) : noItems ? (
                <div className="col-span-3 text-center">
                  <h2 className="text-2xl font-bold text-gray-700">
                    Tidak ada produk yang ditemukan
                  </h2>
                </div>
              ) : (
                products.map((product, i) => {
                  return (
                    <Card
                      key={product.product_id}
                      product_id={product.product_id}
                      title={product.name}
                      description={product.description}
                      price={product.price}
                      imageUrl={product.image_url}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
