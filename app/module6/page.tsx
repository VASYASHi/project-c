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
      
      // Подсчёт рёбер между парами вершин
      const edgeMap = new Map<string, number>();
      for (let e = 0; e < data.length; e++) {
        const vertices = [];
        for (let v = 0; v < size; v++) {
          if (Math.abs(data[e][v]) > 0) vertices.push(v);
        }
        
        if (vertices.length === 2) {
          const [v1, v2] = vertices.sort((a,b) => a-b);
          const key = `${v1}-${v2}`;
          edgeMap.set(key, (edgeMap.get(key) || 0) + 1);
        }
      }
      
      const hasMultiEdges = Array.from(edgeMap.values()).some(count => count > 1);
      setResult(hasMultiEdges ? 'Да, мультиграф (кратные рёбра найдены)' : 'Нет, простой граф');
    } catch (e) {
      setError(`Ошибка проверки: ${(e as Error).message}`);
    }
  };

  return (
    <div>
      <h1>Модуль 6: Мультиграф?</h1>
      <p>Мультиграф содержит кратные рёбра между вершинами.</p>
      <MatrixInput onSubmit={calculate} title="Матрица инцидентности" />
      {error && <div className="graph-error">{error}</div>}
      {result && <div className="result"><h3>Результат:</h3><p>{result}</p></div>}
    </div>
  );
}