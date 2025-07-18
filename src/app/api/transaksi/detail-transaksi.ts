import { InvoiceData } from "@/interfaces/invoice";
import Product from "@/interfaces/product";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function detailInvoice({
  transaksiId,
}: {
  transaksiId: string;
}): Promise<InvoiceData | null> {
  try {
    const transactionRef = doc(db, "transaksi", transaksiId);
    const transactionDoc = await getDoc(transactionRef);

    if (!transactionDoc.exists()) {
      console.log("Data transaksi tidak ada");
      return null;
    }

    const transactionData = transactionDoc.data();
    const productIds = transactionData.product_id;

    if (!Array.isArray(productIds)) {
      console.error("product_id tidak valid atau bukan array:", productIds);
      return null;
    }

    const productPromises = productIds.map(async (id: any) => {
      const productRef = doc(db, "product", id.id);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        return productSnapshot.data() as Product;
      } else {
        console.log(`Data produk dengan ID ${id} tidak ditemukan`);
        return null;
      }
    });

    const products = await Promise.all(productPromises);
    const arrProduct: Product[] = products.filter(
      (product): product is Product => product !== null,
    );

    return {
      ...transactionData,
      products: arrProduct,
    } as InvoiceData;
  } catch (e) {
    console.error("Error fetching transactions:", e);
    return null;
  }
}
