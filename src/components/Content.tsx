import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Box from "./Box";
import Circle from "./Circle";
import CircleHook from "./CircleHook";
import { boxes } from "../data/data";
import { Coords } from "../models/types";

const Content: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [containCenterCoords, setContainCenterCoords] = useState<Coords>();

  useEffect(() => {
    const currentRef = containerRef.current;
    const coords = { x: 0, y: 0 };
    if (currentRef) {
      coords.x =
        currentRef.getBoundingClientRect().x +
        currentRef.getBoundingClientRect().width / 2;
      coords.y =
        currentRef.getBoundingClientRect().y +
        currentRef.getBoundingClientRect().height / 2;
      setContainCenterCoords(coords);
    }
  }, []);

  return (
    <Wrapper
      as={motion.section}
      ref={containerRef}
      // animate={{ rotate: 360 }}
      // transition={{ duration: 3, delay: 0.5, repeat: 5 }}
    >
      {boxes.map((content, index) => {
        return (
          <CircleHook
            key={index}
            content={content}
            containCenterCoords={containCenterCoords}
          />
        );
      })}
    </Wrapper>
  );
};
export default Content;

const Wrapper = styled.section`
  position: relative;
  min-height: 80vh;
  width: fit-content;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-content: center;
  gap: 1px;
  border: red solid 1px;
`;
