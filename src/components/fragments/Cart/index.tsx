import { useState } from 'react';

type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export default function ShoppingCart () {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Samsung Galaxy A55 5G',
      description: '8/256, Blue, Non Bundle',
      price: 4452000,
      quantity: 1,
      imageUrl: 'assets/image/detail_produk.png',
    },
    {
      id: 2,
      name: 'Samsung Galaxy A55 5G',
      description: '8/256, Blue, Non Bundle',
      price: 4452000,
      quantity: 1,
      imageUrl: 'assets/image/detail_produk.png',
    },
    {
      id: 3,
      name: 'Samsung Galaxy A55 5G',
      description: '8/256, Blue, Non Bundle',
      price: 4452000,
      quantity: 1,
      imageUrl: 'assets/image/detail_produk.png',
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const total = selectedItems
    .map((id) => cartItems.find((item) => item.id === id)?.price || 0)
    .reduce((acc, price) => acc + price, 0);

  return (
    <div className="flex justify-between shadow-md p-8 bg-gray-50 min-h-[700px] mt-[100px] mb-10">

      <div className="w-2/3">
        <h1 className="text-2xl font-semibold mb-4">Keranjang</h1>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedItems.length === cartItems.length}
              onChange={toggleSelectAll}
              className="mr-2"
            />
            <span className="font-medium">Pilih Semua ({cartItems.length})</span>
          </label>
        </div>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center shadow-md justify-between bg-gray-100 p-4 rounded-md mb-4 border-2 border-[#f4f1eb]"
          >
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelectItem(item.id)}
                className="mr-2"
              />
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 mr-4 rounded-md" />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </label>
            <div className="text-right">
              <p className="text-lg font-bold">Rp{item.price.toLocaleString('id-ID')}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-1/4 bg-gray-100 p-6 rounded-md max-h-[500px]">
        <h2 className="text-xl font-semibold mb-4">Ringkasan Belanja</h2>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Total</span>
          <span className="text-lg font-bold">Rp{total.toLocaleString('id-ID')}</span>
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
          disabled={selectedItems.length === 0}
        >
          Beli ({selectedItems.length})
        </button>
      </div>

    </div>
  );
};
