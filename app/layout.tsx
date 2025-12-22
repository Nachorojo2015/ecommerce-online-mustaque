import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "300",
});

export const metadata: Metadata = {
  title: "Mustaque",
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
        {children}
      </body>
    </html>
  );
}
