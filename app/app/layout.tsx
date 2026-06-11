import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

// Display face: confident, geometric, high-end. Body face: clean and readable.
const sora = Sora({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Cornerstone — The Wellness System for High Performers",
  description:
    "Cornerstone helps executives rebuild energy, focus, and consistency through a simple performance system built around sleep, protein, hydration, movement, mindfulness, and supplements.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
