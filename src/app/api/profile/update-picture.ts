import { db, storage } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Swal from "sweetalert2";

const updatePicture = async (userId: string, file: File) => {
  const userRef = doc(db, "users", userId);

  try {
    // 🔍 Ambil data pengguna saat ini
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    // 🗑️ Hapus gambar lama jika ada dan berupa URL Firebase Storage
    const oldPictureUrl: string | undefined = userData?.picture;
    if (
      oldPictureUrl &&
      oldPictureUrl.includes("firebasestorage.googleapis.com")
    ) {
      const pathStart = oldPictureUrl.indexOf("/o/") + 3;
      const pathEnd = oldPictureUrl.indexOf("?");
      const fullPath = decodeURIComponent(
        oldPictureUrl.substring(pathStart, pathEnd),
      );
      const oldImageRef = ref(storage, fullPath);
      await deleteObject(oldImageRef).catch((err) => {
        console.warn("Gagal menghapus gambar lama:", err);
      });
    }

    // 📤 Upload gambar baru
    const storageRef = ref(storage, `image/profile/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const downloadURL = await new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload gagal:", error);
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        },
      );
    });

    // 🔄 Update field `picture` di Firestore
    await updateDoc(userRef, { picture: downloadURL });

    // ✅ Ambil data terbaru untuk dikembalikan
    const updatedUserDoc = await getDoc(userRef);
    const updatedUserData = updatedUserDoc.data();

    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Foto profil berhasil diperbarui.",
      confirmButtonText: "OK",
    });

    return updatedUserData;
  } catch (error) {
    console.error("Gagal memperbarui foto:", error);
    await Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat memperbarui foto. Silakan coba lagi.",
    });
  }
};

export default updatePicture;
