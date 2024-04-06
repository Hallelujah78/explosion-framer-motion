import { Coords } from "../models/types";

function screenToCartesian(coords: Coords) {
  // cartX = screenX - screenWidth/2
  // cartY = screenHeight/2 - screenY
  let cartesianCoords;
  if (coords !== undefined) {
    cartesianCoords = {
      x: Math.round(coords.x - window.innerWidth / 2),
      y: Math.round(window.innerHeight / 2 - coords.y),
    };
    return cartesianCoords;
  } else {
    //
  }
  // throw new Error("coords undefined");
}

export default screenToCartesian;
