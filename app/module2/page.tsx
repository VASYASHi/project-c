'use client';
import { useState } from 'react';
import type { MatrixForm } from '@/types/matrix';
import MatrixInput from '@/components/MatrixForm';

export default function Module2() {
  const [result, setResult] = useState<{ perVertex: string; total: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = ({ data, size }: MatrixForm) => {
    try {
      setError(null);
      const loopsPerVertex = new Array(size).fill(0);
      for (let v = 0; v < size; v++) {
        for (let e = 0; e < data.length; e++) {
          if (data[e][v] === -1) loopsPerVertex[v]++;
        }
      }
      const totalLoops = loopsPerVertex.reduce((a, b) => a + b, 0);
      setResult({
        perVertex: `По вершинам: [${loopsPerVertex.join(', ')}]`,
        total: `Общее количество: ${totalLoops}`
      });
    } catch {
      setError('Ошибка в данных');
    }
  };

  return (
    <div>
      <h1>Модуль 2: Количество петель</h1>
      <MatrixInput onSubmit={calculate} title="Матрица инцидентности" />
      {error && <div className="graph-error">{error}</div>}
      {result && (
        <div className="result">
          <h3>Результат:</h3>
          <p>{result.perVertex}</p>
          <p><strong>{result.total}</strong></p>
        </div>
      )}
    </div>
  );
}