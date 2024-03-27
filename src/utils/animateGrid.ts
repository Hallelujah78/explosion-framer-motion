import { Coords } from "../models/types";

const animateGrid = (
  currentRef: HTMLElement,
  containCenterCoords: Coords,
  coords: Coords
) => {
  let newX = 0;
  let newY = 0;
  if (containCenterCoords !== undefined) {
    const { x: containX, y: containY } = containCenterCoords;

    // containCoords will be point 1, coords will be point 2
    const slope = -(containY - coords!.y) / (containX - coords!.x);
    // equation of a line: y - mx = b
    const yIntercept = containY + slope * containX;

    if (slope >= 1 && coords!.x < containX && coords!.y > containY) {
      newY =
        coords!.y +
        currentRef.getBoundingClientRect().y +
        currentRef.getBoundingClientRect().height / 2;
      newX = (newY - yIntercept) / -slope - coords!.x;
      // console.log("oldX: ", coords!.x, "\nnewX: ", newX);
      // console.log("oldY: ", coords!.y, "\nnewY: ", newY);
      newY = newY - coords!.y;
    } else if (slope <= 1 && coords!.x > containX && coords!.y > containY) {
      newY =
        coords!.y +
        currentRef.getBoundingClientRect().y +
        currentRef.getBoundingClientRect().height / 2;
      newX = (newY - yIntercept) / -slope - coords!.x;
      newY = newY - coords!.y;
    } else if (
      // top left
      slope <= -1 &&
      coords!.x < containX &&
      coords!.y < containY
    ) {
      newY = -window.innerHeight / 2 + coords!.y;

      newX = (newY - yIntercept) / -slope - coords!.x;
      newY = newY - coords!.y;
    } else if (
      slope >= 0 &&
      slope < 1 &&
      slope &&
      coords!.x < containX &&
      coords!.y > containY
    ) {
      newY =
        coords!.y +
        currentRef.getBoundingClientRect().y +
        currentRef.getBoundingClientRect().height / 2;
      newX = (newY - yIntercept) / -slope - coords!.x;
      // console.log("oldX: ", coords!.x, "\nnewX: ", newX);
      // console.log("oldY: ", coords!.y, "\nnewY: ", newY);
      newY = newY - coords!.y;
    } else if (
      slope >= -1 &&
      slope < 0 &&
      coords!.x < containX &&
      coords!.y < containY
    ) {
      // console.log("outer height: ", window.outerHeight);
      newY = -window.innerHeight / 2 + coords!.y;
      // -coords!.y -
      // currentRef.getBoundingClientRect().y +
      // currentRef.getBoundingClientRect().height / 2;
      newX = (newY - yIntercept) / -slope - coords!.x;
      newY = newY - coords!.y;
    } else if (slope >= 0 && coords!.x > containX && coords!.y < containY) {
      // top right
      newY = -window.innerHeight / 2 + coords!.y;
      newX = (newY - yIntercept) / -slope - coords!.x;
      newY = newY - coords!.y;
    }

    console.log(newY);
    const newCoords = { x: newX, y: newY };
    return newCoords;
  }
};

export default animateGrid;
