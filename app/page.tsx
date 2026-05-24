import Link from 'next/link';

export default function Home() {
  return (
    <section className="card intro">
      <h1>Анализ графов по матрице инцидентности</h1>
      <p>Введите таблицу с нулями и единицами. В каждой строке должно быть ровно две единицы.</p>

      <div className="grid">
        <Link className="btn" href="/module1">Псевдограф</Link>
        <Link className="btn" href="/module2">Петли</Link>
        <Link className="btn" href="/module3">Степени вершин</Link>
        <Link className="btn" href="/module4">Регулярность</Link>
        <Link className="btn" href="/module5">Матрица смежности</Link>
        <Link className="btn" href="/module6">Мультиграф</Link>
      </div>
    </section>
  );
}
