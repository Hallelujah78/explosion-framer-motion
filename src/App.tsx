import styled from "styled-components";
import Content from "./components/Content";
import InitialContent from "./components/InitialContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <Wrapper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Content />
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
