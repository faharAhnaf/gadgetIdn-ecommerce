import { auth, db, provider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const saveToSession = (user: any) => {
  if (typeof window !== "undefined") {
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const sessionData = {
      user_id: user.uid,
      name: user.displayName,
      email: user.email,
      role: user.role,
      expiresAt: Date.now() + oneDayInMs,
    };
    localStorage.setItem("userSession", JSON.stringify(sessionData));
  }
};

const signInWithGoogle = async () => {
  try {
    Swal.fire({
      title: "Masuk...",
      text: "Mohon tunggu, sedang memproses login Anda.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const userData = {
        user_id: user.uid,
        name: user.displayName,
        email: user.email,
        role: false,
        isGmail: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(userRef, userData);
    }

    saveToSession(user);

    return user;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal Login",
      text: "Terjadi kesalahan saat login dengan Google.",
      footer: `<a href="#">Kenapa saya mengalami masalah ini?</a>`,
    });

    throw error;
  }
};

const logout = async () => {
  const result = await Swal.fire({
    title: "Konfirmasi Keluar",
    text: "Apakah Anda yakin ingin keluar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Keluar",
    cancelButtonText: "Tidak, Tetap Masuk",
  });

  if (result.isConfirmed) {
    await signOut(auth);
    localStorage.removeItem("userSession");

    Swal.fire({
      title: "Berhasil Keluar",
      text: "Anda berhasil keluar.",
      icon: "info",
      confirmButtonText: "OK",
    }).then(() => {
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    });
  }
};

export { signInWithGoogle, logout };
