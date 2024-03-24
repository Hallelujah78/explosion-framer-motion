import styled from "styled-components";
import Content from "./components/Content";

const App: React.FC = () => {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
  display: grid;
  place-content: center;
  box-sizing: border-box !important;
`;
