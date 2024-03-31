import {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  MutableRefObject,
} from "react";
import { Coords } from "../models/types";
import animateGridClick from "../utils/animateGridClick";
import screenToCartesian from "../utils/screenToCartesian";
import cartesianToScreen from "../utils/cartesianToScreen";
import vectorCalc from "../utils/vectorCalc";

const useAnimateGridClick = (selfRef: MutableRefObject<HTMLElement | null>) => {
  const [coords, setCoords] = useState<Coords>();
  const [moveCoords, setMoveCoords] = useState<Coords | null>(null);

  useLayoutEffect(() => {
    const currentRef = selfRef?.current;
    if (currentRef) {
      // console.log("ref has changed");
      let tempCoords = { x: 0, y: 0 };
      const { x, y, width, height } = currentRef.getBoundingClientRect();
      tempCoords.x = x + width / 2;
      tempCoords.y = y + height / 2;
      tempCoords = screenToCartesian(tempCoords);
      setCoords(tempCoords);
    }
  }, [selfRef]);

  const getClickCoords = useCallback(
    (event: MouseEvent) => {
      let centerCoords = { x: event.clientX, y: event.clientY };
      centerCoords = screenToCartesian(centerCoords);
      const currentRef = selfRef?.current;
      if (currentRef) {
        // let coordsToMoveTo = animateGridClick(currentRef, centerCoords, coords);
        let coordsToMoveTo = vectorCalc(centerCoords, coords);
        coordsToMoveTo = cartesianToScreen(coordsToMoveTo);
        // console.log(coordsToMoveTo);
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
