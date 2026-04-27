'use client';
import { useState } from 'react';
import type { MatrixForm } from '@/types/matrix';
import MatrixInput from '@/components/MatrixForm';

export default function Module4() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = ({ data, size }: MatrixForm) => {
    try {
      setError(null);
      const degrees = new Array(size).fill(0);
      for (let v = 0; v < size; v++) {
        for (let e = 0; e < data.length; e++) {
          degrees[v] += Math.abs(data[e][v]);
        }
      }
      const isRegular = degrees.every(d => d === degrees[0]);
      const degree = degrees[0];
      setResult(isRegular ? `Да, регулярный ${degree}-го порядка` : 'Нет');
    } catch {
      setError('Ошибка в данных');
    }
  };

  return (
    <div>
      <h1>Модуль 4: Регулярный граф?</h1>
      <p>Регулярный — все вершины одной степени.</p>
      <MatrixInput onSubmit={calculate} title="Матрица инцидентности" />
      {error && <div className="graph-error">{error}</div>}
      {result && <div className="result"><h3>Результат:</h3><p>{result}</p></div>}
    </div>
  );
}