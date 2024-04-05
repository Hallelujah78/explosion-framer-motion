// react
import {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  MutableRefObject,
} from "react";

// models
import { Coords } from "../models/types";

// utils
import vectorCalc from "../utils/vectorCalc";

// libs
import { toast } from "react-toastify";

const useAnimateGridClickRefactor = (
  selfRef: MutableRefObject<HTMLElement | null>,
  clickCoords: Coords
) => {
  const [coords, setCoords] = useState<Coords>();
  const [moveCoords, setMoveCoords] = useState<Coords>();
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
    const calcMoveCoords = () => {
      if (isAnimating) {
        toast("Animation is already in progress!", {
          toastId: "unique",
        });

        return;
      }
      setIsAnimating(true);

      const currentRef = selfRef?.current;

      if (currentRef && coords) {
        const coordsToMoveTo = vectorCalc(clickCoords, coords);
        if (coordsToMoveTo) {
          coordsToMoveTo.x = coordsToMoveTo?.x - coords.x;
          coordsToMoveTo.y = coordsToMoveTo?.y - coords.y;
          setMoveCoords(coordsToMoveTo);
        }
      }
    };
    calcMoveCoords();
  }, [clickCoords, coords, selfRef]);

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

    window.addEventListener("resize", resize);
    screen.orientation.addEventListener("rotate", rotate);

    return () => {
      window.removeEventListener("resize", resize);
      screen.orientation.removeEventListener("change", rotate);
    };
  }, [coords, selfRef, isAnimating, setElementCenter]);

  return { coords, setIsAnimating, moveCoords, setElementCenter };
};

export default useAnimateGridClickRefactor;
