export type Coords =
  | {
      x: number;
      y: number;
    }
  | undefined;

export interface ShapeProps {
  content: number;
  containCenterCoords: Coords;
}
