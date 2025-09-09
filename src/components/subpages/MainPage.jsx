import { useFetch } from "../custom hooks/useFetch";
import { useState, useEffect } from "react";
import { LoggedContext } from "../Context/LoggedInProvider";
import { PokemonContext } from "../Context/ShowPokemonProvider";
import PokeModal from "../Shared/PokeModal";
import Pokemon from "../Shared/Pokemon";
import Button from "../Shared/Button";
import {
  StyledDiv,
  StyledH1,
  StyledH3,
  StyledInput,
} from "../styled elements/StyledComponents";
import { useMediaQuery } from "@mui/material";

const MainPage = () => {
  const { refreshUser } = LoggedContext();
  const { search, setSearch, paginationPokemon, totalPages, page, setPage } =
    PokemonContext();

  const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  const { pokemon, isLoading } = useFetch(url);

  const [showPokemon, setShowPokemon] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const bigScreen = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (showPokemon) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showPokemon]);

  const showModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowPokemon(true);
  };
  const closeModal = () => setShowPokemon(false);

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };
  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <StyledDiv $pokeWrapper>
      <StyledDiv $search>
        <StyledInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          $search
          placeholder="Search"
        />
      </StyledDiv>
      <StyledDiv $main>
        {isLoading && <StyledH1>Szukanie pokemonów...</StyledH1>}
        {!isLoading &&
          paginationPokemon.map((pok) => {
            return (
              <Pokemon
                onClick={() => showModal(pok)}
                key={pok.id}
                id={pok.id}
                name={pok.name}
                img={pok.img}
                weight={pok.weight}
                height={pok.height}
                baseExperience={pok.baseExperience}
                abilities={pok.abilities}
              />
            );
          })}
      </StyledDiv>
      {!isLoading && (
        <StyledDiv>
          {bigScreen ? (
            <StyledDiv $pagination>
              <Button onClick={() => setPage(0)} variant="contained">
                First page
              </Button>
              <Button onClick={prevPage} variant="contained">
                &lt;
              </Button>
              <StyledH3>{page + 1}</StyledH3>
              <Button onClick={nextPage} variant="contained">
                &gt;
              </Button>
              <Button
                onClick={() => setPage(totalPages - 1)}
                variant="contained"
              >
                Last Page
              </Button>
            </StyledDiv>
          ) : (
            <StyledDiv $pagination $smallScreen>
              <Button
                onClick={() => setPage(0)}
                variant="contained"
                sx={{ width: 50 }}
              >
                First page
              </Button>
              <Button onClick={prevPage} variant="contained" sx={{ width: 20 }}>
                &lt;
              </Button>
              <StyledH3>{page + 1}</StyledH3>
              <Button onClick={nextPage} variant="contained" sx={{ width: 20 }}>
                &gt;
              </Button>
              <Button
                onClick={() => setPage(totalPages - 1)}
                variant="contained"
                sx={{ width: 50 }}
              >
                Last Page
              </Button>
            </StyledDiv>
          )}
        </StyledDiv>
      )}
      {showPokemon && selectedPokemon && (
        <PokeModal
          onClose={closeModal}
          id={selectedPokemon.id}
          name={selectedPokemon.name}
          img={selectedPokemon.img}
          weight={selectedPokemon.weight}
          height={selectedPokemon.height}
          baseExperience={selectedPokemon.baseExperience}
          abilities={selectedPokemon.abilities}
          pokemon={pokemon}
        />
      )}
    </StyledDiv>
  );
};
export default MainPage;
