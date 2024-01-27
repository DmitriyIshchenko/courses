// const person: { name: string; age: number } = {
const person = {
  name: "john",
  age: 30,
  hobbies: ["Sports", "Cooking"],
};

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
