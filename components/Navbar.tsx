'use client';
import Link from 'next/link';

export default function Navbar() {
  const links = [
    { href: '/', label: 'Главная' },
    { href: '/module1', label: 'Псевдограф' },
    { href: '/module2', label: 'Петли' },
    { href: '/module3', label: 'Степени' },
    { href: '/module4', label: 'Регулярный' },
    { href: '/module5', label: 'Смежность' },
    { href: '/module6', label: 'Мультиграф' },
  ];
  return (
    <nav className="navbar">
      <ul>
        {links.map(({ href, label }) => (
          <li key={href}><Link href={href}>{label}</Link></li>
        ))}
      </ul>
    </nav>
  );
}