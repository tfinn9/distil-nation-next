import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Distil-Nation NZ | New Zealand Craft Spirits Podcast",
  description: "Tom, Cameron & Ty explore the world of New Zealand spirits, chatting to distillers and industry experts in a fun, relaxed, prejudice-free way.",
  keywords: ["New Zealand spirits", "craft spirits", "distillery", "podcast", "whisky", "gin", "rum"],
  openGraph: {
    title: "Distil-Nation NZ",
    description: "Discover New Zealand's craft spirits.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ" className="dark">
      <body
        className={`${inter.variable} ${cormorant.variable} min-h-screen bg-background text-foreground font-sans antialiased`}
      >
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
