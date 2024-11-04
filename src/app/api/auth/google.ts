import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { auth, provider, db } from '@/app/lib/firebase';

const saveToSession = (user: any) => {
  const oneDayInMs = 24 * 60 * 60 * 1000;

  const sessionData = {
    user_id: user.uid,
    name: user.displayName,
    email: user.email,
    expiresAt: Date.now() + oneDayInMs,
  };

  localStorage.setItem("userSession", JSON.stringify(sessionData));
};

const signInWithGoogle = async () => {
  try {
    Swal.fire({
      title: 'Logging in...',
      text: 'Please wait while we log you in.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user is already in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Add new user data to Firestore if not found
      const userData = {
        user_id: user.uid,
        name: user.displayName,
        email: user.email,
        role: false,
        isGmail: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await setDoc(userRef, userData);
    }

    saveToSession(user);

    Swal.fire({
      title: 'Login Successful!',
      text: 'You have successfully logged in.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        router.push('/');
      }
    });

    return user;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'An error occurred during Google sign-in.',
      footer: `<a href="#">Why do I have this issue?</a>`,
    });

    throw error;
  }
};

const logout = async () => {
  await signOut(auth);
  localStorage.removeItem("userSession");

  Swal.fire({
    title: 'Logged Out',
    text: 'You have successfully logged out.',
    icon: 'info',
    confirmButtonText: 'OK',
  });
};

export { signInWithGoogle, logout };
