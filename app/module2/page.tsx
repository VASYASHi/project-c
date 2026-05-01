'use client';
import { useState } from 'react';
import type { MatrixForm } from '@/types/matrix';
import MatrixInput from '@/components/MatrixForm';

export default function Module2() {
  const [result, setResult] = useState<string | null>(null);  // ← УПРОЩЁННЫЙ тип
  const [error, setError] = useState<string | null>(null);

  const calculate = ({ data }: MatrixForm) => {
  try {
    const loops = data.filter(row => row.some(val => val === 2));
    const loopVertices = loops.map(row => 
      row.findIndex(val => val === 2) + 1
    );
    setResult(
      `Петли найдены на вершинах: ${loopVertices.length ? loopVertices.join(', ') : 'нет'} (${loopVertices.length})`
    );
  } catch (e) {
    setError(`Ошибка: ${(e as Error).message}`);
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