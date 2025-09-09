import {
  StyledDiv,
  StyledH3,
  StyledP,
} from "../styled elements/StyledComponents";

const PokeDetails = ({ greyed, title, $size }) => {
  return (
    <StyledDiv $noEvent $info>
      <StyledP $info>{String(greyed).toLowerCase()}</StyledP>
      <StyledH3 $size={$size}>{title}</StyledH3>
    </StyledDiv>
  );
};
export default PokeDetails;
