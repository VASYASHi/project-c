'use client';

import { useEffect, useState } from 'react';
import MatrixForm from '@/components/MatrixForm';
import { useGraph } from '@/context/GraphContext';

export default function Module2() {
  const { matrix, vertices, setLastModule, setLastResult } = useGraph();
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

    // Находим петли (строки с 1 единицей)
    const loops: number[] = [];
    matrix.forEach((row, edgeIdx) => {
      const ones = row.filter(v => v === 1).length;
      if (ones === 1) {
        // Находим номер вершины с петлей
        const vertexIdx = row.findIndex(v => v === 1);
        if (vertexIdx !== -1 && !loops.includes(vertexIdx)) {
          loops.push(vertexIdx);
        }
      }
    });

    const text = loops.length > 0 
      ? `Петли найдены у вершин: ${loops.map(v => `V${v + 1}`).join(', ')}`
      : 'Петли отсутствуют';

    setResult(text);
    setLastModule('module2');
    setLastResult(text);
  };

  useEffect(() => {
    if (matrix.some(row => row.some(v => v === 1))) run();
    else setResult('');
  }, [matrix]);

  return (
    <div className="container">
      <h1>Модуль 2: Найти петли</h1>
      <p>Петля — это ребро, у которого начало и конец находятся в одной вершине. В матрице инцидентности петля обозначается одной единицей.</p>
      
      <MatrixForm />
      
      <button onClick={run} className="btn">Рассчитать</button>
      
      {result && <div className="result">{result}</div>}
    </div>
  );
}