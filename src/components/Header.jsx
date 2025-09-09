import { LoggedContext } from "./Context/LoggedInProvider.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PokemonContext } from "./Context/ShowPokemonProvider.jsx";
import capitalize from "./Utils/Capitalize.js";
import { useSnackbar } from "notistack";
import Button from "./Shared/Button.jsx";
import {
  StyledDiv,
  StyledP,
  SliderInput,
  StyledLabel,
  SliderTrack,
  StyledH1,
} from "./styled elements/StyledComponents.js";
import { useMediaQuery } from "@mui/material";

const Header = ({ darkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const { loggedIn, logoff } = LoggedContext();
  const { enqueueSnackbar } = useSnackbar();

  const smallScreen = useMediaQuery("(max-width:1199.98px)");
  const bigScreen = useMediaQuery("(min-width:1200px)");
  const logoffSmallScreen = useMediaQuery("(max-width:767.98px)");
  const logoffBigScreen = useMediaQuery("(min-width:768px)");
  const [burgerOpen, setBurgerOpen] = useState(false);
  const toggleBurger = () => setBurgerOpen((prev) => !prev);
  const { setSearch } = PokemonContext();

  const handleLogout = () => {
    logoff();
    localStorage.removeItem("loggedUser");
    navigate("/");
    setSearch("");
    enqueueSnackbar("Wylogowano pomyślnie", { variant: "success" });
  };

  const handleNav = (path) => {
    navigate(path);
    if (loggedIn) setSearch("");
  };

  const handleBurgerNav = (path) => {
    navigate(path);
    setBurgerOpen(false);
    if (loggedIn) setSearch("");
  };

  return (
    <StyledDiv $header>
      <StyledH1 $home onClick={() => navigate("/")}>
        Pokedex
      </StyledH1>
      <StyledDiv $headerSection>
        <StyledDiv $headerGap>
          {loggedIn && <StyledP>{capitalize(loggedIn.name)}</StyledP>}
          <StyledDiv $slider>
            <StyledLabel $slider>
              <SliderInput
                $slider
                type="checkbox"
                checked={darkMode}
                onChange={toggleTheme}
              />
              <SliderTrack $dark={darkMode} />
            </StyledLabel>
          </StyledDiv>
        </StyledDiv>

        {loggedIn && (
          <StyledDiv>
            {smallScreen && (
              <StyledDiv $burger>
                <Button onClick={toggleBurger} variant="contained">
                  &#9776;
                </Button>
                {toggleBurger && (
                  <StyledDiv $navBurger $burgerOpen={burgerOpen}>
                    <Button
                      onClick={() => handleBurgerNav("/favorites")}
                      variant="contained"
                      sx={{ width: 150 }}
                    >
                      Ulubione
                    </Button>
                    <Button
                      onClick={() => handleBurgerNav("/arena")}
                      variant="contained"
                      sx={{ width: 150 }}
                    >
                      Arena
                    </Button>
                    <Button
                      onClick={() => handleBurgerNav("/ranking")}
                      variant="contained"
                      sx={{ width: 150 }}
                    >
                      Ranking
                    </Button>
                    <Button
                      onClick={() => handleBurgerNav("/edit")}
                      variant="contained"
                      sx={{ width: 150 }}
                    >
                      Edycja
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant="contained"
                      sx={{ width: 150 }}
                    >
                      Wyloguj
                    </Button>
                  </StyledDiv>
                )}
              </StyledDiv>
            )}
            {bigScreen && (
              <StyledDiv $headerGap>
                <Button
                  onClick={() => handleNav("/favorites")}
                  variant="contained"
                  sx={{ width: 150 }}
                >
                  Ulubione
                </Button>
                <Button
                  onClick={() => handleNav("/arena")}
                  variant="contained"
                  sx={{ width: 150 }}
                >
                  Arena
                </Button>
                <Button
                  onClick={() => handleNav("/ranking")}
                  variant="contained"
                  sx={{ width: 150 }}
                >
                  Ranking
                </Button>
                <Button
                  onClick={() => handleNav("/edit")}
                  variant="contained"
                  sx={{ width: 150 }}
                >
                  Edycja
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  sx={{ width: 150 }}
                >
                  Wyloguj
                </Button>
              </StyledDiv>
            )}
          </StyledDiv>
        )}
        {!loggedIn && (
          <StyledDiv>
            {logoffSmallScreen && (
              <StyledDiv $burger>
                <Button onClick={toggleBurger} variant="contained">
                  &#9776;
                </Button>
                {burgerOpen && (
                  <StyledDiv $navBurger $burgerOpen={burgerOpen}>
                    <Button
                      onClick={() => handleBurgerNav("/login")}
                      variant="contained"
                      sx={{ width: 150 }}
                    >
                      Zaloguj
                    </Button>
                    <Button
                      onClick={() => handleBurgerNav("/register")}
                      variant="contained"
                      sx={{ width: 150 }}
                    >
                      Rejestracja
                    </Button>
                  </StyledDiv>
                )}
              </StyledDiv>
            )}

            {logoffBigScreen && (
              <StyledDiv $headerGap>
                <Button
                  onClick={() => handleNav("/login")}
                  variant="contained"
                  sx={{ width: 150 }}
                >
                  Zaloguj
                </Button>
                <Button
                  onClick={() => handleNav("/register")}
                  variant="contained"
                  sx={{ width: 150 }}
                >
                  Rejestracja
                </Button>
              </StyledDiv>
            )}
          </StyledDiv>
        )}
      </StyledDiv>
    </StyledDiv>
  );
};
export default Header;
