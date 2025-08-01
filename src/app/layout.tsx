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
  title: "Akshit Singh - Full Stack MERN Developer | React.js & Node.js Expert",
  description: "Dynamic IT professional with expertise in Python, React.js, Node.js, and MySQL. Currently working as Full Stack Developer at PRYM AEROSPACE, specializing in drone monitoring systems and real-time data streaming.",
  keywords: "Akshit Singh, Full Stack Developer, MERN Stack, React Developer, Node.js Developer, MongoDB, Express.js, JavaScript, Python, Web Development, API Development, Frontend Developer, Backend Developer, PRYM AEROSPACE",
  authors: [{ name: "Akshit Singh" }],
  openGraph: {
    title: "Akshit Singh - Full Stack MERN Developer",
    description: "Full Stack Developer at PRYM AEROSPACE specializing in React.js, Node.js, and real-time drone monitoring systems.",
    type: "website",
    locale: "en_US",
    siteName: "Akshit Singh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshit Singh - Full Stack MERN Developer",
    description: "Full Stack Developer specializing in MERN Stack technologies and aerospace applications",
  },
  robots: {
    index: true,
    follow: true,
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
