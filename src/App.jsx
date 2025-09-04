import { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoggedInProvider from "./components/Context/LoggedInProvider";
import ShowPokemonProvider from "./components/Context/ShowPokemonProvider";
import Header from "./components/Header";
import Login from "./components/subpages/Login";
import MainPage from "./components/subpages/MainPage";
import RegisterForm from "./components/subpages/RegisterForm";
import FavoritePage from "./components/subpages/FavoritePage";
import Arena from "./components/subpages/Arena";
import Ranking from "./components/subpages/Ranking";
import EditPage from "./components/subpages/EditPage";

const light = {
  color: "#000",
  background: "#d1d1d1ff",
  register: "#ffffffff",
  border: "#000000",
  shadow: "rgba(73, 67, 168, 0.5) 10%",
  pokeBackground: "white",
};

const dark = {
  color: "#fff",
  background: "#3f3f3fff",
  register: "#374151",
  border: "#c9c9c9ff",
  shadow: "rgba(73, 67, 168, 0.8) 10%",
  pokeBackground: "black",
};

const GlobalStyle = createGlobalStyle`

body {
background-color: ${(props) => props.theme.background};
color: ${(props) => props.theme.color};
}
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <>
      <BrowserRouter>
        <LoggedInProvider>
          <ShowPokemonProvider>
            <ThemeProvider theme={darkMode ? dark : light}>
              <GlobalStyle />
              <Header darkMode={darkMode} toggleTheme={toggleTheme} />
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favorites" element={<FavoritePage />} />
                <Route path="/arena" element={<Arena />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/edit" element={<EditPage />} />
              </Routes>
            </ThemeProvider>
          </ShowPokemonProvider>
        </LoggedInProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
