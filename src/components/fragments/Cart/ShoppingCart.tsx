import { useState, useEffect } from "react";
import { getCartByUserId } from "@/app/api/cart/cart";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import QuantitySelectorCart from "@/components/core/Input/QuantitySelectorCart";
import CartSkeleton from "@/components/core/Skeleton/CartSkeleton";
import updateCartItem from "@/app/api/cart/update-cart";
import removeCartItem from "@/app/api/cart/remove-cart";
import Swal from "sweetalert2";

import { useRouter } from "next/navigation";
import Cart from "@/interfaces/cart";
import CartItem from "@/interfaces/cart-item";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [session, setSession] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

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
          setIsLoading(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (userData?.user_id) {
        try {
          const Carts = await getCartByUserId(userData.user_id);
          setCartItems(Carts);
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    if (userData) {
      fetchCart();
    }

    return () => clearTimeout(timeout);
  }, [userData]);

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.cart_id));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cart_id === id
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.price * newQuantity,
            }
          : item,
      ),
    );

    const updatedItem = cartItems.find((item) => item.cart_id === id);
    if (updatedItem) {
      const newTotalPrice = updatedItem.price * newQuantity;
      updateCartItem(id, newQuantity, newTotalPrice);
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Apakah Anda benar-benar ingin menghapus item ini dari keranjang?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await removeCartItem(id);
        setCartItems(cartItems.filter((item) => item.cart_id !== id));
        Swal.fire("Berhasil", "Item telah dihapus dari keranjang.", "success");
      }
    } catch (error) {
      Swal.fire("Gagal", "Gagal menghapus item dari keranjang.", "error");
    }
  };

  const total = selectedItems
    .map((id) => cartItems.find((item) => item.cart_id === id)?.totalPrice || 0)
    .reduce((acc, prices) => acc + prices, 0);

  const handleProceedToPayment = async () => {
    const selectedCartItems: CartItem[] = [];

    selectedItems.forEach((id) => {
      const matchedItem = cartItems.find((item) => item.cart_id === id);
      if (matchedItem) {
        selectedCartItems.push({
          cart_id: matchedItem.cart_id,
          product_id: matchedItem.product!.product_id,
          image_url: matchedItem.product?.image_url,
          name: matchedItem.product?.name,
          description: matchedItem.product?.description,
          selectedColor: matchedItem.selectedColor,
          selectedSize: matchedItem.selectedSize,
          quantity: matchedItem.quantity,
          price: matchedItem.price,
          total_price: matchedItem.totalPrice,
        });
      }
    });

    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Apakah Anda yakin ingin checkout keranjang Anda?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, lanjutkan!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed && selectedCartItems.length > 0) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "cartSession",
            JSON.stringify(selectedCartItems),
          );
        }
        router.push("/payment");
      } else if (selectedCartItems.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Tidak ada item yang dipilih untuk checkout",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal melanjutkan ke checkout. Silakan coba lagi.",
      });
    }
  };

  return (
    <div className="mt-[100px] flex min-h-[700px] flex-col gap-6 p-4 sm:p-6 md:p-8 lg:flex-row">
      <div className="w-full lg:w-2/3">
        <h1 className="mb-4 text-xl font-semibold sm:text-2xl">Keranjang</h1>
        <div className="mb-4 rounded-md p-4 shadow-md">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedItems.length === cartItems.length}
              onChange={toggleSelectAll}
              className="mr-3 h-[20px] w-[20px]"
            />
            <span className="font-medium">
              Pilih Semua ({cartItems.length})
            </span>
          </label>
        </div>

        {isLoading ? (
          Array.from({ length: 1 }).map((_, index) => (
            <CartSkeleton key={index} />
          ))
        ) : cartItems.length === 0 ? (
          <h1 className="text-center text-xl font-semibold text-gray-500 sm:text-2xl">
            Tidak Ada Item yang Ditemukan
          </h1>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.cart_id}
              className="border-1 mb-5 flex flex-col items-start rounded-lg border-[#f4f1eb] px-3 py-4 shadow-md sm:flex-row sm:items-center sm:px-4 sm:py-6"
            >
              <label className="flex w-full flex-col items-start sm:flex-row">
                <div className="mb-3 flex items-center sm:mb-0">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.cart_id)}
                    onChange={() => toggleSelectItem(item.cart_id)}
                    className="mr-3 h-[20px] w-[20px]"
                  />
                  <img
                    src={item.product?.image_url}
                    alt={item.product?.name}
                    className="mr-4 h-[80px] w-[80px] rounded-md sm:h-[100px] sm:w-[100px]"
                  />
                </div>
                <div className="w-full pr-0 sm:pr-5">
                  <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-base font-semibold sm:text-lg">
                      {item.product?.name}
                    </h2>
                    <p className="text-md mt-1 font-semibold sm:ml-5 sm:mt-0">
                      Rp{item.totalPrice.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <p className="mb-3 text-justify text-sm text-gray-600 sm:mb-5">
                    {item.product!.description.length > 200
                      ? `${item.product!.description.slice(0, 200)}...`
                      : item.product!.description}
                  </p>

                  <div className="mt-3 flex w-full flex-col justify-between gap-3 sm:mt-5 sm:flex-row sm:gap-0">
                    <div className="flex flex-wrap gap-2">
                      <button
                        className={`rounded-md bg-[#f9f7f3] px-3 py-1 text-sm font-semibold text-[#a7a39b] sm:px-4 sm:py-2`}
                      >
                        {item.selectedColor}
                      </button>

                      <button
                        className={`rounded-md bg-[#f9f7f3] px-3 py-1 text-sm font-semibold text-[#a7a39b] sm:px-4 sm:py-2`}
                      >
                        {item.selectedSize}
                      </button>
                    </div>

                    <div className="flex items-center">
                      <button
                        onClick={() => handleRemoveItem(item.cart_id)}
                        className="mr-4 text-gray-500 transition duration-300 hover:text-gray-600"
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
                </div>
              </label>
            </div>
          ))
        )}
      </div>

      <div className="sticky top-[100px] mt-4 w-full self-start rounded-md p-4 shadow-md sm:p-6 lg:mt-0 lg:w-1/3">
        <h2 className="mb-4 text-lg font-semibold sm:text-xl">
          Ringkasan Belanja
        </h2>
        <div className="mb-4 flex justify-between">
          <span className="text-gray-600">Total</span>
          <span className="text-base font-bold sm:text-lg">
            Rp{total.toLocaleString("id-ID")}
          </span>
        </div>
        <button
          onClick={handleProceedToPayment}
          className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Checkout ({selectedItems.length})
        </button>
      </div>
    </div>
  );
}
