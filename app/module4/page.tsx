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

    if (matrix.length === 0 || vertices === 0) {
      setResult('Да, регулярный (пустой)');
      return;
    }

    const isValid = matrix.every(row => row.filter(v => v === 1).length === 2);
    if (!isValid) {
      setResult('Некорректная матрица');
      return;
    }

    const degrees = Array(vertices).fill(0);
    matrix.forEach(row => {
      row.forEach((val, idx) => {
        if (val === 1) degrees[idx]++;
      });
    });

    const isRegular = degrees.every(d => d === degrees[0]);
    setResult(isRegular ? `Да, регулярный степени ${degrees[0]}` : 'Нет');
  };

  useEffect(() => {
    if (matrix.some(row => row.some(v => v === 1))) run();
    else setResult('');
  }, [matrix, vertices]);

  return (
    <div className="container">
      <h1>Модуль 4: Проверить регулярность</h1>
      
      <MatrixForm />
      
      <button onClick={run} className="btn">Рассчитать</button>
      
      {result && <div className="result">{result}</div>}
    </div>
  );
}