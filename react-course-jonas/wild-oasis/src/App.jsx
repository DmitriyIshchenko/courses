import styled from "styled-components";
import GlobalStyles from "./styles/GlobasStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

// tagged template literals
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The wild oasis</H1>
        <Button onClick={() => alert("1")}>Click me</Button>
        <Button onClick={() => alert("1")}>Click me</Button>

        <Input type="number" placeholder="number of guests" />
      </StyledApp>
    </>
  );
}

export default App;
