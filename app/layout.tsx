import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fake Chat Image Maker - Create Realistic KakaoTalk Screenshots",
    template: "%s | Fake Chat Image Maker"
  },
  description: "Generate realistic KakaoTalk chat screenshots with custom profiles and messages. Perfect for entertainment, presentations, and design mockups. Export high-quality PNG images instantly.",
  keywords: [
    "fake chat",
    "chat generator",
    "KakaoTalk",
    "chat screenshot",
    "message generator",
    "fake conversation",
    "chat simulator",
    "mockup",
    "entertainment",
    "social media"
  ],
  authors: [{ name: "Fake Chat Image Maker" }],
  creator: "Fake Chat Image Maker",
  publisher: "Fake Chat Image Maker",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fake-chat-maker.vercel.app",
    siteName: "Fake Chat Image Maker",
    title: "Fake Chat Image Maker - Create Realistic KakaoTalk Screenshots",
    description: "Generate realistic KakaoTalk chat screenshots with custom profiles and messages. Perfect for entertainment, presentations, and design mockups.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fake Chat Image Maker Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fakechatmaker",
    creator: "@fakechatmaker",
    title: "Fake Chat Image Maker - Create Realistic KakaoTalk Screenshots",
    description: "Generate realistic KakaoTalk chat screenshots with custom profiles and messages. Perfect for entertainment, presentations, and design mockups.",
    images: [
      {
        url: "/twitter-image.png",
        width: 1200,
        height: 675,
        alt: "Fake Chat Image Maker Twitter Preview",
      }
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  category: "entertainment",
  alternates: {
    canonical: "https://fake-chat-maker.vercel.app",
  },
  verification: {
    google: "your-google-verification-code",
  },
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
        {children}
      </body>
    </html>
  );
}
