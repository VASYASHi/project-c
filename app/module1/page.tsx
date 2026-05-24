'use client';

import { useEffect, useState } from 'react';
import MatrixForm from '@/components/MatrixForm';
import { useGraph } from '@/context/GraphContext';

export default function Module1() {
  const { matrix, setLastModule, setLastResult } = useGraph();
  const [result, setResult] = useState('');

  const run = () => {
    const hasAnyValue = matrix.some(row => row.some(v => v === 1));
    if (!hasAnyValue) {
      setResult('');
      return;
    }

    // Проверяем валидность: в строке должно быть 1 или 2 единицы
    const isValid = matrix.every(row => {
      const ones = row.filter(v => v === 1).length;
      return ones === 1 || ones === 2;
    });

    if (!isValid) {
      setResult('Некорректная матрица (в строке должно быть 1 или 2 единицы)');
      return;
    }

    // Псевдограф = есть петли (строки с 1 единицей)
    const hasLoops = matrix.some(row => row.filter(v => v === 1).length === 1);
    const text = hasLoops ? 'Да, является псевдографом (есть петли)' : 'Нет, не является псевдографом (петель нет)';
    
    setResult(text);
    setLastModule('module1');
    setLastResult(text);
  };

  useEffect(() => {
    if (matrix.some(row => row.some(v => v === 1))) run();
    else setResult('');
  }, [matrix]);

  return (
    <div className="container">
      <h1>Модуль 1: Проверка псевдографа</h1>
      <p>Псевдограф — это граф, в котором есть петли. Петля в матрице инцидентности обозначается одной единицей в строке.</p>
      
      <MatrixForm />
      
      <button onClick={run} className="btn">Рассчитать</button>
      
      {result && <div className="result">{result}</div>}
    </div>
  );
}