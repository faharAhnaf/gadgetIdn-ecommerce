import { auth, db, provider } from "@/lib/firebase";
import { signInWithPopup, signOut, browserLocalPersistence, setPersistence } from "firebase/auth";
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
    try {
      localStorage.setItem("userSession", JSON.stringify(sessionData));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }
};

const signInWithGoogle = async () => {
  try {
    Swal.fire({
      title: "Logging in...",
      text: "Please wait while we log you in.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Set persistence to LOCAL before sign in
    await setPersistence(auth, browserLocalPersistence);

    const result = await signInWithPopup(auth, provider);
    if (!result) {
      throw new Error("Sign-in popup was blocked or closed");
    }

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
    
    // Close the loading dialog
    Swal.close();

    return user;
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    
    let errorMessage = "An error occurred during Google sign-in.";
    if (error.code === 'auth/popup-blocked') {
      errorMessage = "Popup was blocked. Please allow popups for this site.";
    } else if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = "Sign-in was cancelled. Please try again.";
    } else if (error.code === 'auth/missing-initial-state') {
      errorMessage = "Browser storage is not accessible. Please enable cookies and try again.";
    }

    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: errorMessage,
      footer: `<a href="#">Need help with sign in?</a>`,
    });

    throw error;
  }
};

const logout = async () => {
  if (typeof window === "undefined") return;

  const result = await Swal.fire({
    title: "Confirm Logout",
    text: "Are you sure you want to exit?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Sign out",
    cancelButtonText: "No, Keep Signed in",
  });

  if (result.isConfirmed) {
    try {
      await signOut(auth);
      localStorage.removeItem("userSession");

      Swal.fire({
        title: "Logged Out",
        text: "You have successfully logged out.",
        icon: "info",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error during logout:", error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "An error occurred during logout. Please try again.",
      });
    }
  }
};

export { signInWithGoogle, logout };
