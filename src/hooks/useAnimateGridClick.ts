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
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const setElementCenter = useCallback(() => {
    console.log("element resized or ref changed");
    const currentRef = selfRef?.current;
    if (currentRef) {
      const elementCenter = { x: 0, y: 0 };
      const { x, y, width, height } = currentRef.getBoundingClientRect();
      elementCenter.x = Math.round(x + width / 2);
      elementCenter.y = Math.round(y + height / 2);

      setCoords(elementCenter);
    }
  }, [selfRef]);

  useLayoutEffect(() => {
    setElementCenter();
  }, [selfRef, setElementCenter]);

  useEffect(() => {
    const getClickCoords = (event: MouseEvent) => {
      if (isAnimating) {
        return;
      }
      setIsAnimating(true);
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
    };
    window.addEventListener("click", getClickCoords);
    window.addEventListener("resize", setElementCenter);

    return () => {
      window.removeEventListener("click", getClickCoords);
      window.removeEventListener("resize", setElementCenter);
    };
  }, [coords, selfRef, isAnimating, setElementCenter]);

  return { setIsAnimating, moveCoords };
};

export default useAnimateGridClick;
