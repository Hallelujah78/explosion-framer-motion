import { Coords } from "../models/types";
import centerOriginToScreen from "./centerOriginToScreen";
import screenTocenterOrigin from "./screenToCenterOrigin";

const vectorCalc = (clickCoords: Coords, coords: Coords) => {
  const newPoint = { x: 0, y: 0 };

  const cartClickCoords = screenTocenterOrigin(clickCoords);

  const centerOriginCoords = screenTocenterOrigin(coords);
  let PQ;
  if (centerOriginCoords !== undefined && cartClickCoords !== undefined) {
    const { x: x2, y: y2 } = centerOriginCoords;
    const { x: x1, y: y1 } = cartClickCoords;

    PQ = { a: x2 - x1, b: y2 - y1 };

    // magnitude"
    const magnitude = (PQ.a ** 2 + PQ.b ** 2) ** 0.5;

    // angle
    // const angle = (Math.atan(PQ.b / PQ.a) * 180) / Math.PI;

    // normalized direction vector
    const normDirVector = { a: PQ.a / magnitude, b: PQ.b / magnitude };

    // parameterized format equation for line
    // f(t) = A + t*N
    // where t is a distance, A is your original point and N is your normalized direction vector
    let distance = window.outerWidth;
    if (screen.height > screen.width) {
      distance = window.outerHeight;
    }
    newPoint.x = centerOriginCoords.x + distance * normDirVector.a;
    newPoint.y = centerOriginCoords.y + distance * normDirVector.b;

    newPoint.x = Math.round(
      centerOriginToScreen({
        x: newPoint.x,
        y: newPoint.y,
      })!.x
    );
    newPoint.y = Math.round(
      centerOriginToScreen({
        x: newPoint.x,
        y: newPoint.y,
      })!.y
    );

    return newPoint;
  }
};

export default vectorCalc;
