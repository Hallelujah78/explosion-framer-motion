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

  setIsAnimating?: Dispatch<SetStateAction<boolean>>;
}

export interface ShapeClickProps extends ShapeProps {
  isAnimating: boolean;
}
