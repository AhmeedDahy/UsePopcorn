import { useState, useEffect } from "react";
const KEY = "3e0b7b5";
export function useMovies(query, callBack) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const API_LINK = `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`;

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchAPI() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(API_LINK, { signal: controller.signal });
          if (!res.ok)
            throw new Error("Something went wrong with  fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      callBack?.();
      fetchAPI();
      return function () {
        controller.abort();
      };
    },
    [query, API_LINK]
  );
  return { movies, isLoading, error };
}
