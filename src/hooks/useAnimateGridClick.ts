import {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  MutableRefObject,
} from "react";
import { Coords } from "../models/types";

import vectorCalc from "../utils/vectorCalc";

const useAnimateGridClick = (selfRef: MutableRefObject<HTMLElement | null>) => {
  const [coords, setCoords] = useState<Coords>();
  const [moveCoords, setMoveCoords] = useState<Coords | null>(null);

  const setElementCenter = useCallback(() => {
    const currentRef = selfRef?.current;
    if (currentRef) {
      const tempCoords = { x: 0, y: 0 };
      const { x, y, width, height } = currentRef.getBoundingClientRect();
      tempCoords.x = x + width / 2;
      tempCoords.y = y + height / 2;

      setCoords(tempCoords);
    }
  }, [selfRef]);

  useLayoutEffect(() => {
    setElementCenter();
  }, [selfRef, setElementCenter]);

  const getClickCoords = useCallback(
    (event: MouseEvent) => {
      const centerCoords = { x: event.clientX, y: event.clientY };

      const currentRef = selfRef?.current;
      if (currentRef && coords) {
        const coordsToMoveTo = vectorCalc(centerCoords, coords);
        if (coordsToMoveTo) {
          coordsToMoveTo.x = coordsToMoveTo?.x - coords.x;
          coordsToMoveTo.y = coordsToMoveTo?.y - coords.y;
          setMoveCoords(coordsToMoveTo);
        }
      }
    },
    [selfRef, coords]
  );

  useLayoutEffect(() => {
    window.addEventListener("resize", setElementCenter);

    return () => {
      window.removeEventListener("resize", setElementCenter);
    };
  }, [setElementCenter]);

  useEffect(() => {
    window.addEventListener("click", getClickCoords);

    return () => {
      window.removeEventListener("click", getClickCoords);
    };
  }, [getClickCoords]);

  return [moveCoords];
};

export default useAnimateGridClick;
