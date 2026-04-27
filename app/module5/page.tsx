'use client';
import { useState } from 'react';
import type { MatrixForm } from '@/types/matrix';
import MatrixInput from '@/components/MatrixForm';

export default function Module5() {
  const [adjMatrix, setAdjMatrix] = useState<number[][] | null>(null);
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
        } else if (vertices.length === 1) {
          const [v] = vertices;
          adj[v][v]++;
        }
      }
      setAdjMatrix(adj);
    } catch {
      setError('Ошибка в данных');
    }
  };

  return (
    <div>
      <h1>Модуль 5: Матрица смежности</h1>
      <MatrixInput onSubmit={calculate} title="Матрица инцидентности" />
      {error && <div className="graph-error">{error}</div>}
      {adjMatrix && (
        <div className="result">
          <h3>Матрица смежности:</h3>
          <table>
            <thead>
              <tr>{adjMatrix.map((_, i) => <th key={i}>V{i+1}</th>)}</tr>
            </thead>
            <tbody>
              {adjMatrix.map((row, i) => (
                <tr key={i}>
                  {row.map((val, j) => <td key={j}>{val}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}