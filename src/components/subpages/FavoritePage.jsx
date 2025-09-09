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

const url = `http://localhost:3000/Users`;

const FavoritePage = () => {
  const { loggedIn, setLoggedIn, refreshUser } = LoggedContext();
  const {
    search,
    setSearch,
    filteredFavorite,
    paginationFavorite,
    totalFavoritePages,
    favPage,
    setFavPage,
  } = PokemonContext();
  const [showPokemon, setShowPokemon] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (!loggedIn?.id) return;
    const getFavorite = async () => {
      const res = await fetch(`${url}/${loggedIn.id}`);
      const data = await res.json();
      setLoggedIn(data);
    };
    getFavorite();
  }, [loggedIn?.id, setLoggedIn]);

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
    setFavPage((prev) => Math.max(prev - 1, 0));
  };
  const nextPage = () => {
    setFavPage((prev) => Math.min(prev + 1, totalFavoritePages - 1));
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
        {!loggedIn && <StyledH1>Searching for pokemons...</StyledH1>}
        {filteredFavorite.length > 0 ? (
          paginationFavorite.map((pok) => {
            return (
              <Pokemon
                onClick={() => showModal(pok)}
                id={pok.id}
                key={pok.name}
                name={pok.name}
                img={pok.img}
                weight={pok.weight}
                height={pok.height}
                baseExperience={pok.baseExperience}
                abilities={pok.abilities}
              />
            );
          })
        ) : (
          <StyledH3>Nie znaleziono ulubionych pokemonów</StyledH3>
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
          />
        )}
      </StyledDiv>
      {filteredFavorite.length > 15 && (
        <StyledDiv $pagination>
          <Button onClick={prevPage} variant="contained">
            &lt;
          </Button>
          <StyledH3>{favPage + 1}</StyledH3>
          <Button onClick={nextPage} variant="contained">
            &gt;
          </Button>
        </StyledDiv>
      )}
    </StyledDiv>
  );
};
export default FavoritePage;
