import { db, storage } from "@/lib/firebase";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

export const deleteProductById = async (
  productId: string,
): Promise<boolean> => {
  try {
    const productRef = doc(db, "product", productId);

    const productSnap = await getDoc(productRef);
    if (!productSnap.exists()) {
      console.error(`Produk dengan ID ${productId} tidak ditemukan.`);
      return false;
    }

    const productData = productSnap.data();

    if (productData.image_url) {
      const imageRef = ref(storage, productData.image_url);
      await deleteObject(imageRef);
    }

    await deleteDoc(productRef);

    return true;
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    return false;
  }
};
