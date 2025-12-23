import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const kanit = Kanit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "300",
});

export const metadata: Metadata = {
  title: "Mustaqe",
  description: "Ecommerce online created with Next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${kanit.className}`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
