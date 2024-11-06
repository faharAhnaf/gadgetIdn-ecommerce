import { useState, useEffect } from 'react';
import QuantitySelectorCart from "@/components/core/Input/QuantitySelectorCart";
import { getLatestProducts } from "@/app/api/latest_produact"; 
import ProductPreview from '@/app/lib/model/product_review';

type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export default function ShoppingCart () {
    
//   const [cartItems, setCartItems] = useState<CartItem[]>([
//     {
//       id: 1,
//       name: 'Samsung Galaxy A55 5G',
//       description: '8/256, Blue, Non Bundle',
//       price: 4452000,
//       quantity: 1,
//       imageUrl: 'assets/image/detail_produk.png',
//     },
//     {
//       id: 2,
//       name: 'Samsung Galaxy A55 5G',
//       description: '8/256, Blue, Non Bundle',
//       price: 4452000,
//       quantity: 1,
//       imageUrl: 'assets/image/detail_produk.png',
//     },
//     {
//       id: 3,
//       name: 'Samsung Galaxy A55 5G',
//       description: '8/256, Blue, Non Bundle',
//       price: 4452000,
//       quantity: 1,
//       imageUrl: 'assets/image/detail_produk.png',
//     },
//   ]);

  const [cartItems, setCartItems] = useState<ProductPreview[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const latestProducts = await getLatestProducts();
      setCartItems(latestProducts);
    };
    fetchProducts();
  }, []);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.product_id));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const total = selectedItems
    .map((id) => cartItems.find((item) => item.product_id === id)?.price || 0)
    .reduce((acc, price) => acc + price, 0);

  return (
    <div className="flex justify-between p-8 min-h-[700px] mt-[100px] mb-10">

      <div className="w-2/3">
        <h1 className="text-2xl font-semibold mb-4">Keranjang</h1>

        <div className="shadow-md p-4 rounded-md mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedItems.length === cartItems.length}
              onChange={toggleSelectAll}
              className="mr-3 w-[20px] h-[20px]"
            />
            <span className="font-medium">Pilih Semua ({cartItems.length})</span>
          </label>
        </div>
        {cartItems.map((item) => (
          <div
            key={item.product_id}
            className="flex items-center shadow-md justify-between p-4 rounded-lg mb-5 border-1 border-[#f4f1eb]"
          >
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.product_id)}
                onChange={() => toggleSelectItem(item.product_id)}
                className="mr-3 w-[20px] h-[20px]"
              />
              <img src="assets/image/example_product.png" alt={item.name} className="w-16 h-16 mr-4 rounded-md" />
              <div className='pr-5'>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600 text-justify">{item.description.length > 200 ? `${item.description.slice(0, 200)}...` : item.description}</p>

                <div className='flex mt-5'>
                    <button className="px-4 py-1 mr-2 text-md rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300">
                        Edit
                    </button>
                    <button className="px-4 py-1 ml-2 text-md rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-300">
                        Remove
                    </button>
                </div>
              </div>
            </label>
            <div className="text-right flex items-center">
                <QuantitySelectorCart/>
              <p className="text-lg font-bold ml-5">Rp{item.price.toLocaleString('id-ID')}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-1/4 p-6 shadow-md rounded-md max-h-[500px]">
        <h2 className="text-xl font-semibold mb-4">Ringkasan Belanja</h2>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Total</span>
          <span className="text-lg font-bold">Rp{total.toLocaleString('id-ID')}</span>
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
          disabled={selectedItems.length === 0}
        >
          Checkout ({selectedItems.length})
        </button>
      </div>

    </div>
  );
};
