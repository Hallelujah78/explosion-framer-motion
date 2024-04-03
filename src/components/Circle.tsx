import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Coords } from "../models/types";
import animateGrid from "../utils/animateGrid";
import { ShapeProps } from "../models/types";

const Circle: React.FC<ShapeProps> = ({ containCenterCoords }) => {
  const selfRef = useRef<HTMLElement | null>(null);
  const [coords, setCoords] = useState<Coords>();
  const [moveCoords, setMoveCoords] = useState<Coords>();

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
      setMoveCoords(animateGrid(currentRef, containCenterCoords, coords));
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
export default Circle;

const Wrapper = styled.article`
  border-radius: 50%;
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
