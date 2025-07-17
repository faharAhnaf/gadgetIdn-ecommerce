import Product from "@/interfaces/product";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getProductByProductId = async (
  productId: string | string[] | undefined,
): Promise<Product | null> => {
  try {
    const productCollection = collection(db, "product");
    const productQuery = query(
      productCollection,
      where("product_id", "==", productId),
    );
    const productSnap = await getDocs(productQuery);

    if (!productSnap.empty) {
      const productData = productSnap.docs[0].data();
      const product: Product = {
        product_id: productSnap.docs[0].id,
        ...productData,
      } as Product;

      return product;
    }

    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
