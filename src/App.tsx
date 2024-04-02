import styled from "styled-components";
import Content from "./components/Content";
import cartesianToScreen from "./utils/cartesianToScreen";

const App: React.FC = () => {
  const circleCoords = cartesianToScreen({ x: -32.5, y: 0.015625 });
  console.log("circle screen coords converted from cartesian: ", circleCoords);
  return (
    <Wrapper>
      <Content />
      <div
        style={{ top: window.innerHeight / 2, left: window.innerWidth / 2 }}
        className="screen-center"
      ></div>
      <div
        style={{
          top: circleCoords!.y,
          left: cartesianToScreen({ x: -32.5, y: 0.015625 })!.x,
        }}
        className="circle-center"
      ></div>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  overflow: hidden;
  min-height: 100vh;
  position: relative;
  display: grid;
  place-content: center;
  box-sizing: border-box !important;
  .screen-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background-color: red;
  }
  .circle-center {
    z-index: 99;
    position: absolute;
    width: 1px;
    height: 1px;
    background-color: purple;
  }
`;
