import { Geist, Geist_Mono } from "next/font/google";
import ClickSpark from "@/components/ui/ClickSpark.js";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Faletehan Al Farabi — Full-Stack Web Developer",
  description: "Portfolio of Faletehan Al Farabi, Software Engineering Student and Full-Stack Web Developer focused on clean, usable web experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-zinc-100">
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={18}
          sparkCount={8}
          duration={400}
          className="flex min-h-screen flex-col"
        >
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
