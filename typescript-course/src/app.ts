const userName = "John";
console.log(userName);
// userName = "Pete"; // Error

let age = 33;

age = 34;

// Scopes example
function add(a: number, b: number) {
  var result;
  result = a + b;
  return result;
}

// block scope
if (age > 20) {
  var isOld = true;
  let str = "hello"; // available only inside curly braces (block scope)
}

// console.log(result); // Error - var is function scoped
// console.log(isOld); // JS - ok, TS - error
// console.log(str); // Error
