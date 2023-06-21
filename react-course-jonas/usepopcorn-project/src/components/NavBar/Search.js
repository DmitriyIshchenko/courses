import { useRef } from "react";
import { useKey } from "../../hooks/useKey";

export default function Search({ query, setQuery }) {
  // not react way to do things
  // useEffect(() => {
  // const el = document.querySelector(".search");
  // console.log(el);
  // el.focus();
  // }, []);

  const inputEl = useRef(null);

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();

    setQuery("");
  });

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
