import { useState, useEffect, MutableRefObject } from "react";
import { Coords } from "../models/types";
import animateGrid from "../utils/animateGrid";

const useAnimateGrid = (
  selfRef: MutableRefObject<HTMLElement | null>,
  containCenterCoords: Coords
) => {
  const [coords, setCoords] = useState<Coords>();
  const [moveCoords, setMoveCoords] = useState<Coords>();

  useEffect(() => {
    if (containCenterCoords !== undefined) {
      containCenterCoords.x = 800;
      containCenterCoords.y = 300;
    }
    const currentRef = selfRef?.current;
    console.log(containCenterCoords?.x, containCenterCoords?.y);
    const tempCoords = { x: 0, y: 0 };
    if (currentRef) {
      tempCoords.x =
        currentRef.getBoundingClientRect().x +
        currentRef.getBoundingClientRect().width / 2;
      tempCoords.y =
        currentRef.getBoundingClientRect().y +
        currentRef.getBoundingClientRect().height / 2;
      setCoords(tempCoords);
      setMoveCoords(animateGrid(currentRef, containCenterCoords, coords));
    }
  }, [containCenterCoords]);

  return [coords, moveCoords];
};

export default useAnimateGrid;
