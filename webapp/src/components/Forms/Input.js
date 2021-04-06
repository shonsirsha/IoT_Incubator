import styled from "styled-components";
import { primary, darkerSecondary } from "../Colours/Colours";
import { BodyNormal } from "../Typography/Typographies";
export const StyledInput = styled.input`
  border: solid 2px ${primary};
  border-radius: 8px;
  padding: 14px 16px;
  font-family: "BrandonText";
  font-size: 16px;
  &:focus {
    border-color: #36b982;
    outline: none;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled(BodyNormal)`
  margin-bottom: 8px;
`;
const Reminder = styled(BodyNormal)`
  margin-top: 4px;
  color: ${darkerSecondary};
`;
export const Input = ({ placeholder }) => {
  return (
    <InputContainer>
      <Title>Device Name</Title>
      <StyledInput placeholder={placeholder} />
      <Reminder>Type a range (e.g. 37-39) or a single value</Reminder>
    </InputContainer>
  );
};
