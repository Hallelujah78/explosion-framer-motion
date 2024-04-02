import styled from "styled-components";
import { motion, useAnimationControls } from "framer-motion";
import { useRef, useEffect } from "react";
import { ShapeProps } from "../models/types";
import useAnimateGridClick from "../hooks/useAnimateGridClick";

const CircleHookClick: React.FC<ShapeProps> = () => {
  const selfRef = useRef<HTMLElement | null>(null);
  const [coords, moveCoords] = useAnimateGridClick(selfRef);
  const controls = useAnimationControls();
  useEffect(() => {
    void controls.start("move");
  }, [moveCoords, controls]);
  const variants = {
    start: {
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      // x: coords?.x,
      // y: coords?.y,
      x: 0,
      y: 0,
    },
    move: {
      rotate: -360,
      scale: 1,
      x: moveCoords?.x,
      y: moveCoords?.y,
    },
  };

  return (
    <Wrapper
      variants={variants}
      id="box"
      transition={{
        delay: 0.5,
        duration: 3,
        repeat: 1,
        repeatType: "reverse",
      }}
      ref={selfRef}
      initial="start"
      animate={controls}
    >
      <div className="center">
        {coords ? coords.x : null}
        <br />
        {coords ? coords.y : null}
      </div>
    </Wrapper>
  );
};
export default CircleHookClick;

const Wrapper = styled(motion.article)`
  border-radius: 50%;
  background-color: lightgreen;
  position: relative;
  display: inline-block;
  height: 64px;
  width: 64px;
  .center {
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
  }
  .coords {
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;
