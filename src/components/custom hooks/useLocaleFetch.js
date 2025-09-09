import { useState } from "react";
import { useSnackbar } from "notistack";

export const useLocaleFetch = (method = "GET") => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const sendRequest = async (url, body) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        throw new Error(`HTTP error!`);
      }
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      enqueueSnackbar(`Something went wrong: ${err}`, { variant: "error" });
    }
  };
  return { data, error, sendRequest };
};
