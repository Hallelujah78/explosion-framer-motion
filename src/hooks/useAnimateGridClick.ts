import {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  MutableRefObject,
} from "react";
import { Coords } from "../models/types";
import animateGridClick from "../utils/animateGridClick";

const useAnimateGridClick = (selfRef: MutableRefObject<HTMLElement | null>) => {
  const [coords, setCoords] = useState<Coords>();
  const [moveCoords, setMoveCoords] = useState<Coords | null>(null);

  useLayoutEffect(() => {
    const currentRef = selfRef?.current;
    if (currentRef) {
      console.log("ref has changed");
      const tempCoords = { x: 0, y: 0 };
      const { x, y, width, height } = currentRef.getBoundingClientRect();
      tempCoords.x = x + width / 2;
      tempCoords.y = y + height / 2;
      setCoords(tempCoords);
    }
  }, [selfRef]);

  const getClickCoords = useCallback(
    (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const currentRef = selfRef?.current;
      if (currentRef) {
        const coordsToMoveTo = animateGridClick(
          currentRef,
          { x: clientX, y: clientY },
          coords
        );
        setMoveCoords(coordsToMoveTo);
      }
    },
    [selfRef, coords]
  );

  useEffect(() => {
    window.addEventListener("click", getClickCoords);

    return () => {
      window.removeEventListener("click", getClickCoords);
    };
  }, [getClickCoords]);

  return [coords, moveCoords];
};

export default useAnimateGridClick;
