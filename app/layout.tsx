import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/shared/Navbar";
import AuthProvider from "@/context/AuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Gamerwiz",
  description: "GamerWiz is a game purchasing web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <>
    <html lang="en">
      <body className={poppins.variable}>
       <AuthProvider>
          <nav className="padding-x bg-[#080000]">
            <Navbar /> 
          </nav>
          {children}
          </AuthProvider>
      </body>
      <Toaster position="top-center" richColors />
    </html>
    </>
  );
}