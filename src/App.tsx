// libs
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

// components
import ContentRefactor from "./components/ContentRefactor";

// style
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
      <ContentRefactor />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  background-color: #252526;
  overflow: hidden;
  min-height: 100vh;
  position: relative;
  display: grid;
  place-content: center;
  box-sizing: border-box !important;
`;
