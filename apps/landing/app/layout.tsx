import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { MetaPixel } from "@/components/MetaPixel";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://luckyline.app"
  ),
  title: "Lucky Line — Your Luxury Casino Adventure",
  description:
    "Embark on a luxurious train journey filled with slots, mysteries, and rewards. Download Lucky Line free on the App Store.",
  openGraph: {
    title: "Lucky Line — Your Luxury Casino Adventure",
    description:
      "Spin, collect, and explore aboard the most elegant train in mobile gaming.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky Line — Your Luxury Casino Adventure",
    description:
      "Spin, collect, and explore aboard the most elegant train in mobile gaming.",
  },
  other: {
    "apple-itunes-app": "app-id=YOUR_APP_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
