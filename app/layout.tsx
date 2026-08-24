import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { isAdminAuthed } from "@/lib/auth";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BamBam Diving | Real Stories From Underwater",
  description:
    "Dive stories, dive sites, and the odd shark encounter, logged from around the world by BamBam Diving.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const authed = await isAdminAuthed();

  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} ${manrope.variable} antialiased`}
      >
        <Analytics />
        <Header authed={authed} />
        <main>{children}</main>
        <Footer authed={authed} />
      </body>
    </html>
  );
}
