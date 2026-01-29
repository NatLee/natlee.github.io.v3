import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "NL.TECH | Stock Terminal",
  description: "Nat Lee - Senior Software Engineer & AI Specialist Portfolio",
  keywords: ["Software Engineer", "AI", "Machine Learning", "Backend", "Portfolio"],
  authors: [{ name: "Nat Lee" }],
  openGraph: {
    title: "NL.TECH | Stock Terminal",
    description: "Nat Lee - Senior Software Engineer & AI Specialist Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-stock-bg text-stock-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
