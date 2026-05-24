'use client';

import { useEffect, useState } from 'react';
import MatrixForm from '@/components/MatrixForm';
import { useGraph } from '@/context/GraphContext';

export default function Module6() {
  const { matrix } = useGraph();
  const [result, setResult] = useState('');

  const run = () => {
    const hasAnyValue = matrix.some(row => row.some(v => v === 1));
    if (!hasAnyValue) {
      setResult('');
      return;
    }

    // Проверяем валидность
    const isValid = matrix.every(row => {
      const ones = row.filter(v => v === 1).length;
      return ones === 1 || ones === 2;
    });

    if (!isValid) {
      setResult('Некорректная матрица');
      return;
    }

    // Проверяем на мультиграф (кратные рёбра)
    // Игнорируем петли (строки с 1 единицей)
    const edgeSignatures: string[] = [];
    
    matrix.forEach(row => {
      const ones = row.filter(v => v === 1).length;
      
      if (ones === 2) {
        // Обычное ребро: создаём сигнатуру (отсортированную пару вершин)
        const verts = row
          .reduce((acc, val, idx) => val === 1 ? [...acc, idx] : acc, [] as number[])
          .sort((a, b) => a - b)
          .join(',');
        edgeSignatures.push(verts);
      }
    });

    // Если есть повторяющиеся сигнатуры → мультиграф
    const isMultigraph = new Set(edgeSignatures).size !== edgeSignatures.length;
    const text = isMultigraph 
      ? 'Да, является мультиграфом (есть кратные рёбра)'
      : 'Нет, не является мультиграфом (кратных рёбер нет)';
    
    setResult(text);
  };

  useEffect(() => {
    if (matrix.some(row => row.some(v => v === 1))) run();
    else setResult('');
  }, [matrix]);

  return (
    <div className="container">
      <h1>Модуль 6: Проверить мультиграф</h1>
      <p>Мультиграф — граф, в котором есть вершины, соединённые более чем одним ребром.</p>
      
      <MatrixForm />
      
      <button onClick={run} className="btn">Рассчитать</button>
      
      {result && <div className="result">{result}</div>}
    </div>
  );
}