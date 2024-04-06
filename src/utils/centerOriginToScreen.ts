import { Coords } from "../models/types";

const centerOriginToScreen = (coords: Coords): Coords => {
  // screenX = centerOriginX + screenWidth/2
  // screenY = screenHeight / 2 - centerOriginY;
  let screenCoords;
  if (coords !== undefined) {
    screenCoords = {
      x: Math.round(coords.x + window.innerWidth / 2),
      y: Math.round(window.innerHeight / 2 - coords.y),
    };
    return screenCoords;
  } else {
    return coords;
  }
};
export default centerOriginToScreen;
