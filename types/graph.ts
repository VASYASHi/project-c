export type Matrix = number[][];

export interface GraphState {
  vertices: number;
  edges: number;
  matrix: Matrix;
  adjMatrix: Matrix;
  lastResult: string;
  lastModule: string;
}