'use client';

import { useEffect, useState } from 'react';
import MatrixForm from '@/components/MatrixForm';
import { useGraph } from '@/context/GraphContext';

export default function Module3() {
  const { matrix, vertices } = useGraph();
  const [result, setResult] = useState('');

  const validate = (m: number[][]) => m.every(row => row.filter(v => v === 1).length === 2);

  const run = () => {
    const hasAnyValue = matrix.some(row => row.some(v => v === 1));
    if (!hasAnyValue) {
      setResult('');
      return;
    }

    if (!validate(matrix)) {
      setResult('Матрица не соответствует простому графу');
      return;
    }

    const degrees = Array(vertices).fill(0);
    matrix.forEach(row => row.forEach((val, idx) => {
      if (val === 1) degrees[idx]++;
    }));

    setResult(`Степени: ${degrees.join(', ')}`);
  };

  useEffect(() => {
    if (matrix.some(row => row.some(v => v === 1))) run();
    else setResult('');
  }, [matrix, vertices]);

  return (
    <section className="card">
      <h1>Модуль 3: Посчитать степени вершин</h1>
      <MatrixForm />
      <button className="btn" onClick={run}>Рассчитать</button>
      {result && <div className="result">{result}</div>}
    </section>
  );
}