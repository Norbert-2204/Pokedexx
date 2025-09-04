import { useState } from "react";
import { LoggedContext } from "../Context/LoggedInProvider";
import { PokemonContext } from "../Context/ShowPokemonProvider";
import {
  StyledDiv,
  StyledH1,
  StyledSelect,
  StyledTable,
} from "../styled elements/StyledComponents";
import capitalize from "../Utils/Capitalize";

const Ranking = () => {
  const { filteredPokemon, isLoading } = PokemonContext();
  const [sort, setSort] = useState("");

  const sortedPokemon = [...filteredPokemon].sort((a, b) => {
    switch (sort) {
      case "a-z":
        return a.name.localeCompare(b.name);
      case "z-a":
        return b.name.localeCompare(a.name);
      case "weigth":
        return b.weight - a.weight;
      case "heigth":
        return b.height - a.height;
      case "wins":
        return (b.win || 0) - (a.win || 0);
      case "lose":
        return (b.lose || 0) - (a.lose || 0);
      case "exp":
        return b.baseExperience - a.baseExperience;
      default:
        return a.id - b.id;
    }
  });

  return (
    <StyledDiv $info>
      {isLoading && <StyledH1>Sprawdzanie Rankingu</StyledH1>}
      {!isLoading && (
        <StyledSelect value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value={""}>Pokedex</option>
          <option value={"a-z"}>A-Z</option>
          <option value={"z-a"}>Z-A</option>
          <option value={"weigth"}>Waga</option>
          <option value={"heigth"}>Wzrost</option>
          <option value={"wins"}>Wygrane</option>
          <option value={"lose"}>Przegrane</option>
          <option value={"exp"}>Doświadczenie</option>
        </StyledSelect>
      )}
      {!isLoading && (
        <StyledDiv $ranking>
          <StyledDiv $tableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Pokemon</th>
                  <th>Name</th>
                  <th>Heigth</th>
                  <th>Weigth</th>
                  <th>Base EXP</th>
                  <th>Abilities</th>
                  <th>W</th>
                  <th>L</th>
                </tr>
              </thead>
              <tbody>
                {sortedPokemon.map((pokemon, index) => (
                  <tr key={pokemon.id}>
                    <td>{index + 1}</td>
                    <td style={{ verticalAlign: "middle" }}>
                      <img src={pokemon.img} alt={pokemon.name} width={50} />
                    </td>
                    <td>{capitalize(pokemon.name)}</td>
                    <td>{pokemon.height}</td>
                    <td>{pokemon.weight}</td>
                    <td>{pokemon.baseExperience}</td>
                    <td>{pokemon.abilities[0]}</td>
                    <td>{pokemon.win ? pokemon.win : 0}</td>
                    <td>{pokemon.lose ? pokemon.lose : 0}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </StyledDiv>
        </StyledDiv>
      )}
    </StyledDiv>
  );
};
export default Ranking;
