import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Provider } from 'react-redux'
import { Providers } from "./components/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StorySpace app",
  description: "A plaatform where you can share you stories or ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Providers>
            <Header />
            {children}
          </Providers>
        </body>
    </html>
  );
}
