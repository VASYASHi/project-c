'use client';
import { useState } from 'react';
import type { MatrixForm } from '@/types/matrix';
import MatrixInput from '@/components/MatrixForm';

export default function Module1() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = ({ data }: MatrixForm) => {
  try {
    // Петля = 2 в строке ИЛИ две 1 в одной вершине (невозможно)
    const hasLoops = data.some(row => row.some(val => val === 2));
    setResult(hasLoops ? 'Да, псевдограф (найдены петли со степенью 2)' : 'Нет, простой граф');
  } catch (e) {
    setError(`Ошибка вычисления: ${(e as Error).message}`);
  }
};


  return (
    <div>
      <h1>Модуль 1: Псевдограф?</h1>
      <p>Псевдограф — граф с петлями (-1 или 2 в матрице).</p>
      <MatrixInput onSubmit={calculate} title="Матрица инцидентности" />
      {error && <div className="graph-error">{error}</div>}
      {result && <div className="result"><h3>Результат:</h3><p>{result}</p></div>}
    </div>
  );
}