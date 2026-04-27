'use client';
import { useState } from 'react';
import type { MatrixForm } from '@/types/matrix';
import MatrixInput from '@/components/MatrixForm';

export default function Module3() {
  const [result, setResult] = useState<{ degrees: string; even: string; odd: string } | null>(null);
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
      const evenVertices = degrees.map((d, i) => d % 2 === 0 ? i + 1 : null).filter(Boolean);
      const oddVertices = degrees.map((d, i) => d % 2 === 1 ? i + 1 : null).filter(Boolean);
      setResult({
        degrees: `Степени: [${degrees.join(', ')}]`,
        even: `Чётные (${evenVertices.length}): ${evenVertices.join(', ') || 'нет'}`,
        odd: `Нечётные (${oddVertices.length}): ${oddVertices.join(', ') || 'нет'}`
      });
    } catch {
      setError('Ошибка в данных');
    }
  };

  return (
    <div>
      <h1>Модуль 3: Степени вершин</h1>
      <MatrixInput onSubmit={calculate} title="Матрица инцидентности" />
      {error && <div className="graph-error">{error}</div>}
      {result && (
        <div className="result">
          <h3>Результат:</h3>
          <p>{result.degrees}</p>
          <p>{result.even}</p>
          <p>{result.odd}</p>
        </div>
      )}
    </div>
  );
}