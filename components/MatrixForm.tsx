'use client';
import { useState, useCallback } from 'react';
import type { MatrixForm } from '@/types/matrix';

interface Props { 
  onSubmit: (data: MatrixForm) => void; 
  title: string; 
}

export default function MatrixInput({ onSubmit, title }: Props) {
  const [numVertices, setNumVertices] = useState(3);
  const [numEdges, setNumEdges] = useState(3);
  const [data, setData] = useState<number[][]>([
    [0, 0], [0, 0], [0, 0]
  ]);

  const updateVertices = (newVertices: number) => {
    if (newVertices < 1 || newVertices > 15) return;
    setNumVertices(newVertices);
    resizeMatrix();
  };

  const updateEdges = (newEdges: number) => {
    if (newEdges < 1 || newEdges > 15) return;
    setNumEdges(newEdges);
    resizeMatrix();
  };

  const resizeMatrix = () => {
    const newData = Array.from({ length: numEdges }, () => 
      Array(numVertices).fill(0)
    );
    // Копируем старые данные
    for (let e = 0; e < Math.min(numEdges, data.length); e++) {
      for (let v = 0; v < Math.min(numVertices, data[0]?.length || 0); v++) {
        newData[e][v] = data[e][v];
      }
    }
    setData(newData);
  };

  const updateCell = useCallback((row: number, col: number, val: string) => {
    const num = Math.max(-1, Math.min(2, parseInt(val) || 0)); // -1,0,1,2
    const newData = data.map(r => [...r]);
    newData[row][col] = num;
    setData(newData);
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.length !== numEdges || data[0]?.length !== numVertices) {
      alert('Размер матрицы не совпадает!');
      return;
    }
    onSubmit({ size: numVertices, data, numEdges }); // Добавил numEdges
  };

  return (
    <form onSubmit={handleSubmit} className="matrix-container">
      <h2>{title}</h2>
      
      <div className="size-input">
        <label>Вершины (столбцы): </label>
        <input 
          type="number" 
          min="1" 
          max="15" 
          value={numVertices} 
          onChange={(e) => updateVertices(+e.target.value)}
          style={{ width: '80px' }}
        />
        <label style={{ marginLeft: '2rem' }}>Рёбра (строки): </label>
        <input 
          type="number" 
          min="1" 
          max="15" 
          value={numEdges} 
          onChange={(e) => updateEdges(+e.target.value)}
          style={{ width: '80px' }}
        />
      </div>
      
      <div 
        className="matrix-input" 
        style={{ '--cols': numVertices, '--rows': numEdges } as React.CSSProperties}
      >
        {Array.from({ length: numEdges }, (_, row) =>
          Array.from({ length: numVertices }, (_, col) => (
            <input
              key={`${row}-${col}`}
              type="number"
              min="-1"
              max="2"
              value={data[row]?.[col] ?? 0}
              onChange={(e) => updateCell(row, col, e.target.value)}
            />
          ))
        )}
      </div>
      
      <button type="submit" className="btn">Рассчитать</button>
    </form>
  );
}