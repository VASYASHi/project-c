import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar'; // Создай простой Navbar ниже

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = { title: 'Графы по матрице инцидентности' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Navbar />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}