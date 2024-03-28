import { useState, useEffect, useLayoutEffect, MutableRefObject } from "react";
import { Coords } from "../models/types";
import animateGridClick from "../utils/animateGridClick";

const useAnimateGridClick = (selfRef: MutableRefObject<HTMLElement | null>) => {
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
  }, [selfRef]);

  const getClickCoords = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const currentRef = selfRef?.current;

    if (currentRef) {
      const tempCoords = { x: 0, y: 0 };
      const { x, y, width, height } = currentRef.getBoundingClientRect();
      tempCoords.x = x + width / 2;
      tempCoords.y = y + height / 2;
      setCoords(tempCoords);
      const coordsToMoveTo = animateGridClick(
        currentRef,
        { x: clientX, y: clientY },
        tempCoords
      );
      setMoveCoords(coordsToMoveTo);
    }
  };

  useEffect(() => {
    window.addEventListener("click", getClickCoords);

    return () => {
      window.removeEventListener("click", getClickCoords);
    };
  }, []);

  return [coords, moveCoords];
};

export default useAnimateGridClick;
