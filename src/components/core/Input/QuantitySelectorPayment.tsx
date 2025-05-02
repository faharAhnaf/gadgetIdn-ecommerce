"use client";

import React, { useState, useEffect } from "react";

interface QuantitySelectorProps {
  onQuantityChange?: (quantity: number, price: number) => void;
  cartId: string;
  unitPrice: number;
}

export default function QuantitySelectorPayment({
  onQuantityChange = () => {},
  cartId,
  unitPrice,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);
  const [cartSessions, setCartSessions] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem("cartSession");
        const parsedCart = storedCart ? JSON.parse(storedCart) : [];
        setCartSessions(parsedCart);
        
        const cartItem = parsedCart.find((item: any) => item.cart_id === cartId);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      } catch (error) {
        console.error("Error loading cart data:", error);
      }
    }
  }, [cartId]);

  const updateLocalStorage = (newQuantity: number) => {
    if (typeof window === "undefined") return;

    try {
      const newPrice = newQuantity * unitPrice;
      const updatedCart = [...cartSessions];
      const cartIndex = updatedCart.findIndex(
        (item: any) => item.cart_id === cartId
      );

      if (cartIndex > -1) {
        updatedCart[cartIndex] = {
          ...updatedCart[cartIndex],
          quantity: newQuantity,
          total_price: newPrice,
        };
      } else {
        updatedCart.push({
          cart_id: cartId,
          quantity: newQuantity,
          total_price: newPrice,
        });
      }

      setCartSessions(updatedCart);
      localStorage.setItem("cartSession", JSON.stringify(updatedCart));
      onQuantityChange(newQuantity, newPrice);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const newQuantity = value ? Math.max(1, parseInt(value, 10)) : 1;
    setQuantity(newQuantity);
    updateLocalStorage(newQuantity);
  };

  const changeQuantity = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
    updateLocalStorage(newQuantity);
  };

  return (
    <div className="flex w-1/4 items-center justify-center rounded-md border border-gray-300">
      <button
        onClick={() => changeQuantity(-1)}
        className="w-full bg-gray-100 px-3 py-2 font-bold text-gray-700 hover:bg-gray-200"
      >
        -
      </button>

      <input
        type="text"
        value={quantity}
        onChange={handleInputChange}
        className="w-12 p-2 text-center outline-none"
      />

      <button
        onClick={() => changeQuantity(1)}
        className="w-full bg-gray-100 px-3 py-2 font-bold text-gray-700 hover:bg-gray-200"
      >
        +
      </button>
    </div>
  );
}
