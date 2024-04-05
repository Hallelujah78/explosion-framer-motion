import styled from "styled-components";
import { motion, useAnimationControls } from "framer-motion";
import { useRef, useEffect } from "react";
import { ShapeProps } from "../models/types";
import useAnimateGridClick from "../hooks/useAnimateGridClick";

const TileHookClick: React.FC<ShapeProps> = ({ image }) => {
  const selfRef = useRef<HTMLElement | null>(null);
  const { coords, setIsAnimating, moveCoords, setElementCenter } =
    useAnimateGridClick(selfRef);
  const controls = useAnimationControls();

  useEffect(() => {
    if (moveCoords?.x !== undefined && moveCoords?.x !== null) {
      void controls.start("move").then(() => {
        setElementCenter();
        setIsAnimating(false);
      });
    }
  }, [moveCoords, controls, setIsAnimating, setElementCenter]);

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
export default TileHookClick;

const Wrapper = styled(motion.article)`
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
  img {
    height: 100%;
    width: 100%;
  }
`;
