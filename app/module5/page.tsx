'use client';

import { useEffect, useState } from 'react';
import MatrixForm from '@/components/MatrixForm';
import { useGraph } from '@/context/GraphContext';

export default function Module5() {
  const { matrix, vertices, setAdjMatrix } = useGraph();
  const [adj, setAdj] = useState<number[][]>([]);
  const [result, setResult] = useState('');

  const run = () => {
    const hasAnyValue = matrix.some(row => row.some(v => v === 1));
    if (!hasAnyValue) {
      setResult('');
      return;
    }

    const isValid = matrix.every(row => row.filter(v => v === 1).length === 2);
    if (!isValid) {
      setResult('Невалидная матрица');
      return;
    }

    const next = Array.from({ length: vertices }, () => Array(vertices).fill(0));
    
    matrix.forEach(row => {
      const verts = row.reduce((acc, val, idx) => val === 1 ? [...acc, idx] : acc, [] as number[]);
      const [v1, v2] = verts;
      if (v1 !== undefined && v2 !== undefined) {
        next[v1][v2]++;
        next[v2][v1]++;
      }
    });

    setAdj(next);
    setAdjMatrix(next);
    setResult('Матрица смежности построена');
  };

  const exportCSV = () => {
    if (adj.length === 0) return;
    const csv = adj.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'adjacency_matrix.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareLink = async () => {
    if (adj.length === 0) return;
    try {
      const encoded = btoa(encodeURIComponent(JSON.stringify(adj)));
      const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
      await navigator.clipboard.writeText(url);
      alert('✅ Ссылка скопирована!');
    } catch (e) {
      alert('❌ Ошибка');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('data');
    if (encoded) {
      try {
        const decoded = decodeURIComponent(atob(encoded));
        const loadedMatrix = JSON.parse(decoded);
        setAdj(loadedMatrix);
        setResult('Матрица загружена из ссылки');
      } catch (e) {
        console.error('Failed to load');
      }
    }
  }, []);

  useEffect(() => {
    if (matrix.some(row => row.some(v => v === 1))) run();
    else setResult('');
  }, [matrix, vertices]);

  return (
    <div className="container">
      <h1>Модуль 5: Матрица смежности</h1>
      
      <MatrixForm />
      
      <div className="grid">
        <button onClick={run} className="btn">Рассчитать</button>
        <button onClick={exportCSV} disabled={adj.length === 0} className="btn">📥 Экспорт CSV</button>
        <button onClick={shareLink} disabled={adj.length === 0} className="btn">🔗 Скопировать ссылку</button>
      </div>
      
      {result && <div className="result">{result}</div>}
      
      {adj.length > 0 && (
        <div>
          <h3>Матрица смежности:</h3>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                {adj.map((_, i) => <th key={i}>V{i+1}</th>)}
              </tr>
            </thead>
            <tbody>
              {adj.map((row, i) => (
                <tr key={i}>
                  <th>V{i+1}</th>
                  {row.map((v, j) => (
                    <td key={j}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}