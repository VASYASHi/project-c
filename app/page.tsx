import Link from "next/link";

export default function Home() {
  return (
    <div className="hero">
      <h1>Программа для работы с графами</h1>
      <p>Эта программа поможет вам изучить свойства простых графов. Вы можете ввести матрицу инцидентности и узнать много интересного о вашем графе.</p>
      <p><strong>Как пользоваться:</strong> Сначала выберите количество вершин и рёбер. Потом заполните таблицу нулями и единицами. Нажмите кнопку Посчитать.</p>
      <div className="btn-grid">
        <a href="/module1" className="btn">Проверить псевдограф</a>
        <a href="/module2" className="btn">Найти петли</a>
        <a href="/module3" className="btn">Посчитать степени</a>
        <a href="/module4" className="btn">Проверить регулярность</a>
        <a href="/module5" className="btn">Составить смежность</a>
        <a href="/module6" className="btn">Проверить мультиграф</a>
      </div>
    </div>
  );
}
