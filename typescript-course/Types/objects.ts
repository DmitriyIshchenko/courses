const printName = (name: { first: string; last: string }) => {
  return `Name: ${name.first} ${name.last}`;
};

// printName({}); // ERROR
// printName({ first: 1 }); // ERROR
// printName({ first: 1, last: 3 }); // ERROR

printName({ first: "Walter", last: "White" });

// annotate object types
let coordinate: { x: number; y: number } = {
  x: 12,
  y: 132,
};

// annotate return object types
function randomCoordinate(): { x: number; y: number } {
  return {
    x: Math.random(),
    y: Math.random(),
  };
}

// excess properties
// ERROR - passing extra data with object literal is likely a mistake (that's what they thought)
// printName({ first: "Jesse", last: "Pinkman", age: 22 });

// NO ERROR - passing the variable with extra data is fine
const character = { first: "Jesse", last: "Pinkman", age: 22 };
printName(character); // NO ERROR
