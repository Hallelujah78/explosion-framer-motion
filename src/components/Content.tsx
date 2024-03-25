import styled from "styled-components";
import Box from "./Box";
import { boxes } from "../data/data";

const Content: React.FC = () => {
  return (
    <Wrapper>
      {boxes.map((content, index) => {
        return <Box key={index} content={content} />;
      })}
    </Wrapper>
  );
};
export default Content;

const Wrapper = styled.section`
  min-height: 80vh;
  width: fit-content;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  place-content: center;
  gap: 1rem;
`;
