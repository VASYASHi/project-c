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
    
    // 1. Проверка петель
    const hasLoops = data.some(row => {
      const twos = row.filter(val => val === 2).length;
      const minusOnes = row.filter(val => val === -1).length;
      return twos === 1 || minusOnes === 2;
    });
    if (hasLoops) {
      setResult('Нет, это псевдограф (найдены петли)');
      return;
    }
    
    // 2. Считаем смежность для мультирёбер
    const adj: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
    for (let e = 0; e < data.length; e++) {
      const ones = [];
      const minusOnes = [];
      for (let v = 0; v < size; v++) {
        if (data[e][v] === 1) ones.push(v);
        if (data[e][v] === -1) minusOnes.push(v);
      }
      
      // Обычное ребро: ровно один 1 и один -1
      if (ones.length === 1 && minusOnes.length === 1) {
        const [v1, v2] = [ones[0], minusOnes[0]];
        adj[v1][v2]++;
        adj[v2][v1]++;
      }
    }
    
    // Мультиграф: >1 между какими-то вершинами
    const isMulti = adj.some(row => row.some(val => val > 1));
    setResult(isMulti ? 'Да, мультиграф (кратные рёбра)' : 'Нет, простой граф');
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