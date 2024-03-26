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
        currentRef.getBoundingClientRect().height / 2;
      setCoords(coords);
      if (containCenterCoords !== undefined) {
        const { x: containX, y: containY } = containCenterCoords;
        // containCoords will be point 1, coords will be point 2
        const slope = (-containY - -coords.y) / (containX - coords.x);
        // equation of a line: y - mx = b
        const yIntercept = -containY - slope * containX;
        // if x is -200
        let newX: number;
        let newY: number;
        console.log(slope);
        if (slope < -1 && coords.x < containX) {
          // choose y and then calc y + calc x from y
          // y = mx + b
          newY =
            -currentRef.getBoundingClientRect().y +
            currentRef.getBoundingClientRect().height / 2;
          // y = mx + b => -mx = -y + b => mx = y - b => x = (y-b)/m
          newX = (newY - yIntercept) / slope;
        } else {
          newX =
            currentRef.getBoundingClientRect().x +
            currentRef.getBoundingClientRect().width / 2;
          // y = mx + b
          newY = newX * slope - yIntercept;
        }

        const newCoords = { x: newX, y: -newY };

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
        x: 0,
        y: 0,
      }}
      animate={{
        rotate: 360,
        rotateX: 360,
        rotateY: 360,
        rotateZ: 360,
        scale: 1.5,
        x: moveCoords?.x,
        y: moveCoords?.y,
        transition: { duration: 15 },
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
