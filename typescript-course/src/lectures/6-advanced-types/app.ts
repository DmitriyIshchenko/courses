type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Admin, Employee {} // with interface

type ElevatedEmployee = Admin & Employee; // object types - combination

const steve: ElevatedEmployee = {
  name: "steve",
  privileges: ["create"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // union types - types in common (number in this case)

// TYPE GUARDS

function add(a: Combinable, b: Combinable) {
  // type guard
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`);

  // check if property exists
  if ("privileges" in emp) {
    console.log(`Privileges: ${emp.privileges}`);
  }

  if ("startDate" in emp) {
    console.log(`StartDate: ${emp.startDate}`);
  }
}

printEmployeeInformation({ name: "Jack", startDate: new Date() });

class Car {
  drive() {
    console.log("driving...");
  }
}

class Truck {
  drive() {
    console.log("driving truck...");
  }

  loadCargo(amount: number) {
    console.log(`loading cargo: ${amount}`);
  }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  // type guard
  // if ("loadCargo" in vehicle) {
  //   vehicle.loadCargo(12);
  // }

  // type guard
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(12);
  }
}
useVehicle(v1);
useVehicle(v2);

// DISCRIMINATING UNIONS

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }

  console.log(`Moving at ${speed} MPH`);
}

moveAnimal({ type: "bird", flyingSpeed: 12 });

// TYPE CASTING

// const userInputElement = <HTMLInputElement>(
//   document.getElementById("user-input")!
// );
// const userInputElement = document.getElementById(
//   "user-input"
// )! as HTMLInputElement;

const userInputElement = document.getElementById("user-input");

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "hello";
}

// INDEX TYPES
// don't know in advance which exact properties are going to be in the object
// {email: 'Not a valid input', username: 'Must start with a letter'}
// {email: 'Not a valid input', password: 'Too short'}

interface ErrorContainer {
  // id: string; // still possible to add properties, but they have to match the index type
  // id: number; // Error
  [key: string]: string; // matches every property
}

const errorBag: ErrorContainer = {
  email: "Invalid email",
  username: "Too short",
};

// FUNCTION OVERLOADS

function addOverload(a: number, b: number): number;
function addOverload(a: string, b: string): string;
function addOverload(a: Combinable, b: Combinable) {
  // type guard
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
}

const result1 = add(1, 5); // returns union type
const result2 = add("John", "Doe"); // returns union type
const result3 = add("John", "Doe") as string; // type cast string (bad)

// result2.split(" "); // Error

const resultOverloadNumber = addOverload(1, 2); // returns number
const resultOverloadString = addOverload("John", "Doe"); // returns string
resultOverloadString.split(" "); // ok

// OPTIONAL CHAINING - don't know with certainty whether property defined or not

const fetchedUserDate = {
  id: "u1",
  name: "steve",
  job: { title: "CEO", description: "My own company" },
};

// console.log(fetchedUserDate.job.title);
// console.log(fetchedUserDate.job && fetchedUserDate.job.title); // JS way - && short circuits to first falsy value
console.log(fetchedUserDate?.job.title); // short circuits to undefined

// NULLISH COALESCING - short circuits to first non nullish value (not null or undefined)

const userInput = null;

// const storedData = userInput || "DEFAULT"; // doesn't work as intended with number 0, false or empty string '' || 'default' -> ''
const storedData = userInput ?? "DEFAULT";

console.log(storedData);
