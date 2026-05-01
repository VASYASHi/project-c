'use client';
import { useState, useCallback, useEffect } from 'react';
import type { MatrixForm } from '@/types/matrix';

export default function MatrixInput({ onSubmit, title }: { onSubmit: (data: MatrixForm) => void; title: string; }) {
  const [numVertices, setNumVertices] = useState(3);
  const [numEdges, setNumEdges] = useState(3);
  const [data, setData] = useState<number[][]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const newData = Array.from({ length: numEdges }, () => Array(numVertices).fill(0));
    for (let e = 0; e < Math.min(numEdges, data.length); e++) {
      for (let v = 0; v < Math.min(numVertices, data[0]?.length || 0); v++) {
        newData[e][v] = data[e][v] || 0;
      }
    }
    setData(newData);
    setError(null);
  }, [numVertices, numEdges]);

  const validateRow = (row: number[]) => {
    const nonZero = row.filter(val => Math.abs(val) > 0);
    return nonZero.length <= 2 && nonZero.every(val => [1, 2].includes(Math.abs(val)));
  };

  const getRowStatus = (rowIndex: number) => {
    const row = data[rowIndex] || [];
    const nonZeroCount = row.filter(val => Math.abs(val) > 0).length;
    if (nonZeroCount > 2) return 'error';
    if (nonZeroCount === 0) return 'empty';
    return 'valid';
  };

  const updateCell = useCallback((row: number, col: number, val: string) => {
    const num = Math.max(0, Math.min(2, parseInt(val) || 0));
    
    // Предварительная проверка строки
    const testRow = data.map(r => [...r]);
    testRow[row][col] = num;
    if (!validateRow(testRow[row])) {
      setError('В строке ребра может быть не более двух ненулевых значений (1 или 2)');
      return;
    }
    
    setData(testRow);
    setError(null);
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Финальная валидация
    const invalidRows = data.map((row, i) => validateRow(row) ? -1 : i).filter(i => i >= 0);
    if (invalidRows.length > 0) {
      setError(`Некорректные строки ребра: ${invalidRows.join(', ')+1}. Исправьте.`);
      return;
    }
    
    onSubmit({ size: numVertices, data, numEdges });
  };

  return (
    <form onSubmit={handleSubmit} className="matrix-container">
      <h2>{title}</h2>
      <p className="help-text">
        <strong>Формат:</strong> 0=нет связи, 1=связь с вершиной, 2=петля на вершине. Макс. 2 ненулевых в строке.
      </p>
      
      <div className="size-input">
        <label>Вершины: </label>
        <input type="number" min="1" max="15" value={numVertices} onChange={e => setNumVertices(+e.target.value)} />
        <label style={{ marginLeft: '2rem' }}>Рёбра: </label>
        <input type="number" min="1" max="15" value={numEdges} onChange={e => setNumEdges(+e.target.value)} />
      </div>
      
      {error && <div className="graph-error">{error}</div>}
      
      <div className="matrix-input" style={{ '--cols': numVertices, '--rows': numEdges } as React.CSSProperties}>
        {Array.from({ length: numEdges }, (_, row) =>
          Array.from({ length: numVertices }, (_, col) => {
            const status = getRowStatus(row);
            return (
              <input
                key={`${row}-${col}`}
                type="number"
                min="0"
                max="2"
                value={data[row]?.[col] ?? 0}
                onChange={e => updateCell(row, col, e.target.value)}
                className={`matrix-cell ${status}`}
              />
            );
          })
        )}
      </div>
      
      <button type="submit" className="btn">Рассчитать</button>
    </form>
  );
}