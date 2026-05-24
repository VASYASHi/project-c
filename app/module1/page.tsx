'use client';

import { useEffect, useState } from 'react';
import MatrixForm from '@/components/MatrixForm';
import { useGraph } from '@/context/GraphContext';

export default function Module1() {
  const { matrix, setLastModule, setLastResult } = useGraph();
  const [result, setResult] = useState('');

  const run = () => {
    const hasAnyValue = matrix.some(row => row.some(v => v === 1));
    if (!hasAnyValue) {
      setResult('');
      return;
    }

    const isPseudograph = matrix.some(row => row.filter(v => v === 1).length !== 2);
    const text = isPseudograph ? 'Да, нарушена структура простого графа' : 'Нет';
    setResult(text);
    setLastModule('module1');
    setLastResult(text);
  };

  useEffect(() => {
    if (matrix.some(row => row.some(v => v === 1))) run();
    else setResult('');
  }, [matrix]);

  return (
    <section className="card">
      <h1>Модуль 1: Проверка псевдографа</h1>
      <p>Для простого графа в каждой строке должно быть ровно две единицы.</p>
      <MatrixForm />
      <button className="btn" onClick={run}>Рассчитать</button>
      {result && <div className="result">{result}</div>}
    </section>
  );
}