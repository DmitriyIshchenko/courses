import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  // const [watched, setWatched] = useState([]);
  // lazy initial state (requires pure function as a callback)
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return JSON.parse(storedValue) || initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
