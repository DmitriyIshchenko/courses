// Parameter annotation
function square(num: number) {
  num.toUpperCase(); // ERROR
  num(); // ERROR
  return num * num;
}

function greet(person: string) {
  person * person; // ERROR
  return `Hi there, ${person}`;
}

const doSomething = (person: string, age: number, isFunny: boolean) => {};

square(3);
square("asd"); // ERROR
square(true); // ERROR

greet(true); // ERROR

doSomething("ChickenFace", 76, false);
doSomething("ChickenFace", 76, false, 11); // ERROR
doSomething("ChickenFace", 76); // ERROR

// Default parameters

function greetWithDefault(person: string = "stranger") {
  // infers return value ('string')
  return `Hi there, ${person}`;
}

greetWithDefault();
greetWithDefault("Walter");
greetWithDefault(1234); // ERROR

// Return type annotation

// ERROR: should return a number instead of 'void'
function multiply(a: number, b: number): number {
  a * b;
}

function addNums(x: number, y: number): number {
  return x + y;
}

addNums(1, 2);

// implicit union type: string | number
function rnd(num: number) {
  return Math.random() > 0.5 ? num.toString() : num;
}
