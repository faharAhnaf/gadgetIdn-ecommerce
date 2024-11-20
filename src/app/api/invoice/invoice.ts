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
  created_at: string;
  ekspedisi_id: string;
  paid_amount: number;
  payer_email: string;
  payment_channel: string;
  payment_method: string;
  product_id: string;
  status: string;
  totalQuantity: number;
  transaksi_id: string;
  updated_at: string;
  user_id: string;
}

export default async function addInvoice({ userId }: { userId: string }) {
  try {
    const transactionCollection = collection(db, "transaksi");

    const q = query(transactionCollection, where("user_id", "==", userId));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("No transaction found for transaction id:");
      return null;
    }

    const transactionData = querySnapshot.docs[0].data();

    const createdAt =
      transactionData.created_at instanceof Timestamp
        ? transactionData.created_at.toDate().toISOString()
        : new Date().toISOString();

    const updatedAt =
      transactionData.updated_at instanceof Timestamp
        ? transactionData.updated_at.toDate().toISOString()
        : new Date().toISOString();

    const transactionItem: Invoice = {
      created_at: createdAt,
      ekspedisi_id: transactionData.ekspedisi_id,
      paid_amount: transactionData.paid_amount,
      payer_email: transactionData.payer_email,
      payment_channel: transactionData.payment_channel,
      payment_method: transactionData.payment_method,
      product_id: transactionData.product_id,
      status: transactionData.status,
      totalQuantity: transactionData.totalQuantity,
      transaksi_id: transactionData.transaksi_id,
      updated_at: updatedAt,
      user_id: transactionData.user_id,
    };

    return transactionItem;
  } catch (e) {
    console.error("Error fetching profiles:", e);
    return null;
  }
}
