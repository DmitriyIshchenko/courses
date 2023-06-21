import { useEffect, useRef } from "react";

export default function Search({ query, setQuery }) {
  // not react way to do things
  // useEffect(() => {
  // const el = document.querySelector(".search");
  // console.log(el);
  // el.focus();
  // }, []);

  const inputEl = useRef(null);

  useEffect(() => {
    const callback = (e) => {
      // focused element
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();

        setQuery("");
      }
    };

    document.addEventListener("keydown", callback);

    inputEl.current.focus();

    return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
