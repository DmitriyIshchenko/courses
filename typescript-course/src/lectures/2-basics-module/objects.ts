// const person: { name: string; age: number } = {

// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "john",
//   age: 30,
//   hobbies: ["Sports", "Cooking"],
//   role: [2, "author"], // infers array, need tuple
// };

// ENUMS

// JS way
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: "john",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

// TUPLES
// person.role.push("admin"); // exception that allowed in tuples
// person.role[1] = 1; // Error
// person.role = [1, "admin", 0]; // Error

// ARRAYS
let favoriteActivities: string[];
// favoriteActivities = "sports"; // Error
// favoriteActivities = ["sports", 1]; //Error
favoriteActivities = ["sports"];
favoriteActivities = ["sports", "a"];
console.log(person.name, favoriteActivities);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  // console.log(hobby.map()) // Error
}

if (person.role === Role.ADMIN) {
  console.log("is admin");
}
