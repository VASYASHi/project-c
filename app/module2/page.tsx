'use client';

import { useEffect, useState } from 'react';
import MatrixForm from '@/components/MatrixForm';
import { useGraph } from '@/context/GraphContext';

export default function Module2() {
  const { matrix, setLastModule, setLastResult } = useGraph();
  const [result, setResult] = useState('');

  const run = () => {
    const hasAnyValue = matrix.some(row => row.some(v => v === 1));
    if (!hasAnyValue) {
      setResult('');
      return;
    }

    const invalidRows = matrix.filter(row => row.filter(v => v === 1).length !== 2).length;
    const text = invalidRows > 0
      ? `Найдено ${invalidRows} рёбер с нарушенной структурой`
      : 'Петель нет (граф простой)';

    setResult(text);
    setLastModule('module2');
    setLastResult(text);
  };

  useEffect(() => {
    if (matrix.some(row => row.some(v => v === 1))) run();
    else setResult('');
  }, [matrix]);

  return (
    <section className="card">
      <h1>Модуль 2: Найти петли</h1>
      <MatrixForm />
      <button className="btn" onClick={run}>Рассчитать</button>
      {result && <div className="result">{result}</div>}
    </section>
  );
}