import Transaction from "@/interfaces/transaksi";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getTransactions = async (): Promise<Transaction[] | null> => {
  try {
    const transactionCollection = collection(db, "transaksi");

    const transactionSnapshot = await getDocs(transactionCollection);

    if (transactionSnapshot.empty) {
      console.warn("No transactions found.");
      return null;
    }

    const transactions: Transaction[] = transactionSnapshot.docs.map(
      (docSnap) => {
        const transactionData = docSnap.data();
        return {
          transaction_id: docSnap.id,
          ...transactionData,
        } as Transaction;
      },
    );

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return null;
  }
};
