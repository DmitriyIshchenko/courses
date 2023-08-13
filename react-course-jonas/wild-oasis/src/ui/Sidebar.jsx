import { styled } from "styled-components";

const StyledSidebar = styled.aside`
  grid-row: 1/-1;

  border-right: 1px solid var(--color-grey-100);
  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-0);
`;

function Sidebar() {
  return <StyledSidebar>sidebar</StyledSidebar>;
}

export default Sidebar;
