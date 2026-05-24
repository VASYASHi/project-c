'use client';

import { useMemo, useState } from 'react';
import { useGraph } from '@/context/GraphContext';

type CellState = string;

export default function MatrixForm() {
  const {
    vertices,
    edges,
    matrix,
    setVertices,
    setEdges,
    setMatrix,
    clearAll,
  } = useGraph();

  const [error, setError] = useState('');
  const [focusedCell, setFocusedCell] = useState<string | null>(null);
  const [cellDrafts, setCellDrafts] = useState<Record<string, CellState>>({});

  const matrixValidity = useMemo(() => {
    return matrix.map((row) => row.filter((v) => v === 1).length === 2);
  }, [matrix]);

  const hasAnyValue = useMemo(() => {
    return matrix.some(row => row.some(v => v === 1));
  }, [matrix]);

  const keyOf = (r: number, c: number) => `${r}-${c}`;

  const syncDraftToMatrix = (r: number, c: number, value: string) => {
    const next = matrix.map(row => [...row]);
    next[r][c] = value === '' ? 0 : Number(value);
    setMatrix(next);
  };

  const handleCellFocus = (r: number, c: number) => {
    const key = keyOf(r, c);
    setFocusedCell(key);
    setCellDrafts(prev => ({
      ...prev,
      [key]: '',
    }));
  };

  const handleCellChange = (r: number, c: number, value: string) => {
    const key = keyOf(r, c);

    if (value === '') {
      setCellDrafts(prev => ({ ...prev, [key]: '' }));
      syncDraftToMatrix(r, c, '');
      setError('');
      return;
    }

    if (!/^[01]$/.test(value)) {
      setError(`Ячейка [${r + 1}, ${c + 1}]: можно вводить только 0 или 1`);
      return;
    }

    setCellDrafts(prev => ({ ...prev, [key]: value }));
    syncDraftToMatrix(r, c, value);
    setError('');
  };

  const handleCellBlur = (r: number, c: number) => {
    const key = keyOf(r, c);
    const draft = cellDrafts[key];

    if (draft === '' || draft === undefined) {
      const next = matrix.map(row => [...row]);
      next[r][c] = 0;
      setMatrix(next);
      setCellDrafts(prev => ({ ...prev, [key]: '0' }));
    }

    setFocusedCell(null);
  };

  const handleSizeChange = (setter: (n: number) => void, value: string) => {
    if (value === '') {
      setError('');
      return;
    }

    const n = Number(value);
    if (!Number.isInteger(n) || n < 1 || n > 15) {
      setError('Допустимый размер: от 1 до 15');
      return;
    }

    setError('');
    setter(n);
  };

  return (
    <section className="card">
      <h2>Матрица инцидентности</h2>

      <div className="size-row">
        <label>Вершины</label>
        <input
          type="number"
          min={1}
          max={15}
          step={1}
          value={vertices}
          onChange={(e) => handleSizeChange(setVertices, e.target.value)}
        />

        <label>Рёбра</label>
        <input
          type="number"
          min={1}
          max={15}
          step={1}
          value={edges}
          onChange={(e) => handleSizeChange(setEdges, e.target.value)}
        />

        <button type="button" className="btn" onClick={clearAll}>
          Очистить матрицу
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="matrix" style={{ gridTemplateColumns: `repeat(${vertices}, minmax(44px, 1fr))` }}>
        {Array.from({ length: edges }, (_, r) =>
          Array.from({ length: vertices }, (_, c) => {
            const key = keyOf(r, c);
            const isFocused = focusedCell === key;
            const value = cellDrafts[key] ?? String(matrix[r]?.[c] ?? 0);
            const validRow = matrixValidity[r] ?? false;

            return (
              <input
                key={key}
                type="number"
                min={0}
                max={1}
                step={1}
                value={isFocused ? value : String(matrix[r]?.[c] ?? 0)}
                onFocus={() => handleCellFocus(r, c)}
                onChange={(e) => handleCellChange(r, c, e.target.value)}
                onBlur={() => handleCellBlur(r, c)}
                className={validRow ? 'cell-valid' : 'cell-invalid'}
              />
            );
          })
        )}
      </div>

      <div className="matrix-hint">
        При фокусе значение очищается. Введите 0 или 1 с клавиатуры. В каждой строке должно быть ровно две единицы.
      </div>

      {hasAnyValue && !matrixValidity.every(Boolean) && (
        <div className="matrix-warning">
          Матрица не соответствует простому графу
        </div>
      )}
    </section>
  );
}