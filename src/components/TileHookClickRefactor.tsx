import styled from "styled-components";
import { motion, useAnimationControls } from "framer-motion";
import { useRef, useEffect } from "react";
import { ShapeClickProps } from "../models/types";
import useAnimateGridClickRefactor from "../hooks/useAnimateGridClickRefactor";

const TileHookClickRefactor: React.FC<ShapeClickProps> = ({
  image,
  clickCoords,
  setIsAnimating,
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
        if (isAnimating) {
          setIsAnimating!(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveCoords, controls, setElementCenter, setIsAnimating]);

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
