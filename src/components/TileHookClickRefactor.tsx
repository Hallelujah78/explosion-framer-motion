import styled from "styled-components";
import { motion, useAnimationControls } from "framer-motion";
import { useRef, useEffect } from "react";
import { ShapeProps } from "../models/types";
import useAnimateGridClickRefactor from "../hooks/useAnimateGridClickRefactor";

const TileHookClickRefactor: React.FC<ShapeProps> = ({
  image,
  clickCoords,

  isAnimating,
}) => {
  const selfRef = useRef<HTMLElement | null>(null);
  const { coords, moveCoords, setElementCenter } = useAnimateGridClickRefactor(
    selfRef,
    clickCoords,
    isAnimating
  );
  const controls = useAnimationControls();

  useEffect(() => {
    if (moveCoords?.x !== undefined && moveCoords?.x !== null) {
      void controls.start("move").then(() => {
        setElementCenter();
      });
    }
  }, [moveCoords, controls, setElementCenter]);

  const variants = {
    start: {
      x: coords?.x,
      y: coords?.y,
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
    >
      <img src={image} alt="image piece" />
    </Wrapper>
  );
};
export default TileHookClickRefactor;

const Wrapper = styled(motion.article)`
  position: relative;
  display: inline-block;
  height: 20px;
  width: 20px;
  img {
    height: 100%;
    width: 100%;
  }
`;
