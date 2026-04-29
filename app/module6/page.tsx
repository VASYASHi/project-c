'use client';
import { useState } from 'react';
import type { MatrixForm } from '@/types/matrix';
import MatrixInput from '@/components/MatrixForm';

export default function Module6() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = ({ data, size }: MatrixForm) => {
  try {
    setError(null);
    
    // Считаем единицы по столбцам для каждой строки
    const isMultiGraph = data.some(row => {
      const colCounts: number[] = new Array(size).fill(0);
      row.forEach((val, col) => {
        if (val === 1) colCounts[col]++;
      });
      // Мульти: есть столбец с 2+ единицами в разных строках
      return colCounts.some(count => count > 1);
    });
    
    setResult(isMultiGraph ? 'Да, мультиграф (кратные рёбра)' : 'Нет, простой граф');
  } catch {
    setError('Ошибка в данных');
  }
};


  return (
    <div>
      <h1>Модуль 6: Мультиграф?</h1>
      <p>Мультиграф — 1 ребра между вершинами.</p>
      <MatrixInput onSubmit={calculate} title="Матрица инцидентности" />
      {error && <div className="graph-error">{error}</div>}
      {result && <div className="result"><h3>Результат:</h3><p>{result}</p></div>}
    </div>
  );
}