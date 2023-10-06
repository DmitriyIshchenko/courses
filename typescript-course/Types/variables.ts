// Strings
let movieTitle: string = "Amadeus";
movieTitle = "Arrival";
// movieTitle = 9; // Error
// movieTitle.upper(); // Error
movieTitle.toUpperCase(); // OK

// Numbers
let numCatLives: number = 9;
numCatLives += 1;
// numCatLives = "zero"; // Error

// Booleans
let gameOver: boolean = false;
gameOver = true;
// gameOver = 'true'; // Error

// Type Inference
let tvShow = "Dexter"; // infers 'string'
tvShow = "Breaking bad";
// tvShow = false; // Error

let isFunny = false;
isFunny = true;
// isFunny = 'fsdfsdf'; // Error

// the any type

// everything is valid syntax
let thing: any = "hello";
thing = 1;
thing = false;
thing();
thing.toUpperCase();

// let thing = 'hello';
// thing(); // Error
// thing.sdfskdf(); // Error

const movies = ["Arrival", "Thi Thing", "The Matrix"];
// let foundMovie; // implicit any
let foundMovie: string; // delayed initialization

for (let movie of movies) {
  if (movie === "The Matrix") {
    foundMovie = "The Matrix";
  }
}
// TS is not complaining about this because of implicit any
// but it is in case of delayed initialization
// foundMovie();
// foundMovie = 1;
// foundMovie.asdaff();
