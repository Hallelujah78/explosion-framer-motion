import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import Box from "./Box";
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
      coords.x = currentRef.getBoundingClientRect().width / 2;
      coords.y = currentRef.getBoundingClientRect().height / 2;
      setContainCenterCoords(coords);
    }
  }, []);

  return (
    <Wrapper ref={containerRef}>
      {boxes.map((content, index) => {
        return (
          <Box
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
  border: red solid 1px;
  position: relative;
  min-height: 80vh;
  width: fit-content;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border: red solid 1px;
  place-content: center;
  gap: 1rem;
`;
