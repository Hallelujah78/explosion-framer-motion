import { Coords } from "../models/types";

const cartesianToScreen = (coords: Coords): Coords => {
  // screenX = cartX + screenWidth/2
  // screenY = screenHeight / 2 - cartY;
  let screenCoords;
  if (coords !== undefined) {
    screenCoords = {
      x: Math.round(coords.x + window.innerWidth / 2),
      y: Math.round(window.innerHeight / 2 - coords.y),
    };
    return screenCoords;
  } else throw new Error("coords are undefined");
};
export default cartesianToScreen;
