import { useEffect, useState } from "react";
export const useFetch = (url) => {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getPokemon = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();

        const pokeDetails = await Promise.all(
          data.results.map(async (pok) => {
            const response = await fetch(pok.url);
            const details = await response.json();

            return {
              id: details.id,
              name: details.name,
              img: details.sprites.front_default,
              weight: details.weight,
              height: details.height,
              baseExperience: details.base_experience,
              abilities: details.abilities.map((a) => a.ability.name),
            };
          })
        );

        setPokemon(pokeDetails);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getPokemon();
  }, [url]);
  return { pokemon, setPokemon, isLoading };
};
