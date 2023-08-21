import styled from "styled-components";

const StyledSelect = styled.select.attrs((props) => ({
  $borderColor:
    props.$type === "white" ? "var(--color-grey-100)" : "var(--color-grey-300)",
}))`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid ${(props) => props.$borderColor};

  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ options, value, ...props }) {
  return (
    <StyledSelect value={value} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
