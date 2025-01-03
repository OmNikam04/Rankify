import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Load Poppins font with specific weights
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add desired font weights
  variable: '--font-poppins', // Custom CSS variable for the font
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>        
        <header className="bg-gray-800 text-white py-4 shadow-md">
          <nav className="container mx-auto flex justify-between">
            <h1 className="text-xl text-white font-bold">Rankify</h1>
            <div>
              <a href="/" className="mr-4 hover:underline">
                Home
              </a>
              <a href="/rankings" className="hover:underline">
                Rankings
              </a>
            </div>
          </nav>
        </header>
        <main className="container mx-auto flex-grow py-6">{children}</main>
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>&copy; 2025 ELO Decision Maker</p>
        </footer>
        </Providers>
      </body>
    </html>
  );
}
