import React from 'react';
import Link from "next/link";

interface ProductCardProps {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

const Card: React.FC<ProductCardProps> = ({ title, description, price, imageUrl }) => {
    const formatRupiah = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(value);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start">
            <div className="w-full h-48 bg-gray-200 rounded-md mb-4 overflow-hidden">
                <Link href="/detail-product/9cOMAkDo2BhFZ2BQrra4">
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                </Link>
            </div>

            <div className='flex justify-between w-full'>

              <div>
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                
                <p className="text-gray-500 text-sm mb-2">{description}</p>
                
                <p className="text-black font-semibold mb-4">{formatRupiah(price)}</p>
              </div>

              <div>
                <button className="bg-black text-sm text-white py-2 px-3 rounded-lg hover:bg-gray-800">
                    + Add to Cart
                </button>
              </div>


            </div>

        </div>
    );
};

export default Card;
