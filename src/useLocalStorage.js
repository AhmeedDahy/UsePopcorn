import { useState, useEffect } from "react";

export function useLocalStorge(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    console.log(JSON.parse(storedValue));
    return JSON.parse(storedValue) || initialState;
  });
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
