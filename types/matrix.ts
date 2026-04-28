export interface MatrixForm { 
  size: number;      // Вершины
  data: number[][];  // Матрица [edges][vertices]
  numEdges: number;  // Рёбра
}

export type IncidenceMatrix = number[][];