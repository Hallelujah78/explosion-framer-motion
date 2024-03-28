import { useState, MutableRefObject, useLayoutEffect } from "react";
import { Coords } from "../models/types";
import animateGrid from "../utils/animateGrid";

const useAnimateGrid = (
  selfRef: MutableRefObject<HTMLElement | null>,
  containCenterCoords: Coords
) => {
  const [coords, setCoords] = useState<Coords>();
  const [moveCoords, setMoveCoords] = useState<Coords>();

  useLayoutEffect(() => {
    const currentRef = selfRef?.current;

    if (currentRef) {
      const tempCoords = { x: 0, y: 0 };
      const { x, y, width, height } = currentRef.getBoundingClientRect();
      tempCoords.x = x + width / 2;
      tempCoords.y = y + height / 2;
      setCoords(tempCoords);
    }
  }, [containCenterCoords, selfRef]);

  useLayoutEffect(() => {
    const currentRef = selfRef?.current;
    if (currentRef) {
      setMoveCoords(animateGrid(currentRef, containCenterCoords, coords));
    }
  }, [coords, selfRef, containCenterCoords]);

  return [coords, moveCoords];
};

export default useAnimateGrid;
