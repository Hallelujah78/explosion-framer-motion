import { Coords } from "../models/types";

const vectorCalc = (centerCoords: Coords, coords: Coords) => {
  const newPoint = { x: 0, y: 0 };
  let PQ;
  if (coords !== undefined && centerCoords !== undefined) {
    const { x: x2, y: y2 } = coords;
    const { x: x1, y: y1 } = centerCoords;

    PQ = { a: x2 - x1, b: y2 - y1 };

    // magnitude"
    const magnitude = (PQ.a ** 2 + PQ.b ** 2) ** 0.5;

    // angle
    const angle = (Math.atan(PQ.b / PQ.a) * 180) / Math.PI;

    // normalized direction vector
    const normDirVector = { a: PQ.a / magnitude, b: PQ.b / magnitude };
    console.log(normDirVector);
    console.log(angle);
    // parameterized format equation for line
    // f(t) = A + t*N
    // where t is a distance, A is your original point and N is your normalized direction vector
    newPoint.x = coords.x + 1000 * normDirVector.a;
    newPoint.y = coords.y + 1000 * normDirVector.b;

    return newPoint;
  }
};

export default vectorCalc;
