import { db } from "@/app/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const updatePicture = async (userId: string, picture: string) => {
  const cartRef = doc(db, "users", userId);
  try {
    await updateDoc(cartRef, {
      picture,
    });

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Picture name has been updated successfully.",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "An error occurred while updating the picture. Please try again..",
    });
  }
};

export default updatePicture;
