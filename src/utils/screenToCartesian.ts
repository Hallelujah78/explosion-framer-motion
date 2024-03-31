import { Coords } from "../models/types";

function screenToCartesian(coords: Coords) {
  // cartX = screenX - screenWidth/2
  // cartY = screenHeight/2 - screenY
  let cartesianCoords;
  if (coords !== undefined) {
    cartesianCoords = {
      x: coords.x - screen.width / 2,
      y: screen.height / 2 - coords.y,
    };
    return cartesianCoords;
  } else throw new Error("coords undefined");
}

export default screenToCartesian;
