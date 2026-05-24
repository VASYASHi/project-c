'use client';

import { useEffect, useState } from 'react';
import MatrixForm from '@/components/MatrixForm';
import { useGraph } from '@/context/GraphContext';

export default function Module6() {
  const { matrix } = useGraph();
  const [result, setResult] = useState('');

  const run = () => {
    const hasAnyValue = matrix.some(row => row.some(v => v === 1));
    if (!hasAnyValue) {
      setResult('');
      return;
    }

    const isValid = matrix.every(row => row.filter(v => v === 1).length === 2);
    if (!isValid) {
      setResult('Некорректная матрица');
      return;
    }

    const getEdgeKey = (row: number[]) =>
      row
        .reduce((acc, val, idx) => val === 1 ? [...acc, idx] : acc, [] as number[])
        .sort((a, b) => a - b)
        .join(',');

    const keys = matrix.map(getEdgeKey);
    const isMultigraph = new Set(keys).size !== keys.length;
    
    setResult(isMultigraph ? 'Да, есть кратные рёбра' : 'Нет, граф простой');
  };

  useEffect(() => {
    if (matrix.some(row => row.some(v => v === 1))) run();
    else setResult('');
  }, [matrix]);

  return (
    <div className="container">
      <h1>Модуль 6: Проверить мультиграф</h1>
      
      <MatrixForm />
      
      <button onClick={run} className="btn">Рассчитать</button>
      
      {result && <div className="result">{result}</div>}
    </div>
  );
}