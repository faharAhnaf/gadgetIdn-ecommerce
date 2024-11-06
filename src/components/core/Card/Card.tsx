import React from 'react';
import Link from "next/link";
import formatRupiah from "@/app/lib/format_money"

interface ProductCardProps {
    product_id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

const Card: React.FC<ProductCardProps> = ({ product_id, title, description, price, imageUrl }) => {
    const id = `/detail-product/${product_id}`

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start h-full min-h-[425px]">
            <div className="w-full h-48 bg-gray-200 rounded-md mb-4 overflow-hidden">
                <Link href={id}>
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                </Link>
            </div>

            <h3 className="text-lg font-semibold mb-1">{title}</h3>

            <p className="text-gray-500 text-sm mb-2 pr-2 flex-grow text-justify">
                {description.length > 200 ? `${description.slice(0, 200)}...` : description}
            </p>

            <div className="flex justify-between items-center w-full mt-auto">
                <p className="text-black font-semibold">{formatRupiah(price)}</p>
                <button className="bg-black text-sm text-white py-2 px-3 rounded-lg hover:bg-gray-800">
                    + Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Card;
