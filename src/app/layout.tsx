import type { Metadata } from "next";
import { Exo_2, Space_Grotesk } from "next/font/google";
import "./globals.css";

const exo = Exo_2({
  variable: "--font-exo",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raghuraj-portfolio.vercel.app"),
  title: "Raghuraj Pratap Rajpoot | AI Engineer Portfolio",
  description:
    "Premium AI Engineer portfolio of Raghuraj Pratap Rajpoot featuring Gen-AI projects, full-stack builds, and recruiter-focused experience.",
  keywords: [
    "Raghuraj Pratap Rajpoot",
    "AI Engineer",
    "Gen AI Developer",
    "Next.js Portfolio",
    "Full Stack Developer India",
  ],
  openGraph: {
    title: "Raghuraj Pratap Rajpoot | AI Engineer Portfolio",
    description:
      "AI Engineer | Full Stack Developer | Gen-AI Specialist. Explore projects, achievements, and experience.",
    url: "https://raghuraj-portfolio.vercel.app",
    siteName: "Raghuraj Portfolio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghuraj Pratap Rajpoot | AI Engineer Portfolio",
    description: "Recruiter-ready AI portfolio with futuristic UI and interactive features.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${exo.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
