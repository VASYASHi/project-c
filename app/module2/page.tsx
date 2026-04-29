'use client';
import { useState } from 'react';
import type { MatrixForm } from '@/types/matrix';
import MatrixInput from '@/components/MatrixForm';

export default function Module2() {
  const [result, setResult] = useState<string | null>(null);  // ← УПРОЩЁННЫЙ тип
  const [error, setError] = useState<string | null>(null);

  const calculate = ({ data }: MatrixForm) => {
  try {
    setError(null);
    // Петли: строки с ровно 1 единицей
    const loopCount = data.filter(row => 
      row.filter(val => val === 1).length === 1
    ).length;
    setResult(`Количество петель: ${loopCount}`);
  } catch {
    setError('Ошибка в данных');
  }
};


  return (
    <div>
      <h1>Модуль 2: Количество петель</h1>
      <p>Петля — ребро, соединяющее вершину саму с собой (два 1 в строке).</p>
      <MatrixInput onSubmit={calculate} title="Матрица инцидентности" />
      {error && <div className="graph-error">{error}</div>}
      {result && <div className="result"><h3>Результат:</h3><p>{result}</p></div>}
    </div>
  );
}