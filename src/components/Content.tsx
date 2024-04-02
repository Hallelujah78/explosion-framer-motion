import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
// import Box from "./Box";
// import Circle from "./Circle";
import CircleHookClick from "./CircleHookClick";
import { boxes } from "../data/data";
import { Coords } from "../models/types";

const Content: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [containCenterCoords, setContainCenterCoords] = useState<Coords>();

  useEffect(() => {
    const currentRef = containerRef.current;
    const coords = { x: 0, y: 0 };
    if (currentRef) {
      const { x, y, width, height } = currentRef.getBoundingClientRect();
      coords.x = x + width / 2;
      coords.y = y + height / 2;
      setContainCenterCoords(coords);
    }
  }, []);

  return (
    <Wrapper as={motion.section} ref={containerRef}>
      {boxes.map((content, index) => {
        return (
          <CircleHookClick
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  place-content: center;
`;
