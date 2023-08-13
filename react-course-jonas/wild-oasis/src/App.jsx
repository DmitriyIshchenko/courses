import styled from "styled-components";
import GlobalStyles from "./styles/GlobasStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The wild oasis</Heading>
        <Heading as="h2">Check it and out</Heading>
        <Button onClick={() => alert("1")}>Click me</Button>
        <Button onClick={() => alert("1")}>Click me</Button>

        <Heading as="h3">Form</Heading>
        <Input type="number" placeholder="number of guests" />
      </StyledApp>
    </>
  );
}

export default App;
