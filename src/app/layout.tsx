import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MiMo DeFi - Yield Farming Platform',
  description: 'DeFi and yield farming platform for the Xiaomi MiMo ecosystem',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-mimo-dark min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
