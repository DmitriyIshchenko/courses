// GENERIC FUNCTION

// T for type, U - next in alphabet
function merge<T, U>(objA: T, objB: U) {
  return Object.assign({}, objA, objB);
}

// const mergedObj = merge({ name: "John" }, { age: 33 }) as {
//   name: string;
//   age: number;
// }; // BAD

const mergedObj = merge({ name: "John", hobbies: ["Sports"] }, { age: 33 });
const mergedObj2 = merge({ name: "Steve" }, { age: 64 });

// tell which type it should fill in (redundant)
const mergedObj3 = merge<{ name: string; hobbies: string[] }, { age: number }>(
  { name: "Sam", hobbies: ["Sports"] },
  { age: 55 }
);

console.log(mergedObj, mergedObj2, mergedObj3);
