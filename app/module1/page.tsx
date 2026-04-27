'use client';
import { useState } from 'react';
import type { MatrixForm } from '@/types/matrix';
import MatrixInput from '@/components/MatrixForm';

export default function Module1() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = ({ data, size }: MatrixForm) => {
    try {
      setError(null);
      const hasLoops = data.some((row) => row.some((val) => val === -1));
      setResult(hasLoops ? 'Да, это псевдограф (найдены петли)' : 'Нет, обычный граф');
    } catch {
      setError('Ошибка в данных');
    }
  };

  return (
    <div>
      <h1>Модуль 1: Псевдограф?</h1>
      <p>Псевдограф — граф с петлями (элемент -1 в матрице).</p>
      <MatrixInput onSubmit={calculate} title="Матрица инцидентности" />
      {error && <div className="graph-error">{error}</div>}
      {result && <div className="result"><h3>Результат:</h3><p>{result}</p></div>}
    </div>
  );
}