import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "John Riley | Computer Engineering @ UF",
  description:
    "Portfolio of John Riley — Computer Engineering student at UF, hackathon winner, quantitative developer, and ML researcher.",
  keywords: [
    "John Riley",
    "portfolio",
    "computer engineering",
    "University of Florida",
    "machine learning",
    "hackathon",
    "quantitative developer",
  ],
  authors: [{ name: "John Riley" }],
  openGraph: {
    title: "John Riley | Computer Engineering @ UF",
    description:
      "Portfolio of John Riley — hackathon winner, quantitative developer, and ML researcher.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jetbrains.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
