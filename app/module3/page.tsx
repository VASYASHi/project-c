'use client';
import { useState } from 'react';
import type { MatrixForm } from '@/types/matrix';
import MatrixInput from '@/components/MatrixForm';

export default function Module3() {
  const [result, setResult] = useState<{ degrees: string; even: string; odd: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = ({ data, size }: MatrixForm) => {
  try {
    const degrees = new Array(size).fill(0);
    for (let v = 0; v < size; v++) {
      for (let e = 0; e < data.length; e++) {
        const val = Math.abs(data[e][v]);
        if (val > 0) {
          // Петля = ребро только для этой вершины
          const isOnlyThisVertex = data[e].filter(x => Math.abs(x) > 0).length === 1;
          degrees[v] += isOnlyThisVertex ? val * 2 : val;
        }
      }
    }
    
    const even = degrees.map((d,i) => d%2===0 ? i+1 : null).filter(Boolean);
    const odd = degrees.map((d,i) => d%2===1 ? i+1 : null).filter(Boolean);
    
    setResult({
      degrees: `Степени: [${degrees.join(', ')}]`,
      even: `Чётные (${even.length}): ${even.join(', ') || 'нет'}`,
      odd: `Нечётные (${odd.length}): ${odd.join(', ') || 'нет'}`
    });
  } catch (e) {
    setError(`Ошибка: ${(e as Error).message}`);
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