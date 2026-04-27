import Link from "next/link";

export default function Home() {
  return (
    <div className="hero">
      <h1>Графы по матрице инцидентности</h1>
      <p>Калькулятор для анализа графов. Введите матрицу инцидентности (до 15x15) и получите результаты по 6 задачам.</p>
      <p><strong>Инструкция:</strong> Выберите размер матрицы, заполните её (0/1/-1 для петель), нажмите "Рассчитать".</p>
      <div className="btn-grid">
        <Link href="/module1" className="btn">1. Псевдограф</Link>
        <Link href="/module2" className="btn">2. Петли</Link>
        <Link href="/module3" className="btn">3. Степени вершин</Link>
        <Link href="/module4" className="btn">4. Регулярный</Link>
        <Link href="/module5" className="btn">5. Смежность</Link>
        <Link href="/module6" className="btn">6. Мультиграф</Link>
      </div>
    </div>
  );
}
