'use client';
import { useState, useCallback } from 'react';
import type { MatrixForm } from '@/types/matrix';
// import './MatrixForm.module.css';  // Если есть локальные стили

interface Props { 
  onSubmit: (data: MatrixForm) => void; 
  title: string; 
}

export default function MatrixInput({ onSubmit, title }: Props) {
  const [size, setSize] = useState(3);
  const [data, setData] = useState<number[][]>([
    [0, 0], [0, 0], [0, 0]
  ]);

  const updateSize = (newSize: number) => {
    if (newSize < 1 || newSize > 15) return;
    setSize(newSize);
    const newData = Array.from({ length: newSize }, () => 
      Array(newSize).fill(0)
    );
    // Копируем старые данные
    for (let i = 0; i < Math.min(newSize, data.length); i++) {
      for (let j = 0; j < Math.min(newSize, data[0]?.length || 0); j++) {
        newData[i][j] = data[i][j];
      }
    }
    setData(newData);
  };

  const updateCell = useCallback((row: number, col: number, val: string) => {
    const num = Math.max(-1, Math.min(1, parseInt(val) || 0));
    const newData = data.map(r => [...r]);
    newData[row][col] = num;
    setData(newData);
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ size, data });
  };

  return (
    <form onSubmit={handleSubmit} className="matrix-container">
      <h2>{title}</h2>
      <div className="size-input">
        <label>Размер (вершины): </label>
        <input 
          type="number" 
          min="1" 
          max="15" 
          value={size} 
          onChange={(e) => updateSize(+e.target.value)} 
        />
      </div>
      
      <div 
        className="matrix-input" 
        style={{ '--size': size } as React.CSSProperties}
      >
        {Array.from({ length: size }, (_, i) =>
          Array.from({ length: size }, (_, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              min="-1"
              max="1"
              value={data[i]?.[j] ?? 0}
              onChange={(e) => updateCell(i, j, e.target.value)}
            />
          ))
        )}
      </div>
      
      <button type="submit" className="btn">Рассчитать</button>
    </form>
  );
}