import { Coords } from "../models/types";

const cartesianToScreen = (coords: Coords): Coords => {
  // screenX = cartX + screenWidth/2
  // screenY = screenHeight / 2 - cartY;
  let screenCoords;
  if (coords !== undefined) {
    console.log("windowWidth/2: ", window.innerWidth / 2);
    console.log("windowHeight/2: ", window.innerHeight / 2);
    screenCoords = {
      x: coords.x + window.innerWidth / 2,
      y: window.innerHeight / 2 - coords.y,
    };
    return screenCoords;
  } else throw new Error("coords are undefined");
};
export default cartesianToScreen;
