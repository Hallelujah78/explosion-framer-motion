import { Coords } from "../models/types";

const cartesianToScreen = (coords: Coords): Coords => {
  // screenX = cartX + screenWidth/2
  // screenY = screenHeight / 2 - cartY;
  let screenCoords;
  if (coords !== undefined) {
    screenCoords = {
      x: coords.x + screen.width / 2,
      y: screen.height / 2 - coords.y,
    };
    return screenCoords;
  } else throw new Error("coords are undefined");
};
export default cartesianToScreen;
