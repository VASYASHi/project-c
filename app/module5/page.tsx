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
      const adj = Array.from({ length: size }, () => Array(size).fill(0));
      
      for (let e = 0; e < data.length; e++) {
        const vertices = [];
        for (let v = 0; v < size; v++) {
          if (Math.abs(data[e][v]) > 0) vertices.push(v);
        }
        
        if (vertices.length === 1) {
          // Петля
          const [v] = vertices;
          adj[v][v] += 2; // Петля даёт 2 в диагонали
        } else if (vertices.length === 2) {
          // Обычное ребро
          const [v1, v2] = vertices;
          adj[v1][v2]++;
          adj[v2][v1]++;
        }
      }
      
      setAdjMatrix(adj);
    } catch (e) {
      setError(`Ошибка преобразования: ${(e as Error).message}`);
    }
  };

  return (
    <div>
      <h1>Модуль 5: Матрица смежности</h1>
      <p>Преобразование из матрицы инцидентности.</p>
      <MatrixInput onSubmit={calculate} title="Матрица инцидентности" />
      {error && <div className="graph-error">{error}</div>}
      {adjMatrix && (
        <div className="result">
          <h3>Матрица смежности:</h3>
          <table>
            <thead><tr>{adjMatrix.map((_,i) => <th key={i}>V{i+1}</th>)}</tr></thead>
            <tbody>{adjMatrix.map((row,i) => (
              <tr key={i}>{row.map((val,j) => <td key={j}>{val}</td>)}</tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}