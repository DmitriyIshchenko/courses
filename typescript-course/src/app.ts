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
