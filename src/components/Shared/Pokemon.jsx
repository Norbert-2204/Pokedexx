import {
  StyledDiv,
  StyledH2,
  StyledImg,
  StyledP,
} from "../styled elements/StyledComponents";
import PokeDetails from "./PokeDetails";
import { LoggedContext } from "../Context/LoggedInProvider";
import capitalize from "../Utils/Capitalize";
import Button from "./Button";
import DeleteIcon from "@mui/icons-material/Delete";

const Pokemon = ({
  id,
  onClick,
  name,
  img,
  weight,
  height,
  baseExperience,
  abilities,
  showInArena,
  deleteBtn,
  isWinner,
}) => {
  const { loggedIn } = LoggedContext();
  const currentPokemon = loggedIn?.editedPokemon?.find(
    (p) => String(p?.id) === String(id)
  );

  return (
    <StyledDiv $hover $isWinner={isWinner}>
      <StyledDiv id={id} $pokePage onClick={onClick}>
        <StyledDiv $noEvent $pokeBlock>
          <StyledImg $pokeImg src={img} />
          <StyledH2>{capitalize(name)}</StyledH2>
        </StyledDiv>
        <StyledDiv $noEvent $pokeDetails>
          <PokeDetails greyed={height} title="Height" />
          <PokeDetails
            $size
            greyed={baseExperience}
            title={"Base experience"}
          />
          <PokeDetails greyed={weight} title="Weight" />
          <PokeDetails greyed={abilities[0]} title="Abilities" />
        </StyledDiv>
        {loggedIn &&
          currentPokemon &&
          (currentPokemon.win > 0 || currentPokemon.lose > 0) && (
            <StyledDiv $arenaStats>
              <StyledDiv>
                <StyledP>W : {currentPokemon.win}</StyledP>
              </StyledDiv>
              <StyledDiv>
                <StyledP>L : {currentPokemon.lose}</StyledP>
              </StyledDiv>
            </StyledDiv>
          )}
        {showInArena && (
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={deleteBtn}
          >
            Usuń z areny
          </Button>
        )}
      </StyledDiv>
    </StyledDiv>
  );
};
export default Pokemon;
