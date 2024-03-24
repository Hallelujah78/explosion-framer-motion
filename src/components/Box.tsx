import styled from "styled-components";
import { motion } from "framer-motion";

interface BoxProps {
  content: number;
}

const Box: React.FC<BoxProps> = ({ content }) => {
  return (
    <Wrapper
      as={motion.div}
      initial={{ scale: 1 }}
      animate={{
        rotate: 360,
        rotateX: 360,
        rotateY: 360,
        rotateZ: 180,
        scale: 1.5,
        x: "-100vw",
        y: "-100vw",
      }}
      transition={{
        duration: 15,
      }}
    >
      <div className="center">{content}</div>
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
