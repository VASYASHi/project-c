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
  const [focusedSize, setFocusedSize] = useState<'v' | 'e' | null>(null);
  const [sizeDrafts, setSizeDrafts] = useState<{ v?: string; e?: string }>({});
  const [focusedCell, setFocusedCell] = useState<string | null>(null);
  const [cellDrafts, setCellDrafts] = useState<Record<string, CellState>>({});

  const matrixValidity = useMemo(() => {
    return matrix.map((row) => {
      const ones = row.filter((v) => v === 1).length;
      return ones === 1 || ones === 2; // 1 = петля, 2 = обычное ребро
    });
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

  // const handleSizeChange = (setter: (n: number) => void, value: string) => {
  //   if (value === '') {
  //     setError('');
  //     return;
  //   }

  //   const n = Number(value);
  //   if (!Number.isInteger(n) || n < 1 || n > 15) {
  //     setError('Допустимый размер: от 1 до 15');
  //     return;
  //   }

  //   setError('');
  //   setter(n);
  // };

  const handleSizeFocus = (type: 'v' | 'e') => {
    setFocusedSize(type);
    setSizeDrafts(prev => ({ ...prev, [type]: '' }));
  };

  const handleSizeChange = (type: 'v' | 'e', val: string) => {
    if (val !== '' && !/^[0-9]+$/.test(val)) return;
    setSizeDrafts(prev => ({ ...prev, [type]: val }));
    if (val === '') return;
  
    const n = Number(val);
    if (n < 1 || n > 15) {
      setError('Размер: от 1 до 15');
      return;
    }
    setError('');
    if (type === 'v') setVertices(n);
    else setEdges(n);
  };

  const handleSizeBlur = (type: 'v' | 'e', current: number) => {
    if (!sizeDrafts[type]) {
      setSizeDrafts(prev => ({ ...prev, [type]: String(current) }));
    }
    setFocusedSize(null);
  };

  return (
    <section className="card">
      <h2>Матрица инцидентности</h2>

      <div className="size-row">
        <label style={{ fontWeight: 'bold' }}>
          Вершины:
          <input
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={focusedSize === 'v' ? (sizeDrafts.v ?? '') : vertices}
            onFocus={() => handleSizeFocus('v')}
            onChange={e => handleSizeChange('v', e.target.value)}
            onBlur={() => handleSizeBlur('v', vertices)}
            style={{ 
              marginLeft: '8px', 
              width: '60px', 
              padding: '6px',
              textAlign: 'center',
              border: focusedSize === 'v' ? '2px solid #43a047' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </label>
        <label style={{ fontWeight: 'bold' }}>
          Рёбра:
          <input
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={focusedSize === 'e' ? (sizeDrafts.e ?? '') : edges}
            onFocus={() => handleSizeFocus('e')}
            onChange={e => handleSizeChange('e', e.target.value)}
            onBlur={() => handleSizeBlur('e', edges)}
            style={{ 
              marginLeft: '8px', 
              width: '60px', 
              padding: '6px',
              textAlign: 'center',
              border: focusedSize === 'e' ? '2px solid #43a047' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </label>

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
        При фокусе значение очищается. Введите 0 или 1. В строке: 2 единицы — обычное ребро, 1 единица — петля.
      </div>

      {hasAnyValue && !matrixValidity.every(Boolean) && (
        <div className="matrix-warning">
          Ошибка: в строке должно быть 1 или 2 единицы
        </div>
      )}
    </section>
  );
}