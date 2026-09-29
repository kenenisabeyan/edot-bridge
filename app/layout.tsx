import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SkillBridge – Learn, Certify, Get Hired",
    template: "%s | SkillBridge",
  },
  description:
    "AI-powered learning platform that bridges skills to employment. Translate courses into your language, earn verified certificates, build portfolios, and find jobs.",
  keywords: ["online learning", "certificates", "jobs", "AI", "Ethiopia", "Africa", "skills"],
  openGraph: {
    title: "SkillBridge – Learn, Certify, Get Hired",
    description: "AI-powered platform connecting learning to employment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ fontFamily: "var(--font-inter, 'Inter', system-ui, sans-serif)" }}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}