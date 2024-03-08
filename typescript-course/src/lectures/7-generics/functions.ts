// GENERIC FUNCTION

// T for type, U - next in alphabet
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign({}, objA, objB);
}

// const mergedObj = merge({ name: "John" }, { age: 33 }) as {
//   name: string;
//   age: number;
// }; // BAD

const mergedObj = merge({ name: "John", hobbies: ["Sports"] }, { age: 30 });
// const mergedObj2 = merge({ name: "Steve" }, { age: 64 });

// tell which type it should fill in (redundant)
// const mergedObj3 = merge<{ name: string; hobbies: string[] }, { age: number }>(
//   { name: "Sam", hobbies: ["Sports"] },
//   { age: 55 }
// );

console.log(mergedObj);

interface Lengthy {
  length: number;
}

// TYPE CONSTRAINTS
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value";

  if (element.length === 1) {
    descriptionText = `Got 1 element`;
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements`;
  }
  return [element, descriptionText];
}

console.log(countAndDescribe([]));
console.log(countAndDescribe([1, 2, 3, 4]));
console.log(countAndDescribe("hello"));

// KEYOF CONSTRAINTS
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return console.log(`Value: ${obj[key]}`);
}

extractAndConvert({ name: "pete" }, "name");
