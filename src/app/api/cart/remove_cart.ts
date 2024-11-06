import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export default async function removeCartItem(cartId: string): Promise<void> {
  try {
    const cartRef = doc(db, "cart", cartId);
    await deleteDoc(cartRef);
  } catch (error) {
    console.error("Error removing item from Firebase cart:", error);
    throw error;
  }
}
