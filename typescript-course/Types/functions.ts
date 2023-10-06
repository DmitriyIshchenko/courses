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
