import './globals.css';
import Link from 'next/link';
import { GraphProvider } from '@/context/GraphContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <GraphProvider>
          <nav className="navbar">
            <Link href="/">Главная</Link>
            <Link href="/module1">Псевдограф</Link>
            <Link href="/module2">Петли</Link>
            <Link href="/module3">Степени</Link>
            <Link href="/module4">Регулярность</Link>
            <Link href="/module5">Смежность</Link>
            <Link href="/module6">Мультиграф</Link>
          </nav>
          <main className="container">{children}</main>
        </GraphProvider>
      </body>
    </html>
  );
}