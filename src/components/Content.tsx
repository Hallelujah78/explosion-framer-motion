import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import Box from "./Box";
import Circle from "./Circle";
import CircleHook from "./CircleHook";
import { boxes } from "../data/data";

const Content: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [containCenterCoords, setContainCenterCoords] = useState<{
    x: number;
    y: number;
  }>();

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
    <Wrapper ref={containerRef}>
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  place-content: center;
  gap: 1rem;
`;
