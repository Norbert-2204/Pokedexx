import { createContext, useContext, useEffect, useState } from "react";
import { useLocaleFetch } from "../custom hooks/useLocaleFetch";
import { useSnackbar } from "notistack";

const LoggedInContext = createContext();
export const LoggedContext = () => useContext(LoggedInContext);

const LoggedInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const { sendRequest: checkLogged } = useLocaleFetch();
  const { sendRequest: logedOut } = useLocaleFetch("PATCH");
  const [isLoading, setIsLoading] = useState(true);
  const enqueueSnackbar = useSnackbar();

  const refreshUser = async () => {
    try {
      if (!loggedIn?.id) return;
      const updatedUser = await checkLogged(
        `http://localhost:3000/Users/${loggedIn.id}`
      );

      setLoggedIn(updatedUser);
    } catch (err) {
      enqueueSnackbar(`Server error: ${err}`, { variant: "error" });
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const savedUser = localStorage.getItem("loggedUser");
        if (savedUser) {
          setLoggedIn(JSON.parse(savedUser));
          return;
        }
        const response = await checkLogged(
          "http://localhost:3000/Users?isLoggedIn=true"
        );
        setLoggedIn(response?.[0]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  const logoff = async () => {
    if (!loggedIn) return;

    logedOut(`http://localhost:3000/Users/${loggedIn.id}`, {
      isLoggedIn: false,
    });

    setLoggedIn(null);
  };

  return (
    <LoggedInContext.Provider
      value={{ loggedIn, setLoggedIn, logoff, refreshUser }}
    >
      {!isLoading && children}
    </LoggedInContext.Provider>
  );
};
export default LoggedInProvider;
