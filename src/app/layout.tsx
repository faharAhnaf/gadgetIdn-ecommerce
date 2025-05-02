import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import { UserProfileProvider } from "../context/ProfileContext";
config.autoAddCss = false; // Prevents Font Awesome from automatically adding CSS

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "GadgetIdn",
  description: "Platform e-commerce terpercaya untuk semua kebutuhan gadget dan teknologi Anda. Nikmati pengalaman berbelanja yang aman, cepat, dan nyaman dengan layanan pelanggan 24/7.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProfileProvider>{children}</UserProfileProvider>
      </body>
    </html>
  );
}
