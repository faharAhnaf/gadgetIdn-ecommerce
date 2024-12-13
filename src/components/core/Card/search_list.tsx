import React from "react";
import Link from "next/link";
import formatRupiah from "@/app/lib/format_money";
import addCartItem from "@/app/api/cart/add_cart";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-start rounded-lg bg-white p-4 shadow-lg">
      <div className="mb-4 h-48 w-full rounded-md bg-gray-200">
        <Link href={`/detail-product/${product_id}`}>
          <img
            src={`${imageUrl}`}
            alt={title}
            className="h-full w-full object-cover"
          />
        </Link>
      </div>

      <h3 className="mb-1 text-lg font-semibold">{title}</h3>

      <p className="mb-2 flex-grow pr-2 text-justify text-sm text-gray-500">
        {description.length > 200
          ? `${description.slice(0, 200)}...`
          : description}
      </p>

      <div className="mt-auto flex w-full flex-col">
        <p className="mb-4 font-semibold text-black">{formatRupiah(price)}</p>
        
        <Link href={`/detail-product/${product_id}`}>
          <button
            onClick={() => router.push(`/detail-product/${product_id}`)}
            className="rounded-lg bg-black px-3 py-2 text-sm text-white hover:bg-gray-800"
          >
            + Add to Cart
          </button>
        </Link>
      
      </div>
    </div>
  );
};

export default Card;
