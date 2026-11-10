import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Driven IT Solution — Your Growth Our Mission",
  description: "Next-Generation IT Portfolio & Technology Studio: Web Engineering, Digital Marketing, AI & Meta Ads, Brand Design.",
  icons: {
    icon: "/images/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#030712] text-slate-100 min-h-screen selection:bg-blue-600 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
