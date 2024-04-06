import { Coords } from "../models/types";

function screenTocenterOrigin(coords: Coords) {
  // centerOriginX = screenX - screenWidth/2
  // centerOriginY = screenHeight/2 - screenY
  let centerOriginCoords;
  if (coords !== undefined) {
    centerOriginCoords = {
      x: Math.round(coords.x - window.innerWidth / 2),
      y: Math.round(window.innerHeight / 2 - coords.y),
    };
    return centerOriginCoords;
  } else {
    return coords;
  }
}

export default screenTocenterOrigin;
