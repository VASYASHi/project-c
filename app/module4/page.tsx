'use client';

import { useEffect, useState } from 'react';
import MatrixForm from '@/components/MatrixForm';
import { useGraph } from '@/context/GraphContext';

export default function Module4() {
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

    // Считаем степени (петля = ×2)
    const degrees = Array(vertices).fill(0);
    
    matrix.forEach(row => {
      const ones = row.filter(v => v === 1).length;
      
      if (ones === 1) {
        const idx = row.findIndex(v => v === 1);
        if (idx !== -1) degrees[idx] += 2;
      } else if (ones === 2) {
        row.forEach((val, idx) => {
          if (val === 1) degrees[idx]++;
        });
      }
    });

    // Проверяем регулярность
    const isRegular = degrees.every(d => d === degrees[0]);
    const text = isRegular 
      ? `Да, граф регулярный (все вершины имеют степень ${degrees[0]})`
      : 'Нет, граф нерегулярный (степени вершин различаются)';
    
    setResult(text);
  };

  useEffect(() => {
    if (matrix.some(row => row.some(v => v === 1))) run();
    else setResult('');
  }, [matrix, vertices]);

  return (
    <div className="container">
      <h1>Модуль 4: Проверить регулярность</h1>
      <p>Регулярный граф — граф, у которого все вершины имеют одну и ту же степень.</p>
      
      <MatrixForm />
      
      <button onClick={run} className="btn">Рассчитать</button>
      
      {result && <div className="result">{result}</div>}
    </div>
  );
}