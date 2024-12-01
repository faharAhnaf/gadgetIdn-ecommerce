import { Ekspedisi } from "./../../lib/model/ekspedisi";
import { db } from "@/app/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ProductWithInvoice } from "@/app/lib/model/invoice";
import Profile from "@/app/lib/model/profile";

interface DetailInvoice {
  ekspedisi: Ekspedisi | null;
  product: ProductWithInvoice | null;
  user: Profile | null;
}

export async function detailInvoice({
  transaksiId,
}: {
  transaksiId: string;
}): Promise<DetailInvoice | null> {
  try {
    const transactionRef = doc(db, "transaksi", transaksiId);
    const transactionDoc = await getDoc(transactionRef);
    const transactionData = transactionDoc.data();

    if (!transactionDoc.exists()) {
      console.log("Data transaksi tidak ada");
      return null;
    }

    const productId = transactionDoc.data().product_id[0]?.id;
    let productDoc: ProductWithInvoice | null = null;
    if (productId) {
      const productRef = doc(db, "product", productId);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        productDoc = productSnapshot.data() as ProductWithInvoice;
      } else {
        console.log("Data produk tidak ditemukan");
      }
    }

    const ekspedisiId = transactionDoc.data().ekspedisi_id.id;
    let ekspedisiDoc: Ekspedisi | null = null;
    if (ekspedisiId) {
      const ekspedisiRef = doc(db, "ekspedisi", ekspedisiId);
      const ekspedisiSnapshot = await getDoc(ekspedisiRef);
      if (ekspedisiSnapshot.exists()) {
        ekspedisiDoc = ekspedisiSnapshot.data() as Ekspedisi;
      } else {
        console.log("Data ekspedisi tidak ditemukan");
      }
    }

    const userId = transactionDoc.data().user_id;
    let userDoc: Profile | null = null;
    if (userId) {
      const ekspedisiRef = doc(db, "users", userId);
      const ekspedisiSnapshot = await getDoc(ekspedisiRef);
      if (ekspedisiSnapshot.exists()) {
        userDoc = ekspedisiSnapshot.data() as Profile;
      } else {
        console.log("Data ekspedisi tidak ditemukan");
      }
    }

    let productWithInvoice: ProductWithInvoice | null = null;
    if (productDoc) {
      productWithInvoice = {
        ...productDoc,
        invoice: transactionData,
      } as ProductWithInvoice;
    }

    return {
      ekspedisi: ekspedisiDoc,
      product: productWithInvoice,
      user: userDoc,
    };
  } catch (e) {
    console.error("Error fetching transactions:", e);
    return null;
  }
}
