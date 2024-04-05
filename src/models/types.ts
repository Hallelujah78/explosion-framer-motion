import { Dispatch, SetStateAction } from "react";

export type Coords =
  | {
      x: number;
      y: number;
    }
  | undefined;

export interface ShapeProps {
  image: string;
  content?: number;
  containCenterCoords?: Coords;
  clickCoords?: Coords;
  isAnimating?: boolean;
  setIsAnimating?: Dispatch<SetStateAction<boolean>>;
}
