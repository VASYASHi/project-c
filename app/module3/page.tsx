'use client';

import { useEffect, useState } from 'react';
import MatrixForm from '@/components/MatrixForm';
import { useGraph } from '@/context/GraphContext';

export default function Module3() {
  const { matrix, vertices } = useGraph();
  const [result, setResult] = useState('');
  const [degrees, setDegrees] = useState<number[]>([]);

  const run = () => {
  const hasAnyValue = matrix.some(row => row.some(v => v === 1));
  if (!hasAnyValue) {
    setResult('');
    setDegrees([]);
    return;
  }

  // Проверяем валидность: в строке должно быть 1 или 2 единицы
  const isValid = matrix.every(row => {
    const ones = row.filter(v => v === 1).length;
    return ones === 1 || ones === 2;
  });

  if (!isValid) {
    setResult('Некорректная матрица');
    setDegrees([]);
    return;
  }

  // Считаем степени
  // Петля учитывается ДВАЖДЫ (как в материале)
  const degs = Array(vertices).fill(0);
  
  matrix.forEach(row => {
    const ones = row.filter(v => v === 1).length;
    
    if (ones === 1) {
      // Петля: +2 к степени вершины
      const idx = row.findIndex(v => v === 1);
      if (idx !== -1) degs[idx] += 2;
    } else if (ones === 2) {
      // Обычное ребро: +1 к каждой из двух вершин
      row.forEach((val, idx) => {
        if (val === 1) degs[idx]++;
      });
    }
  });

  // Сохраняем степени в состояние для отображения таблицы
  setDegrees(degs);
  
  // Формируем текст результата
  const text = `Степени вершин: ${degs.map((d, i) => `deg(V${i + 1})=${d}`).join('; ')}`;
  setResult(text);
};

  useEffect(() => {
    if (matrix.some(row => row.some(v => v === 1))) run();
    else setResult('');
  }, [matrix, vertices]);

  return (
    <div className="container">
      <h1>Модуль 3: Посчитать степени вершин</h1>
      <p>Степень вершины — количество рёбер, инцидентных этой вершине. Петля учитывается дважды.</p>
      
      <MatrixForm />
      
      <button onClick={run} className="btn">Рассчитать</button>
      
      {result && (
  <div className="result">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>{result}</span>
      <table className="table" style={{ marginLeft: '20px', width: 'auto' }}>
        <thead>
          <tr><th>Вершина</th><th>Степень</th></tr>
        </thead>
        <tbody>
          {degrees.map((d, i) => (
            <tr key={i}>
              <td>V{i + 1}</td>
              <td>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
    </div>
  );
}