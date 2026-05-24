'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { GraphState, Matrix } from '@/types/graph';

type GraphContextType = GraphState & {
  setVertices: (n: number) => void;
  setEdges: (n: number) => void;
  setMatrix: (m: Matrix) => void;
  setAdjMatrix: (m: Matrix) => void;
  setLastResult: (s: string) => void;
  setLastModule: (s: string) => void;
  clearAll: () => void;
};

const STORAGE_KEY = 'graph-state';

const emptyMatrix = (rows: number, cols: number) =>
  Array.from({ length: rows }, () => Array(cols).fill(0));

const defaultState: GraphState = {
  vertices: 3,
  edges: 3,
  matrix: emptyMatrix(3, 3),
  adjMatrix: [],
  lastResult: '',
  lastModule: '',
};

const GraphContext = createContext<GraphContextType | null>(null);

const resizeMatrix = (matrix: Matrix, rows: number, cols: number) =>
  Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => matrix[r]?.[c] ?? 0)
  );

export function GraphProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GraphState>(defaultState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as GraphState;
        if (parsed?.matrix && Array.isArray(parsed.matrix)) {
          setState(parsed);
        }
      } catch {}
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, mounted]);

  const value = useMemo<GraphContextType>(() => ({
    ...state,
    setVertices: (n) =>
      setState(prev => ({
        ...prev,
        vertices: n,
        matrix: resizeMatrix(prev.matrix, prev.edges, n),
      })),
    setEdges: (n) =>
      setState(prev => ({
        ...prev,
        edges: n,
        matrix: resizeMatrix(prev.matrix, n, prev.vertices),
      })),
    setMatrix: (m) => setState(prev => ({ ...prev, matrix: m })),
    setAdjMatrix: (m) => setState(prev => ({ ...prev, adjMatrix: m })),
    setLastResult: (s) => setState(prev => ({ ...prev, lastResult: s })),
    setLastModule: (s) => setState(prev => ({ ...prev, lastModule: s })),
    clearAll: () =>
      setState({
        ...defaultState,
        matrix: emptyMatrix(defaultState.edges, defaultState.vertices),
        adjMatrix: [],
        lastResult: '',
        lastModule: '',
      }),
  }), [state]);

  return <GraphContext.Provider value={value}>{children}</GraphContext.Provider>;
}

export function useGraph() {
  const ctx = useContext(GraphContext);
  if (!ctx) throw new Error('useGraph must be used inside GraphProvider');
  return ctx;
}