import styled from "styled-components";
import { motion, useAnimationControls } from "framer-motion";
import { useRef, useEffect } from "react";
import { ShapeProps } from "../models/types";
import useAnimateGridClick from "../hooks/useAnimateGridClick";

const CircleHookClick: React.FC<ShapeProps> = () => {
  const selfRef = useRef<HTMLElement | null>(null);
  const { setIsAnimating, moveCoords } = useAnimateGridClick(selfRef);
  const controls = useAnimationControls();

  useEffect(() => {
    if (moveCoords?.x) {
      void controls.start("move").then(() => {
        setIsAnimating(false);
      });
    }
  }, [moveCoords, controls, setIsAnimating]);

  const variants = {
    start: {
      x: 0,
      y: 0,
    },
    move: {
      rotate: -360,
      x: moveCoords?.x,
      y: moveCoords?.y,
    },
  };

  return (
    <Wrapper
      variants={variants}
      id="box"
      transition={{
        duration: 4,
        repeat: 1,
        repeatType: "reverse",
      }}
      ref={selfRef}
      initial="start"
      animate={controls}
    ></Wrapper>
  );
};
export default CircleHookClick;

const Wrapper = styled(motion.article)`
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
  .coords {
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;
