import ProductPreview from "@/interfaces/product-preview";
import { db } from "@/lib/firebase";
import { collection, query, getDocs } from "firebase/firestore";

const searchProductsByName = async (
  name: string,
): Promise<ProductPreview[]> => {
  const productsRef = collection(db, "product");

  let q = query(productsRef);

  try {
    const querySnapshot = await getDocs(q);
    let products = querySnapshot.docs.map(
      (doc) =>
        ({
          product_id: doc.id,
          ...doc.data(),
        }) as ProductPreview,
    );

    if (name && name.trim() !== "") {
      const searchTerm = name.toLowerCase().trim();
      products = products.filter((product) => {
        const productName = ((product.name as string) || "").toLowerCase();
        return productName.includes(searchTerm);
      });
    }

    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

export default searchProductsByName;
