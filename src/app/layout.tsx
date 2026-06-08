import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anu Murali | Data Science & AI/ML Portfolio",
  description:
    "Portfolio of Anu Murali — Creative Data Science & AI/ML engineer specializing in Power BI, data transformation, and machine learning. Computer Engineering Diploma graduate.",
  keywords: [
    "Anu Murali",
    "Data Science",
    "AI",
    "Machine Learning",
    "Power BI",
    "Data Transformation",
    "Portfolio",
  ],
  authors: [{ name: "Anu Murali" }],
  openGraph: {
    title: "Anu Murali | Data Science & AI/ML Portfolio",
    description:
      "Creative Data Science & AI/ML engineer with expertise in Power BI and data transformation.",
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
