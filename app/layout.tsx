import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/layout/SiteNav";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Margaret's Journey in EE",
  description:
    "Embedded systems, robotics, and PCB design projects, notes, and engineering journals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text-primary">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border">
          <div className="max-w-5xl mx-auto px-6 py-8 font-mono text-[11px] text-text-tertiary flex justify-between">
            <span>Margaret · Electrical Engineering</span>
            <span>Projects, notes, and ongoing work</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
