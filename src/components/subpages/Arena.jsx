import Button from "../Shared/Button";
import Pokemon from "../Shared/Pokemon";
import { LoggedContext } from "../Context/LoggedInProvider";
import {
  StyledDiv,
  StyledH1,
  StyledH3,
} from "../styled elements/StyledComponents";
import { useLocaleFetch } from "../custom hooks/useLocaleFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import capitalize from "../Utils/Capitalize";
import { useSnackbar } from "notistack";

const url = "http://localhost:3001/Users";

const Arena = () => {
  const { loggedIn, setLoggedIn, refreshUser } = LoggedContext();
  const { sendRequest } = useLocaleFetch();
  const { sendRequest: updatePokemon } = useLocaleFetch("PATCH");
  const [pokemons, setPokemons] = useState([]);
  const [isWinner, setIsWinner] = useState(null);
  const [tie, setTie] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    const getArenaPokemons = async () => {
      const res = await sendRequest(`${url}/${loggedIn.id}`);
      setPokemons(res.editedPokemon || []);
    };
    getArenaPokemons();
  }, [loggedIn]);

  const arenaPokemon = pokemons?.filter((p) => p?.arena);
  const firstPokemon = arenaPokemon[0];
  const secondPokemon = arenaPokemon[1];

  const deletePokemon = async (id) => {
    const selectedPokemon = pokemons.map((p) =>
      p?.id === id ? { ...p, arena: false } : p
    );
    await updatePokemon(`${url}/${loggedIn.id}`, {
      editedPokemon: selectedPokemon,
    });
    setPokemons(selectedPokemon);
    setLoggedIn((prev) => ({ ...prev, editedPokemon: selectedPokemon }));
    setIsWinner(null);
    setTie(null);
  };

  const calculateWinner = async () => {
    setIsWinner(null);
    const firstScore = firstPokemon.baseExperience * firstPokemon.weight;
    const secondScore = secondPokemon.baseExperience * secondPokemon.weight;

    const updatedPokemons = loggedIn?.editedPokemon?.map((p) => {
      if (p?.id === firstPokemon.id) {
        if (firstScore > secondScore) {
          setIsWinner(firstPokemon);
          if (p.baseExperience === 9999) {
            enqueueSnackbar(
              `${capitalize(p.name)} osiągnął maksymalny poziom!`,
              {
                variant: "warning",
              }
            );
          }

          return {
            ...p,
            baseExperience:
              p.baseExperience >= 9999 ? 9999 : p.baseExperience + 10,
            win: (p.win || 0) + 1,
          };
        }
        if (firstScore < secondScore) return { ...p, lose: (p.lose || 0) + 1 };
      }
      if (p?.id === secondPokemon.id) {
        if (firstScore > secondScore) return { ...p, lose: (p.lose || 0) + 1 };
        if (firstScore < secondScore) {
          setIsWinner(secondPokemon);
          if (p.baseExperience === 9999) {
            enqueueSnackbar(
              `${capitalize(p.name)} osiągnął maksymalny poziom!`,
              {
                variant: "warning",
              }
            );
          }

          return {
            ...p,
            baseExperience:
              p.baseExperience >= 9999 ? 9999 : p.baseExperience + 10,
            win: (p.win || 0) + 1,
          };
        }
      }
      if (firstScore === secondScore) {
        setTie(true);
        return p;
      }
      return p;
    });

    setPokemons(updatedPokemons);
    setLoggedIn((prev) => ({ ...prev, editedPokemon: updatedPokemons }));
    await updatePokemon(`${url}/${loggedIn.id}`, {
      editedPokemon: updatedPokemons,
    });
    await refreshUser();
  };

  const finishBattle = async () => {
    const selectedPokemons = loggedIn.editedPokemon.map((p) =>
      p?.arena ? { ...p, arena: false } : p
    );
    await updatePokemon(`${url}/${loggedIn.id}`, {
      editedPokemon: selectedPokemons,
    });
    setPokemons(selectedPokemons);
    setLoggedIn((prev) => ({ ...prev, editedPokemon: selectedPokemons }));
    setIsWinner(null);
    setTie(null);
    refreshUser();
    navigate("/");
  };

  return (
    <StyledDiv $pokeWrapper>
      {tie && (
        <StyledDiv $info $gap>
          <StyledH3 $bigger>Remis!</StyledH3>
          <Button onClick={() => finishBattle()} variant="contained">
            Opuść arene
          </Button>
        </StyledDiv>
      )}
      {isWinner && (
        <StyledDiv $info $gap>
          <StyledH3 $bigger>Zwyciężca: {capitalize(isWinner?.name)}</StyledH3>
          <Button onClick={() => finishBattle()} variant="contained">
            Opuść arene
          </Button>
        </StyledDiv>
      )}
      {arenaPokemon?.length !== 0 ? (
        <StyledDiv $main $arenaSmallScreen>
          {firstPokemon && (
            <Pokemon
              id={firstPokemon.id}
              name={firstPokemon.name}
              img={firstPokemon.img}
              weight={firstPokemon.weight}
              height={firstPokemon.height}
              baseExperience={firstPokemon.baseExperience}
              abilities={firstPokemon.abilities}
              showInArena={firstPokemon.arena}
              deleteBtn={() => deletePokemon(firstPokemon.id)}
              isWinner={isWinner?.id === firstPokemon.id}
            />
          )}
          {arenaPokemon.length > 0 && (
            <Button
              variant="contained"
              sx={{ width: 150 }}
              disabled={arenaPokemon.length < 2}
              onClick={() => calculateWinner()}
            >
              Walcz!
            </Button>
          )}
          {secondPokemon && (
            <Pokemon
              id={secondPokemon.id}
              name={secondPokemon.name}
              img={secondPokemon.img}
              weight={secondPokemon.weight}
              height={secondPokemon.height}
              baseExperience={secondPokemon.baseExperience}
              abilities={secondPokemon.abilities}
              showInArena={secondPokemon.arena}
              deleteBtn={() => deletePokemon(secondPokemon.id)}
              isWinner={isWinner?.id === secondPokemon.id}
            />
          )}
        </StyledDiv>
      ) : (
        <StyledDiv $info>
          <StyledH1>Arena</StyledH1>
          <StyledH3>Dodaj pokemony do areny!</StyledH3>
        </StyledDiv>
      )}
    </StyledDiv>
  );
};
export default Arena;
