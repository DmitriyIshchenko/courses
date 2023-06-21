import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import { KEY } from "../App";
import ErrorMessage from "./UI/ErrorMessage";
import Loader from "./UI/Loader";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current += 1;
    console.log(countRef.current);
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      poster,
      title,
      runtime: +runtime.split(" ")[0] || 90,
      imdbRating: +imdbRating,
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  /* Hooks experiments (how not to call hooks)
  
  Conditional calling:
  if(imdbRating > 8) [isTop, setIsTop] = useState(false);
 
  Early return:
  if(imdbRating > 8) return <p>Great!</p>

  imdb rating is still undefined on mount
  (will state false forever without manual update)

  const [isTop, setIsTop] = useState(imdbRating > 5);
  console.log(isTop);

  works but we should use the derived state instead
  useEffect(() => {
    setIsTop(imdbRating > 5);
  }, [imdbRating]);

  derived state
  const isTop = imdbRating > 5;
    */

  /* close tab on Esc press */
  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") onCloseMovie();
    }
    document.addEventListener("keydown", callback);

    // must cleanup the event listener to prevent handlers accumulating
    return () => document.removeEventListener("keydown", callback);
  }, [onCloseMovie]);

  // update document title
  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  // fetch movie details
  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movie");

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error(data.Error);
          }

          setMovie(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <div className="details">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${title} poster`} />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐️</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
