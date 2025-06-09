import { db, storage } from "@/lib/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default async function updateDataProduct(
  productId: string,
  name: string,
  price: number,
  quantityInStock: number,
  category: string,
  description: string,
  image: File | null,
  oldImageURL: string,
  variant: string[],
  color: string[],
) {
  const productRef = doc(db, "product", productId);

  try {
    let image_url = oldImageURL;

    if (image) {
      const storageRef = ref(
        storage,
        `image/product/${Date.now()}-${image.name}`,
      );
      const uploadTask = uploadBytesResumable(storageRef, image);

      image_url = await new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${pct.toFixed(2)}% done`);
          },
          (error) => {
            console.error("Upload failed:", error);
            Swal.fire({
              icon: "error",
              title: "Upload Gagal",
              text: "Gagal mengunggah gambar baru.",
            });
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          },
        );
      });

      // ❌ Hapus gambar lama
      if (oldImageURL) {
        const oldPath = getStoragePathFromURL(oldImageURL);
        if (oldPath) {
          const oldRef = ref(storage, oldPath);
          await deleteObject(oldRef).catch((err) => {
            console.warn("Gagal menghapus gambar lama:", err);
          });
        }
      }
    }

    // ✅ Update ke Firestore
    await updateDoc(productRef, {
      name,
      price,
      quantityInStock,
      category,
      description,
      image_url,
      variant,
      color,
      updated_at: serverTimestamp(),
    });

    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Produk berhasil diperbarui.",
    });
  } catch (error) {
    console.error("Update error:", error);
    await Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat memperbarui produk.",
    });
  }
}

// 🧠 Fungsi bantu: konversi downloadURL ke path storage Firebase
function getStoragePathFromURL(url: string): string | null {
  try {
    const base = "https://firebasestorage.googleapis.com/v0/b/";
    if (!url.startsWith(base)) return null;

    const [, bucketAndRest] = url.split("/v0/b/");
    const [bucket, rest] = bucketAndRest.split("/o/");
    const pathAndParams = rest.split("?")[0];
    const decodedPath = decodeURIComponent(pathAndParams);

    return decodedPath;
  } catch {
    return null;
  }
}
