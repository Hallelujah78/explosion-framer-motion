import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ShapeProps } from "../models/types";
import useAnimateGridClick from "../hooks/useAnimateGridClick";

const CircleHook: React.FC<ShapeProps> = () => {
  const selfRef = useRef<HTMLElement | null>(null);

  const { coords, moveCoords } = useAnimateGridClick(selfRef);

  return (
    <Wrapper
      id="box"
      ref={selfRef}
      as={motion.article}
      initial={{
        x: coords?.x,
        y: coords?.y,
      }}
      animate={{
        rotate: -360,
        x: moveCoords?.x,
        y: moveCoords?.y,
        transition: {
          delay: 0.5,
          duration: 3,
          repeat: 1,
          repeatType: "reverse",
        },
      }}
    ></Wrapper>
  );
};
export default CircleHook;

const Wrapper = styled.article`
  border-radius: 50%;
  background-color: lightgreen;
  position: relative;
  display: inline-block;
  height: 20px;
  width: 20px;
`;
