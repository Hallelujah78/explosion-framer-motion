import styled from "styled-components";

const Loading: React.FC = () => {
  return (
    <Wrapper>
      <h1>Coolness incoming...</h1>
    </Wrapper>
  );
};
export default Loading;

const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
  h1 {
    font-size: 3vw;
  }
`;
