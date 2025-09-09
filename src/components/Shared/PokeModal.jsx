import { createPortal } from "react-dom";
import {
  ArenaButton,
  StyledDiv,
  StyledH3,
  StyledImg,
  StyledP,
} from "../styled elements/StyledComponents";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import PokeDetails from "./PokeDetails";
import Button from "./Button";
import capitalize from "../Utils/Capitalize";
import { useEffect } from "react";
import { useLocaleFetch } from "../custom hooks/useLocaleFetch";
import { LoggedContext } from "../Context/LoggedInProvider";
import { useSnackbar } from "notistack";

const url = "http://localhost:3000/Users";

const PokeModal = ({
  onClose,
  id,
  name,
  img,
  weight,
  height,
  baseExperience,
  abilities,
}) => {
  const { loggedIn, refreshUser } = LoggedContext();
  const { sendRequest } = useLocaleFetch("PATCH");
  const { enqueueSnackbar } = useSnackbar();
  const isFavorite = loggedIn?.editedPokemon?.some(
    (p) => p?.id === id && p.favorite
  );
  useEffect(() => {
    refreshUser();
  }, []);

  const addFavorite = async () => {
    if (!loggedIn) return;

    const updatedFavorites = [...(loggedIn.editedPokemon || [])];

    const indexId = updatedFavorites.findIndex((p) => p?.id === Number(id));

    if (indexId !== -1) {
      updatedFavorites[indexId] = {
        ...updatedFavorites[indexId],
        favorite: true,
      };
    } else {
      updatedFavorites.push({
        id,
        name,
        img,
        weight,
        height,
        baseExperience,
        abilities,
        favorite: true,
        arena: false,
        win: 0,
        lose: 0,
      });
    }
    await sendRequest(`${url}/${loggedIn.id}`, {
      editedPokemon: updatedFavorites,
    });
    refreshUser();
  };

  const deleteFavorite = async () => {
    if (!loggedIn) return;

    const updatedEditedPokemon = loggedIn.editedPokemon.map((p) =>
      p?.id === Number(id) ? { ...p, favorite: false } : p
    );

    await sendRequest(`${url}/${loggedIn.id}`, {
      editedPokemon: updatedEditedPokemon,
    });
    refreshUser();
  };

  const addToArena = async () => {
    if (!loggedIn) return;

    const existingPokemon = loggedIn.editedPokemon?.find((p) => p?.id === id);
    const currentArenaLimit = loggedIn.editedPokemon?.filter(
      (p) => p?.arena
    ).length;

    if (existingPokemon) {
      if (existingPokemon.arena) {
        enqueueSnackbar("Pokemon jest już na arenie.", { variant: "info" });
        return;
      }
      if (currentArenaLimit === 2) {
        enqueueSnackbar("Na arenie znajdują się już 2 pokemony.", {
          variant: "warning",
        });
        return;
      }

      const updatedEditedPokemon = loggedIn.editedPokemon.map((p) =>
        p?.id === id ? { ...p, arena: true } : p
      );

      await sendRequest(`${url}/${loggedIn.id}`, {
        editedPokemon: updatedEditedPokemon,
      });
      await refreshUser();
      enqueueSnackbar("Pokemon dodany na arenę!", { variant: "success" });

      return;
    }
    if (currentArenaLimit === 2) {
      enqueueSnackbar("Na arenie znajdują się już 2 pokemony.", {
        variant: "warning",
      });
      return;
    }

    const newPokemon = [
      ...(loggedIn.editedPokemon || []),
      {
        id,
        name,
        img,
        weight,
        height,
        baseExperience,
        abilities,
        win: 0,
        lose: 0,
        arena: true,
      },
    ];

    await sendRequest(`${url}/${loggedIn.id}`, {
      editedPokemon: newPokemon,
    });
    await refreshUser();
    enqueueSnackbar("Pokemon dodany na arenę!", { variant: "success" });
  };

  const currentPokemon = loggedIn?.editedPokemon?.find(
    (p) => p?.id === Number(id)
  );

  return createPortal(
    <StyledDiv $modalWrapper>
      <StyledDiv id={id} $modal>
        <StyledImg src={img} />
        <StyledDiv $modalDetails>
          <StyledH3>{capitalize(name)}</StyledH3>
          <StyledDiv $pokeDetails>
            <PokeDetails greyed={height} title="Height" />
            <PokeDetails
              $size
              greyed={baseExperience}
              title={"Base experience"}
            />
            <PokeDetails greyed={weight} title="Weight" />
            <PokeDetails greyed={abilities[0]} title="Abilities" />
          </StyledDiv>
        </StyledDiv>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            width: 10,
            position: "absolute",
            top: 5,
            right: 5,
            minWidth: 10,
          }}
        >
          X
        </Button>
        {loggedIn && (
          <IconButton
            sx={{ position: "absolute", bottom: 5, right: 5 }}
            onClick={() => (isFavorite ? deleteFavorite() : addFavorite())}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        )}
        {loggedIn && (
          <StyledDiv $arenaButton>
            <ArenaButton onClick={addToArena}>
              <StyledImg $arenaImg src="/arena.png" />
            </ArenaButton>
            <StyledP>
              {loggedIn.editedPokemon
                ? loggedIn.editedPokemon.filter((p) => p?.arena).length
                : 0}
              /2
            </StyledP>
          </StyledDiv>
        )}
        {loggedIn &&
          currentPokemon &&
          (currentPokemon.win > 0 || currentPokemon.lose > 0) && (
            <StyledDiv $arenaStats>
              <StyledDiv>
                <StyledP>W: {currentPokemon.win}</StyledP>
              </StyledDiv>
              <StyledDiv>
                <StyledP>L: {currentPokemon.lose}</StyledP>
              </StyledDiv>
            </StyledDiv>
          )}
      </StyledDiv>
    </StyledDiv>,
    document.getElementById("root")
  );
};
export default PokeModal;
