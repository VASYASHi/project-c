'use client';
import { useState, useCallback, useEffect } from 'react';
import type { MatrixForm } from '@/types/matrix';

interface Props { onSubmit: (data: MatrixForm) => void; title: string; }

export default function MatrixInput({ onSubmit, title }: Props) {
  const [numVertices, setNumVertices] = useState(3);
  const [numEdges, setNumEdges] = useState(3);
  const [data, setData] = useState<number[][]>([]);

  useEffect(() => {
    const newData: number[][] = Array.from({ length: numEdges }, () => 
      Array(numVertices).fill(0)
    );
    for (let e = 0; e < Math.min(numEdges, data.length); e++) {
      for (let v = 0; v < Math.min(numVertices, data[0]?.length || 0); v++) {
        newData[e][v] = data[e][v] || 0;
      }
    }
    setData(newData);
  }, [numVertices, numEdges]);

  const updateVertices = (newVertices: number) => {
    if (newVertices >= 1 && newVertices <= 15) setNumVertices(newVertices);
  };

  const updateEdges = (newEdges: number) => {
    if (newEdges >= 1 && newEdges <= 15) setNumEdges(newEdges);
  };

  const updateCell = useCallback((row: number, col: number, val: string) => {
  const num = val === '1' ? 1 : (val === '0' ? 0 : 0); // Только 0 или 1
  setData(prev => {
    const newData = prev.map(r => [...r]);
    newData[row][col] = num;
    return newData;
  });
}, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ size: numVertices, data, numEdges });
  };

  return (
    <form onSubmit={handleSubmit} className="matrix-container">
      <h2>{title}</h2>
      
      <div className="size-input">
        <label>Количество вершин: </label>
        <input type="number" min="1" max="15" value={numVertices} onChange={e => updateVertices(+e.target.value)} />
        <label style={{ marginLeft: '2rem' }}>Количество рёбер: </label>
        <input type="number" min="1" max="15" value={numEdges} onChange={e => updateEdges(+e.target.value)} />
      </div>
      
      <div className="matrix-input" style={{ '--cols': numVertices, '--rows': numEdges } as React.CSSProperties}>
        {Array.from({ length: numEdges }, (_, row) =>
          Array.from({ length: numVertices }, (_, col) => (
            <input
              key={`${row}-${col}`}
              type="number"
              min="0"
              max="1"
              step="1"
              value={data[row]?.[col] ?? 0}
              onChange={e => updateCell(row, col, e.target.value)}
            />
          ))
        )}
      </div>
      
      <button type="submit" className="btn">Посчитать</button>
    </form>
  );
}