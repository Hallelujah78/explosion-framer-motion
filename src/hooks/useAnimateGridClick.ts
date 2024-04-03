import {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  MutableRefObject,
} from "react";
import { Coords } from "../models/types";

import vectorCalc from "../utils/vectorCalc";
import { toast } from "react-toastify";

const useAnimateGridClick = (selfRef: MutableRefObject<HTMLElement | null>) => {
  const [coords, setCoords] = useState<Coords>(undefined);
  const [moveCoords, setMoveCoords] = useState<Coords | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const setElementCenter = useCallback(() => {
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
    const resize = () => {
      if (isAnimating) {
        return;
      }
      setElementCenter();
    };
    const rotate = () => {
      if (isAnimating) {
        return;
      }
      setElementCenter();
    };

    const getClickCoords = (event: MouseEvent) => {
      if (isAnimating) {
        toast("Animation is already in progress!", {
          toastId: "unique",
        });

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
    window.addEventListener("resize", resize);
    screen.orientation.addEventListener("rotate", rotate);

    return () => {
      window.removeEventListener("click", getClickCoords);
      window.removeEventListener("resize", resize);
      screen.orientation.removeEventListener("change", rotate);
    };
  }, [coords, selfRef, isAnimating, setElementCenter]);

  return { coords, setIsAnimating, moveCoords, setElementCenter };
};

export default useAnimateGridClick;
