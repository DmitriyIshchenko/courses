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
