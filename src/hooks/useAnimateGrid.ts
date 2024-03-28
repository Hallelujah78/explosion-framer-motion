import { useState, useEffect, MutableRefObject } from "react";
import { Coords } from "../models/types";
import animateGrid from "../utils/animateGrid";

const useAnimateGrid = (
  selfRef: MutableRefObject<HTMLElement | null>,
  containCenterCoords: Coords,
  clickCoords?: boolean
) => {
  const [coords, setCoords] = useState<Coords>();
  const [moveCoords, setMoveCoords] = useState<Coords>();
  const [centerCoords, setCenterCoords] = useState<Coords>(containCenterCoords);

  const getClickCoords = (event: MouseEvent) => {
    setCenterCoords({ x: event.pageX, y: event.pageY });
    console.log(event.offsetX, event.offsetY);
  };

  useEffect(() => {
    window.addEventListener("click", getClickCoords);

    const currentRef = selfRef?.current;
    // console.log(centerCoords?.x, centerCoords?.y);
    const tempCoords = { x: 0, y: 0 };
    if (currentRef) {
      tempCoords.x =
        currentRef.getBoundingClientRect().x +
        currentRef.getBoundingClientRect().width / 2;
      tempCoords.y =
        currentRef.getBoundingClientRect().y +
        currentRef.getBoundingClientRect().height / 2;
      setCoords(tempCoords);

      setMoveCoords(animateGrid(currentRef, centerCoords, coords));
    }
    return () => {
      window.removeEventListener("click", getClickCoords);
    };
  }, [containCenterCoords, centerCoords]);

  return [coords, moveCoords];
};

export default useAnimateGrid;
