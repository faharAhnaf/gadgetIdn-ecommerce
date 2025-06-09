import { db, storage } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default async function uploadDataProduct(
  name: string,
  price: number,
  quantityInStock: number,
  category: string,
  description: string,
  image: File,
  user_id: string,
  variant: string[],
  color: string[],
) {
  try {
    const productCollection = collection(db, "product");
    const userRef = doc(db, "users", user_id);
    const storageRef = ref(
      storage,
      `image/product/${Date.now()}-${image.name}`,
    );

    // 🔁 Upload gambar dan tunggu hingga selesai
    const uploadURL = await new Promise<string>((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Proses unggah ${pct}% selesai`);
        },
        (error) => {
          console.error("Gagal mengunggah:", error);
          Swal.fire({
            icon: "error",
            title: "Gagal Mengunggah",
            text: "Terjadi kesalahan saat mengunggah gambar. Silakan coba lagi.",
          });
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        },
      );
    });

    // ✅ Tambahkan data produk ke Firestore
    const productRef = await addDoc(productCollection, {
      product_id: "",
      name,
      price,
      quantityInStock,
      category,
      description,
      image_url: uploadURL,
      user_id: userRef,
      variant,
      color,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });

    const productId = productRef.id;

    await setDoc(productRef, { product_id: productId }, { merge: true });

    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: `Produk berhasil ditambahkan`,
    });
  } catch (e) {
    console.error("Gagal menyimpan produk:", e);
    await Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat menambahkan produk. Silakan coba lagi.",
    });
  }
}
