import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface BoxProps {
  content: number;
  containCenterCoords: { x: number; y: number } | undefined;
}

const Box: React.FC<BoxProps> = ({ containCenterCoords }) => {
  const selfRef = useRef<HTMLElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>();

  const [moveCoords, setMoveCoords] = useState<{ x: number; y: number }>();

  useEffect(() => {
    const currentRef = selfRef.current;

    const tempCoords = { x: 0, y: 0 };
    if (currentRef) {
      tempCoords.x =
        currentRef.getBoundingClientRect().x +
        currentRef.getBoundingClientRect().width / 2;
      tempCoords.y =
        currentRef.getBoundingClientRect().y +
        currentRef.getBoundingClientRect().height / 2;

      setCoords(tempCoords);
      let newX = 0;
      let newY = 0;
      if (containCenterCoords !== undefined) {
        const { x: containX, y: containY } = containCenterCoords;

        // containCoords will be point 1, coords will be point 2
        const slope = -(containY - coords!.y) / (containX - coords!.x);
        // equation of a line: y - mx = b
        const yIntercept = containY + slope * containX;
        // if x is -200

        if (slope >= 1 && coords!.x < containX && coords!.y > containY) {
          console.log("slope:  " + slope);
          console.log("bottom left corner");
          // choose y and then calc y + calc x from y
          // y = mx + b
          newY = 480;
          // coords!.y +
          // currentRef.getBoundingClientRect().y +
          // currentRef.getBoundingClientRect().height / 2;
          // y = mx + b => -mx = -y + b => mx = y - b => x = (y-b)/m
          newX = (newY - yIntercept) / -slope - coords!.x;
          console.log("oldX: ", coords!.x, "\nnewX: ", newX);
          console.log("oldY: ", coords!.y, "\nnewY: ", newY);
          // } else if (slope < 1 && coords!.x > containX && coords!.y < containY) {
          //   //
          //   newY =
          //     -coords!.y +
          //     currentRef.getBoundingClientRect().y +
          //     currentRef.getBoundingClientRect().height / 2;

          //   newX = (newY - yIntercept) / slope - coords!.x;
          // } else if (slope > 0 && coords!.x < containX && coords!.y > containY) {
          //   console.log("slope:  " + slope);
          //   console.log("top left corner");

          //   newY =
          //     coords!.y +
          //     currentRef.getBoundingClientRect().y +
          //     currentRef.getBoundingClientRect().height / 2;

          //   newX = (newY - yIntercept) / slope;
          //   console.log("oldX: ", coords!.x, "\nnewX: ", newX);
          //   console.log("oldY: ", coords!.y, "\nnewY: ", newY);
          //
        }
        if (newY) {
          newY = newY - coords!.y;
        }
        const newCoords = { x: newX, y: newY };
        setMoveCoords(newCoords);
      }
    }
  }, [containCenterCoords]);

  return (
    <Wrapper
      id="box"
      ref={selfRef}
      as={motion.article}
      initial={{
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        x: 0,
        y: 0,
        // x: coords?.x,
        // y: coords?.y,
      }}
      animate={{
        // rotate: 360,
        // rotateX: 360,
        // rotateY: 360,
        // rotateZ: 360,
        scale: 1,
        x: moveCoords?.x,
        y: moveCoords?.y,
        transition: { duration: 5 },
      }}
    >
      <div className="center">
        {coords ? coords.x : null}
        <br />
        {coords ? coords.y : null}
      </div>
    </Wrapper>
  );
};
export default Box;

const Wrapper = styled.article`
  position: relative;
  display: inline-block;
  border: green solid 1px;
  height: 5rem;
  width: 5rem;
  .center {
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
  }
`;
