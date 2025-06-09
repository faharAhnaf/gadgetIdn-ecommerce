"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import formatRupiah from "@/utils/format-money";
import Image from "next/image";

interface ProductCardProps {
  product_id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Card: React.FC<ProductCardProps> = ({
  product_id,
  title,
  description,
  price,
  imageUrl,
}) => {
  const id = `/detail-product/${product_id}`;
  const router = useRouter();

  const [session, setSession] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

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

  const handleAddToCart = async () => {
    !session ? router.push("/auth/sign-in") : router.push(id);
  };

  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-4 shadow-lg">
      {/* Image container with fixed aspect ratio */}
      <div className="relative mb-4 w-full pt-[100%]">
        <Image
          fill
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full rounded-md object-cover"
        />
      </div>

      {/* Content container with flex-grow */}
      <div className="flex flex-grow flex-col">
        <h3 className="mb-1 line-clamp-1 text-lg font-semibold">{title}</h3>

        <p className="mb-2 line-clamp-3 pr-2 text-justify text-sm text-gray-500">
          {description}
        </p>

        {/* Push price and button to bottom */}
        <div className="mt-auto flex w-full items-center justify-between">
          <p className="font-semibold text-black">{formatRupiah(price)}</p>
          <button
            onClick={() => handleAddToCart()}
            className="rounded-lg bg-black px-3 py-2 text-sm text-white hover:bg-gray-800"
          >
            Detail Produk
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
