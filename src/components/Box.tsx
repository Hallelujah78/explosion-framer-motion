import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShapeProps } from "../models/types";

const Box: React.FC<ShapeProps> = ({ containCenterCoords }) => {
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

          newX = (newY - yIntercept) / -slope - coords!.x;
          newY = newY - coords!.y;
        } else if (slope >= 0 && coords!.x > containX && coords!.y < containY) {
          // top right
          newY = -window.innerHeight / 2 + coords!.y;
          newX = (newY - yIntercept) / -slope - coords!.x;
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
        // x: 0,
        // y: 0,
        x: coords?.x,
        y: coords?.y,
      }}
      animate={{
        rotate: -360,

        scale: 1,
        x: moveCoords?.x,
        y: moveCoords?.y,
        transition: {
          delay: 0.5,
          duration: 3,
          repeat: 5,
          repeatType: "reverse",
        },
      }}
    >
      <div className="center">
        {/* {coords ? coords.x : null}
        <br />
        {coords ? coords.y : null} */}
      </div>
    </Wrapper>
  );
};
export default Box;

const Wrapper = styled.article`
  /* border-radius: 50%; */
  background-color: lightgreen;
  position: relative;
  display: inline-block;
  height: 20px;
  width: 20px;
  .center {
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
  }
`;
