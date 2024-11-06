import { db } from '@/app/lib/firebase';
import { doc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

const updateCartItem = async (id: string, newQuantity: number, newTotalPrice: number) => {
    const cartRef = doc(db, "cart", id);
    try {
      await updateDoc(cartRef, {
        quantity: newQuantity,
        totalPrice: newTotalPrice
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'An error occurred while updating the cart. Please try again..'
      });
    }
  };

export default updateCartItem;