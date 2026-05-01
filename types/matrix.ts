export interface MatrixForm { 
  size: number;      // Вершины
  data: number[][];  // [edges][vertices]
  numEdges: number;  // Рёбра
}

export type IncidenceMatrix = number[][];