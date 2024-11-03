"use client"

import React, { useState } from 'react';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setQuantity(value ? parseInt(value) : 1);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md">
      <button
        onClick={decrementQuantity}
        className="px-3 py-2 bg-gray-100 text-gray-700 font-bold hover:bg-gray-200"
      >
        −
      </button>

      <input
        type="text"
        value={quantity}
        onChange={handleInputChange}
        className="w-12 p-2 text-center outline-none"
      />

      <button
        onClick={incrementQuantity}
        className="px-3 py-2 bg-gray-100 text-gray-700 font-bold hover:bg-gray-200"
      >
        +
      </button>
    </div>
  );
}
