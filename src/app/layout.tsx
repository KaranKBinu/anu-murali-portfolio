import type { Metadata } from "next";
import portfolioData from "@/data/portfolio.json";
import "./globals.css";

export const metadata: Metadata = {
  title: portfolioData.metadata.title,
  description: portfolioData.metadata.description,
  keywords: portfolioData.metadata.keywords,
  authors: [{ name: portfolioData.personalInfo.name }],
  openGraph: {
    title: portfolioData.metadata.title,
    description: portfolioData.metadata.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-overlay">{children}</body>
    </html>
  );
}
