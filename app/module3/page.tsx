'use client';

import { useEffect, useState } from 'react';
import MatrixForm from '@/components/MatrixForm';
import { useGraph } from '@/context/GraphContext';

export default function Module3() {
  const { matrix, vertices } = useGraph();
  const [result, setResult] = useState('');

  const run = () => {
    const hasAnyValue = matrix.some(row => row.some(v => v === 1));
    if (!hasAnyValue) {
      setResult('');
      return;
    }

    // Проверяем валидность
    const isValid = matrix.every(row => {
      const ones = row.filter(v => v === 1).length;
      return ones === 1 || ones === 2;
    });

    if (!isValid) {
      setResult('Некорректная матрица');
      return;
    }

    // Считаем степени
    // Петля учитывается ДВАЖДЫ (как в материале)
    const degrees = Array(vertices).fill(0);
    
    matrix.forEach(row => {
      const ones = row.filter(v => v === 1).length;
      
      if (ones === 1) {
        // Петля: +2 к степени вершины
        const idx = row.findIndex(v => v === 1);
        if (idx !== -1) degrees[idx] += 2;
      } else if (ones === 2) {
        // Обычное ребро: +1 к каждой из двух вершин
        row.forEach((val, idx) => {
          if (val === 1) degrees[idx]++;
        });
      }
    });

    const text = `Степени вершин: ${degrees.map((d, i) => `deg(V${i + 1})=${d}`).join('; ')}`;
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
      
      {result && <div className="result">{result}</div>}
    </div>
  );
}