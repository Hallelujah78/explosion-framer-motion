import { Coords } from "../models/types";
import vectorCalc from "./vectorCalc";

const animateGridClick = (
  currentRef: HTMLElement | null,
  centerCoords: Coords,
  coords: Coords
) => {
  let newX = 0;
  let newY = 0;

  vectorCalc(centerCoords, coords);
  if (centerCoords !== undefined && currentRef) {
    const { x: containX, y: containY } = centerCoords;

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

      newY = newY - coords!.y;
    } else if (
      slope >= -1 &&
      slope < 0 &&
      coords!.x < containX &&
      coords!.y < containY
    ) {
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
    } else if (slope === 0 && coords!.x < containX && coords!.y === containY) {
      // middle left
      newX = -(window.innerWidth / 2);
      // y = mx + b;
      const variance = Math.random();

      if (variance > 0.5) {
        newY = -variance * 500;
      } else {
        newY = variance * 500;

        // coords!.y;
      }
      // newY = newY - coords!.x;
    } else if (slope === 0 && coords!.x > containX && coords!.y === containY) {
      // middle left
      newX = window.innerWidth / 2;
      // y = mx + b;
      const variance = Math.random();

      if (variance > 0.5) {
        newY = -variance * 500;
      } else {
        newY = variance * 500;
      }
    } else if (
      (slope === Infinity || slope === -Infinity || Number.isNaN(slope)) &&
      coords!.x === containX &&
      coords!.y <= containY
    ) {
      // middle left
      newY = -window.innerHeight / 2;
      // y = mx + b;
      const variance = Math.random();

      if (variance > 0.5) {
        newX = -variance * 500;
      } else {
        newX = variance * 500;
      }
    } else {
      {
        // middle left
        newY = window.innerHeight / 2;
        // y = mx + b;
        const variance = Math.random();

        if (variance > 0.5) {
          newX = -variance * 500;
        } else {
          newX = variance * 500;
        }
      }
    }

    const newCoords = { x: newX, y: newY };
    return newCoords;
  }
};

export default animateGridClick;
