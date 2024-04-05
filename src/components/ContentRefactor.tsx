// react
import { useState, useEffect, useRef } from "react";

// libs
import styled from "styled-components";
import { motion } from "framer-motion";

// assets
import kitten from "../assets/images/kitten.png";

// components
import Loading from "./Loading";

import { boxes } from "../data/data";

// models
import { Coords } from "../models/types";
import TileHookClickRefactor from "./TileHookClickRefactor";

const ContentRefactor: React.FC = () => {
  const myCanvas = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [imagePiece, setImagePiece] = useState<string[]>();
  const [clickCoords, setClickCoords] = useState<Coords>();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleClick = (event: MouseEvent) => {
    setIsAnimating(true);
    setClickCoords({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);

    const canvasRefCurr = myCanvas.current;

    const imagePieces: string[] = [];
    const image = new Image();
    image.src = kitten;
    image.onload = () => {
      for (let y = 0; y < 26; ++y) {
        for (let x = 0; x < 39; ++x) {
          if (canvasRefCurr) {
            const context = canvasRefCurr.getContext("2d");

            context!.drawImage(
              image,
              x * 20,
              y * 20,
              20,
              20,
              0,
              0,
              canvasRefCurr.width,
              canvasRefCurr.height
            );
            imagePieces.push(canvasRefCurr.toDataURL());
          }
        }
      }
      setImagePiece(imagePieces);
    };
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <Wrapper as={motion.section} ref={containerRef}>
      {!imagePiece ? (
        <Loading />
      ) : (
        boxes.map((content, index) => {
          let image;
          if (
            imagePiece !== undefined &&
            imagePiece !== null &&
            imagePiece.length > 0
          ) {
            image = imagePiece[index];
          } else {
            image = "";
          }
          return (
            <TileHookClickRefactor
              image={image}
              key={index}
              clickCoords={clickCoords}
              isAnimating={isAnimating}
              setIsAnimating={setIsAnimating}
            />
          );
        })
      )}
      <canvas ref={myCanvas} width={20} height={20} />
    </Wrapper>
  );
};
export default ContentRefactor;

const Wrapper = styled.section`
  position: relative;
  min-height: 80vh;
  width: fit-content;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  place-content: center;
  canvas {
    visibility: hidden;
  }
`;
