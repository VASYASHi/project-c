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
      const adj: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
      for (let e = 0; e < data.length; e++) {
        const vertices: number[] = [];
        for (let v = 0; v < size; v++) {
          if (Math.abs(data[e][v]) === 1) vertices.push(v);
        }
        if (vertices.length === 2) {
          const [v1, v2] = vertices;
          adj[v1][v2]++;
          adj[v2][v1]++;
        }
      }
      const isMulti = adj.some(row => row.some(val => val > 1));
      setResult(isMulti ? 'Да, мультиграф (множественные рёбра)' : 'Нет, простой граф');
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