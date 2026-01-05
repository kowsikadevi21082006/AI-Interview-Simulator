import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interview Prep Pro - AI-powered Interview Practice",
  description: "Practice interviews with AI-powered follow-ups and real-world feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
