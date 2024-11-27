import Swal from "sweetalert2";
import { axios } from "@/app/lib/axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { xendit_invoice } from "@/app/lib/constant";
import { redirect } from "next/navigation";

/* Example Result

{
    "id": "673d7c9a6b77522e5b0c46d3",
    "external_id": "invoice-1732082842383",
    "user_id": "673cb1fb920d79def7df975d",
    "payment_method": "EWALLET",
    "status": "PAID",
    "merchant_name": "Ecommerce",
    "merchant_profile_picture_url": "https://xnd-merchant-logos.s3.amazonaws.com/business/production/673cb1fb920d79def7df975d-1732031160717.png",
    "amount": 6439000,
    "paid_amount": 6439000,
    "paid_at": "2024-11-20T06:07:44.763Z",
    "payer_email": "mraqwan471@gmail.com",
    "description": "Xiaomi 14T: Master Light, Capture Night In collaboration with Leica, the Xiaomi 14T is now equipped with the New Generation Leica Optical Lens and a professional lens set, delivering remarkable photography performance, especially in low-light conditions. You can optimize the lighting to capture the best results anytime, anywhere. As a result, photos become more detailed, sharp, and lifelike in dimension.    The Leica Summilux Optical Lens on the Xiaomi 14T is equipped with a large aperture, offering outstanding optical performance. In addition to capturing plenty of detail in dark environments, this lens also produces exceptional color reproduction, contrast, and resolution. The Xiaomi 14T Series is ready to take mobile photography to the next level, an achievement unique to Xiaomi.",
    "expiry_date": "2024-11-21T06:07:22.502Z",
    "invoice_url": "https://checkout-staging.xendit.co/web/673d7c9a6b77522e5b0c46d3",
    "should_exclude_credit_card": false,
    "should_send_email": false,
    "created": "2024-11-20T06:07:22.630Z",
    "updated": "2024-11-20T06:07:46.247Z",
    "currency": "IDR",
    "payment_channel": "OVO",
    "payment_id": "ewc_5d411c5b-f9b9-4cce-a18e-e30fd13cf02f",
    "payment_method_id": "pm-b6d2163a-27e2-483a-91d6-59215dc5b066",
    "metadata": null
}

*/

const calculateTotal = ({
  price,
  amount,
}: {
  price: number[];
  amount: number[];
}): { total: number; totalQuantity: number } => {
  let total = 0;
  let totalQuantity = 0;

  for (let i = 0; i < amount.length; i++) {
    total += price ? price[i] * amount[i] : 0;
    totalQuantity += amount[i];
  }

  return { total, totalQuantity };
};

const checkPaymentStatus = async (
  invoiceId: string,
  product_id: string[],
  current_price: number[],
  amount: number[],
  user_id: string,
  totalQuantity: number,
) => {
  try {
    const response = await axios.get(`${xendit_invoice}/${invoiceId}`, {
      auth: {
        username: process.env.NEXT_PUBLIC_XENDIT_SECRET_KEY as string,
        password: "",
      },
    });

    const invoiceStatus = response.data.status;
    const data_payment = response.data;

    if (invoiceStatus === "PAID") {
      await Swal.fire("Success", "Payment successful!", "success");

      const productReferences = product_id.map((id) => doc(db, "product", id));

      const data = {
        ekspedisi_id: doc(db, "ekspedisi", "Oz52qy0DaKJ5V8xmKtLd"),
        product_id: productReferences,
        user_id: user_id,
        transaksi_id: data_payment.payment_id,

        payer_email: data_payment.payer_email,
        payment_channel: data_payment.payment_channel,
        payment_method: data_payment.payment_method,

        paid_amount: data_payment.paid_amount,
        current_price: current_price,
        amount: amount,
        totalQuantity: totalQuantity,

        status: data_payment.status,
        created_at: data_payment.created,
        updated_at: data_payment.created,
      };

      try {
        const docRef = doc(db, "transaksi", data.transaksi_id);
        await setDoc(docRef, data);

        window.location.href = "http://localhost:3000/invoice";
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else if (invoiceStatus === "EXPIRED" || invoiceStatus === "CANCELLED") {
      await Swal.fire("Failed", "Payment failed or expired.", "error");
    } else {
      setTimeout(
        async () =>
          await checkPaymentStatus(
            invoiceId,
            product_id,
            current_price,
            amount,
            user_id,
            totalQuantity,
          ),
        5000,
      );
    }
  } catch (error) {
    console.error("Error checking payment status:", error);
    await Swal.fire(
      "Error",
      "An error occurred while checking payment status.",
      "error",
    );
  }
};

export const handleCheckout = async ({
  user_id,
  email,
  price,
  product_id,
  amount,
  description,
}: {
  user_id: string;
  email: string;
  price: number[];
  product_id: string[];
  amount: number[];
  description: string;
}) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Are you sure you want to proceed with checkout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, proceed!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      const totalAmount = calculateTotal({ price, amount });
      const userEmail = email || "guest@example.com";
      const timestamp = Date.now();

      const response = await axios.post(
        xendit_invoice,
        {
          external_id: `invoice-${timestamp}`,
          amount: totalAmount.total,
          description: description, // Ganti dengan nama produk
          payer_email: userEmail,
        },
        {
          auth: {
            username: process.env.NEXT_PUBLIC_XENDIT_SECRET_KEY as string,
            password: "",
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.invoice_url) {
        await Swal.fire("Success", "Redirecting to payment page...", "success");
        window.open(response.data.invoice_url, "_blank");

        checkPaymentStatus(
          response.data.id,
          product_id,
          price,
          amount,
          user_id,
          totalAmount.totalQuantity,
        );
      } else {
        throw new Error("Invoice URL is missing.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      Swal.fire(
        "Failed",
        "Unable to proceed with checkout. Please try again.",
        "error",
      );
    }
  }
};
