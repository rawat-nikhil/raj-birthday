import type { Metadata } from "next";
import { Caveat, Fraunces, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const shareImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Raj standing on rocks beside a river with his arms open",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://raj-birthday.vercel.app"),
  title: "Happy Birthday, Raj",
  description: "A small birthday surprise, made just for Raj.",
  openGraph: {
    title: "Happy Birthday, Raj",
    description: "A small birthday surprise, made just for Raj.",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday, Raj",
    description: "A small birthday surprise, made just for Raj.",
    images: [shareImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-dvh bg-ivory text-charcoal">{children}</body>
    </html>
  );
}
