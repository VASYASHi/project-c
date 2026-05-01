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
      if (size === 0) {
        setResult('Да, тривиально регулярный (пустой граф)');
        return;
      }
      
      const degrees = new Array(size).fill(0);
      for (let v = 0; v < size; v++) {
        for (let e = 0; e < data.length; e++) {
          const val = Math.abs(data[e][v]);
          if (val > 0) {
            const incidentCount = data[e].filter(x => Math.abs(x) > 0).length;
            degrees[v] += (incidentCount === 1) ? val * 2 : val;
          }
        }
      }
      
      if (degrees.some(d => isNaN(d) || !isFinite(d))) {
        setError('Некорректные степени вершин');
        return;
      }
      
      const isRegular = degrees.every(d => d === degrees[0]);
      const degree = degrees[0];
      setResult(isRegular ? `Да, регулярный ${degree}-граф` : 'Нет, нерегулярный');
    } catch (e) {
      setError(`Ошибка проверки: ${(e as Error).message}`);
    }
  };

  return (
    <div>
      <h1>Модуль 4: Регулярный граф?</h1>
      <p>Все вершины имеют одинаковую степень.</p>
      <MatrixInput onSubmit={calculate} title="Матрица инцидентности" />
      {error && <div className="graph-error">{error}</div>}
      {result && <div className="result"><h3>Результат:</h3><p>{result}</p></div>}
    </div>
  );
}
