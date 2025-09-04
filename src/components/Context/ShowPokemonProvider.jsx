import { createContext, useContext, useEffect, useState } from "react";
import { LoggedContext } from "../Context/LoggedInProvider";
import { useFetch } from "../custom hooks/useFetch";

const ShowPokemonContext = createContext();
export const PokemonContext = () => useContext(ShowPokemonContext);

const ShowPokemonProvider = ({ children }) => {
  const { loggedIn } = LoggedContext();
  const { pokemon, isLoading } = useFetch(
    "https://pokeapi.co/api/v2/pokemon?limit=150"
  );
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [favPage, setFavPage] = useState(0);
  const [editPage, setEditPage] = useState(0);
  const limit = 15;
  const editLimit = 1;

  const filteredPokemon = [
    ...pokemon.map((pok) => {
      const edited = (loggedIn?.editedPokemon || []).find(
        (e) => Number(e.id) === pok.id
      );
      return edited ? { ...pok, ...edited } : pok;
    }),
    ...(loggedIn?.editedPokemon || []).filter(
      (e) => !pokemon.some((pok) => pok.id === e.id)
    ),
  ].filter((pok) => pok.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    setEditPage(0);
  }, [search]);

  const filteredFavorite = (loggedIn?.editedPokemon || []).filter(
    (pok) =>
      pok?.favorite && pok.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPokemon.length / limit);
  const totalEditPages = Math.ceil(filteredPokemon.length / editLimit);
  const totalFavoritePages = Math.ceil(filteredFavorite.length / limit);
  const paginationPokemon = filteredPokemon.slice(
    page * limit,
    page * limit + limit
  );
  const paginationFavorite = filteredFavorite.slice(
    favPage * limit,
    favPage * limit + limit
  );
  const paginationEdit = filteredPokemon.slice(
    editPage * editLimit,
    editPage * editLimit + editLimit
  );

  return (
    <ShowPokemonContext.Provider
      value={{
        page,
        setPage,
        favPage,
        setFavPage,
        editPage,
        setEditPage,
        search,
        setSearch,
        filteredPokemon,
        filteredFavorite,
        totalPages,
        totalFavoritePages,
        totalEditPages,
        paginationPokemon,
        paginationFavorite,
        paginationEdit,
        limit,
        isLoading,
      }}
    >
      {children}
    </ShowPokemonContext.Provider>
  );
};
export default ShowPokemonProvider;
