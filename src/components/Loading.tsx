import styled from "styled-components";

const Loading: React.FC = () => {
  return (
    <Wrapper>
      <h1>Cuteness incoming...</h1>
    </Wrapper>
  );
};
export default Loading;

const Wrapper = styled.div`
  color: white;
  position: absolute;
  height: 100%;
  width: 100%;
  display: grid;
  place-content: center;
  h1 {
    font-size: 3vw;
  }
`;
