import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";

const variants = {
  start: {
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 15,
    },
  },
  finish: {
    rotate: 360,
    rotateX: 360,
    rotateY: 360,
    rotateZ: 180,
    scale: 1.5,
    x: "-100vw",
    y: "-100vh",
    transition: {
      duration: 15,
    },
  },
};

interface BoxProps {
  content: number;
}

const Box: React.FC<BoxProps> = ({ content }) => {
  const selfRef = useRef<HTMLElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>();
  const [isStart, setIsStart] = useState<boolean>(true);

  useLayoutEffect(() => {
    const currentRef = selfRef.current;

    const coords = { x: 0, y: 0 };
    if (currentRef) {
      coords.x = currentRef.getBoundingClientRect().x;
      coords.y = currentRef.getBoundingClientRect().y;
      setCoords(coords);
    }
  }, []);

  return (
    <Wrapper
      id="box"
      ref={selfRef}
      as={motion.article}
      animate={isStart ? "start" : "finish"}
      variants={variants}
    >
      <div className="center">
        {content} {coords ? coords.x : null}
      </div>
      <button
        onClick={() => {
          setIsStart((prev) => !prev);
        }}
      >
        click
      </button>
    </Wrapper>
  );
};
export default Box;

const Wrapper = styled.article`
  display: inline-block;
  border: green solid 1px;
  height: 5rem;
  width: 5rem;
  .center {
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
  }
`;
