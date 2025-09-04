import {
  StyledInput,
  StyledLabel,
  StyledP,
} from "../styled elements/StyledComponents";

const RegisterInput = ({ errors, $input, $edit, $inputEdit, ...rest }) => {
  return (
    <StyledLabel $input={$input} $edit={$edit}>
      <StyledInput $inputEdit={$inputEdit} {...rest} />
      <StyledP $error>{errors}</StyledP>
    </StyledLabel>
  );
};
export default RegisterInput;
