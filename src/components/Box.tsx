import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface BoxProps {
  content: number;
  containCenterCoords: { x: number; y: number } | undefined;
}

const Box: React.FC<BoxProps> = ({ containCenterCoords }) => {
  const selfRef = useRef<HTMLElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>();

  const [moveCoords, setMoveCoords] = useState<{ x: number; y: number }>();

  useEffect(() => {
    const currentRef = selfRef.current;

    const coords = { x: 0, y: 0 };
    if (currentRef) {
      coords.x =
        currentRef.getBoundingClientRect().x +
        currentRef.getBoundingClientRect().width / 2;
      coords.y =
        currentRef.getBoundingClientRect().y +
        currentRef.getBoundingClientRect().width / 2;
      setCoords(coords);
      if (containCenterCoords !== undefined) {
        const { x: containX, y: containY } = containCenterCoords;
        // containCoords will be point 1, coords will be point 2
        const slope = (containY - coords.y) / (containX - coords.x);
        // equation of a line: y - mx = b
        // console.log(slope);
        const yIntercept = containY - slope * containX;
        // console.log(yIntercept);
        // if x is -200
        const newY = -700 * slope + yIntercept;
        const newCoords = { x: -700, y: newY };
        console.log(newCoords.x, newCoords.y);
        setMoveCoords(newCoords);
      }
    }
  }, [containCenterCoords]);

  return (
    <Wrapper
      id="box"
      ref={selfRef}
      as={motion.article}
      initial={{
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        // x: 0,
        // y: 0,
      }}
      animate={{
        rotate: 360,
        rotateX: 360,
        rotateY: 360,
        rotateZ: 360,
        scale: 1.5,
        x: moveCoords?.x,
        y: moveCoords?.y,
        transition: { duration: 10 },
      }}
    >
      <div className="center">
        {coords ? coords.x : null}
        <br />
        {coords ? coords.y : null}
      </div>
    </Wrapper>
  );
};
export default Box;

const Wrapper = styled.article`
  position: relative;
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
