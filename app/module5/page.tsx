'use client';

import { useEffect, useState } from 'react';
import MatrixForm from '@/components/MatrixForm';
import { useGraph } from '@/context/GraphContext';

export default function Module5() {
  const { matrix, vertices, setAdjMatrix } = useGraph();
  const [adj, setAdj] = useState<number[][]>([]);
  const [result, setResult] = useState('');

  const validate = (m: number[][]) => m.every(row => row.filter(v => v === 1).length === 2);

  const run = () => {
    const hasAnyValue = matrix.some(row => row.some(v => v === 1));
    if (!hasAnyValue) {
      setResult('');
      return;
    }

    if (!validate(matrix)) {
      setResult('Невалидная матрица');
      return;
    }

    const next = Array.from({ length: vertices }, () => Array(vertices).fill(0));
    matrix.forEach(row => {
      const verts = row.reduce<number[]>((acc, val, idx) => val === 1 ? [...acc, idx] : acc, []);
      const [v1, v2] = verts;
      next[v1][v2]++;
      next[v2][v1]++;
    });

    setAdj(next);
    setAdjMatrix(next);
    setResult('Матрица смежности построена');
  };

  const exportCSV = () => {
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
    const encoded = btoa(encodeURIComponent(JSON.stringify(adj)));
    const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
    await navigator.clipboard.writeText(url);
    alert('Ссылка скопирована!');
  };

  useEffect(() => {
    if (matrix.some(row => row.some(v => v === 1))) run();
    else setResult('');
  }, [matrix, vertices]);

  return (
    <section className="card">
      <h1>Модуль 5: Матрица смежности</h1>
      <MatrixForm />
      <button className="btn" onClick={run}>Рассчитать</button>
      <button className="btn" onClick={exportCSV}>Экспорт CSV</button>
      <button className="btn" onClick={shareLink}>Скопировать ссылку</button>
      {result && <div className="result">{result}</div>}
      {adj.length > 0 && (
        <table className="table">
          <tbody>
            {adj.map((row, i) => (
              <tr key={i}>{row.map((v, j) => <td key={j}>{v}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}