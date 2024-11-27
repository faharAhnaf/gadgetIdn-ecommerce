import { db } from "@/app/lib/firebase";
import { InvoiceData } from "@/app/lib/model/invoice";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

export default async function addInvoice({
  userId,
}: {
  userId: string;
}): Promise<InvoiceData[] | null> {
  try {
    const transactionCollection = collection(db, "transaksi");
    const q = query(transactionCollection, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("No transactions found for this user");
      return null;
    }

    const transactions: InvoiceData[] = querySnapshot.docs.map((doc) => {
      const transactionData = doc.data();
      const createdAt =
        transactionData.created_at instanceof Timestamp
          ? transactionData.created_at.toDate().toISOString()
          : new Date().toISOString();

      const updatedAt =
        transactionData.updated_at instanceof Timestamp
          ? transactionData.updated_at.toDate().toISOString()
          : new Date().toISOString();

      return {
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
        variant: transactionData.variant,
      };
    });

    return transactions; // Mengembalikan array dari transaksi
  } catch (e) {
    console.error("Error fetching transactions:", e);
    return null; // Mengembalikan null jika terjadi kesalahan
  }
}
