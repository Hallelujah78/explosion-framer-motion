import { Coords } from "../models/types";
import cartesianToScreen from "./cartesianToScreen";
import screenToCartesian from "./screenToCartesian";

const vectorCalc = (centerCoords: Coords, coords: Coords) => {
  const newPoint = { x: 0, y: 0 };
  centerCoords;
  const cartCenterCoords = screenToCartesian(centerCoords);

  const cartCoords = screenToCartesian(coords);
  let PQ;
  if (coords !== undefined && cartCenterCoords !== undefined) {
    const { x: x2, y: y2 } = cartCoords;
    const { x: x1, y: y1 } = cartCenterCoords;

    PQ = { a: x2 - x1, b: y2 - y1 };

    // magnitude"
    const magnitude = (PQ.a ** 2 + PQ.b ** 2) ** 0.5;

    // angle
    const angle = (Math.atan(PQ.b / PQ.a) * 180) / Math.PI;
    console.log(angle);
    // normalized direction vector
    const normDirVector = { a: PQ.a / magnitude, b: PQ.b / magnitude };

    // parameterized format equation for line
    // f(t) = A + t*N
    // where t is a distance, A is your original point and N is your normalized direction vector
    newPoint.x = Math.round(cartCenterCoords.x + 1200 * normDirVector.a);
    newPoint.y = Math.round(cartCenterCoords.y + 1200 * normDirVector.b);

    newPoint.x = cartesianToScreen({
      x: newPoint.x,
      y: newPoint.y,
    })!.x;
    newPoint.y = cartesianToScreen({
      x: newPoint.x,
      y: newPoint.y,
    })!.y;

    console.log("newPoint: ", newPoint);
    return newPoint;
  }
};

export default vectorCalc;
