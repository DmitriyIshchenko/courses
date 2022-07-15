'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true; // the scope is the entire printAge function
      // same name
      const firstName = 'Steve';
      const str = `Oh, and you are millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      //reassigning
      output = 'NEW OUTPUT';
    }
    // console.log(str); // error
    console.log(millenial); // var ignores the block
    // concole.log(add(2,3)); // error, functions are block scoped in ES6 strict mode
    console.log(output);
  }
  printAge();
  return age;
}

const firstName = 'John';
calcAge(1991);
// console.log(age); // error
// printAge(); // error

// Variables
console.log(me);
// console.log(job); error
// console.log(year); error

var me = 'John';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDecl(1, 2));
// console.log(addExpr(1, 2)); error
// console.log(addArrow(1, 2)); error

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

//Example
if (!numProducts) deleShoppingCart();

var numProducts = 10;

function deleShoppingCart() {
  console.log('All products deleted');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(x === window.y);
console.log(x === window.z);
