import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/components/providers/web3-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Nav } from "@/components/layout/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shadcn Token Swapper",
  description: "Shadcn Token Swapper template.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Web3Provider>
            <Nav />
            {children}
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
