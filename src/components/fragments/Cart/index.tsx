import { useState, useEffect } from 'react';
import { getCartByUserId } from "@/app/api/cart/cart";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import QuantitySelectorCart from "@/components/core/Input/QuantitySelectorCart";
import CartSkeleton from "@/components/core/Card/CartSkeleton";
import Cart from '@/app/lib/model/cart';
import updateCartItem from '@/app/api/cart/update_cart';
import removeCartItem from '@/app/api/cart/remove_cart';
import Swal from 'sweetalert2';

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const session = localStorage.getItem("userSession");
  const userData = JSON.parse(session!);

  useEffect(() => {
    const fetchCart = async () => {
      const Carts = await getCartByUserId(userData.user_id);
      setCartItems(Carts);
    };

    fetchCart();
  }, []);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.cart_id));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cart_id === id
          ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity }
          : item
      )
    );

    const updatedItem = cartItems.find(item => item.cart_id === id);
    if (updatedItem) {
      const newTotalPrice = updatedItem.price * newQuantity;
      updateCartItem(id, newQuantity, newTotalPrice);
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to remove this item from your cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "Cancel",
      });
  
      if (result.isConfirmed) {
        await removeCartItem(id);
        setCartItems(cartItems.filter((item) => item.cart_id !== id));
        Swal.fire("Success", "Item has been removed from the cart.", "success");
      }
    } catch (error) {
      Swal.fire("Failed", "Failed to remove the item from the cart.", "error");
    }
  };

  const total = selectedItems
    .map((id) => cartItems.find((item) => item.cart_id === id)?.totalPrice || 0)
    .reduce((acc, prices) => acc + prices, 0);

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

        {cartItems.length === 0
        ? Array.from({ length: 3 }).map((_, index) => (
            <CartSkeleton key={index} />
          ))
        : cartItems.map((item) => (
            <div
              key={item.cart_id}
              className="flex items-center shadow-md justify-between px-6 py-8 rounded-lg mb-5 border-1 border-[#f4f1eb]"
            >
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.cart_id)}
                  onChange={() => toggleSelectItem(item.cart_id)}
                  className="mr-3 w-[20px] h-[20px]"
                />
                <img
                  src="assets/image/example_product.png"
                  alt={item.product?.name}
                  className="w-[100px] h-[100px] mr-4 rounded-md"
                />
                <div className="pr-5">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">
                      {item.product?.name}
                    </h2>
                    <p className="text-md font-semibold ml-5">
                      Rp{item.totalPrice.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <p className="text-gray-600 text-justify">
                    {item.product!.description.length > 200
                      ? `${item.product!.description.slice(0, 200)}...`
                      : item.product!.description}
                  </p>

                  <div className="flex justify-end mt-5">
                    <button
                      onClick={() => handleRemoveItem(item.cart_id)}
                      className="text-gray-500 hover:text-gray-600 transition duration-300 mr-4"
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="text-lg"
                      />
                    </button>

                    <QuantitySelectorCart
                      quantity={item.quantity}
                      onQuantityChange={(newQuantity) =>
                        handleQuantityChange(item.cart_id, newQuantity)
                      }
                    />
                  </div>
                </div>
              </label>
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
}
