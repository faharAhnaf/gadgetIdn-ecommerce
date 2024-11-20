import { db } from "@/app/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { v4 } from "uuid";

interface Invoice {
  userId: string;
  orderId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export default async function addInvoice({
  userId,
  orderId,
  productId,
  name,
  price,
  quantity,
}: Invoice) {
  try {
    const invoiceRef = collection(db, "invoice");
    const orderRef = collection(db, "order", orderId);
    const productRef = collection(db, "product", productId);
    const userRef = collection(db, "users", userId);

    const q = query(
      invoiceRef,
      where("user_id", "==", userRef),
      where("product_id", "==", productRef),
      where("invoice_id", "==", invoiceRef),
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const invoiceDoc = querySnapshot.docs[0];
      const currentData = invoiceDoc.data() as Invoice;
      const newQuantity = currentData.quantity + quantity;
      const newTotalPrice = newQuantity * price;

      await updateDoc(doc(db, "invoice", invoiceDoc.id), {
        quantity: newQuantity,
        price: newTotalPrice,
        update_at: serverTimestamp(),
      });
    } else {
      await addDoc(invoiceRef, {
        invoice_id: v4(),
        user_id: userId,
        order_id: orderId,
        name: name,
        price: price,
        quantity: quantity,
        totalPrice: price * quantity,
        create_at: serverTimestamp(),
        update_at: serverTimestamp(),
      });
    }
  } catch (e) {}
}
