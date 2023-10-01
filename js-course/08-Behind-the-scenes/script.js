'use strict';

/*function calcAge(birthYear) {
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

// console.log(this);

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  // console.log(this);
};

calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  // console.log(this);
};
calcAgeArrow(1980);

const john = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};

john.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = john.calcAge;
matilda.calcAge();

const f = john.calcAge;


// var firstName = 'Matilda';
const john = {
  firstName: 'john',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // Solution 1
    // const self = this;
    // const isMillenial = function () {
    //   // console.log(this.year >= 1981 && this.year <= 1996);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };
    // isMillenial();

    // Solution 2
    const isMillenial = () => {
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },
  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};

john.calcAge();

// argumens keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(3, 4);
addExpr(3, 4, 5, 2);

var addArrow = (a, b) => {
  // console.log(arguments); error
  return a + b;
};
addArrow(1, 2);


let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
  name: 'john',
  age: 30,
};

const friend = me;
friend.age = 27;
console.log('friend:', friend);
console.log('me:', me);
*/

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName);
console.log(oldLastName);

// Reference types
const jessica = {
  fisrtName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;

marriedJessica.lastName = 'Davis';
console.log('before', jessica);
console.log('after', marriedJessica);

// marriedJessica = {}; // error

// Copying objects

const jessica2 = {
  fisrtName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2); // Shallow copy
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('before', jessica2);
console.log('after', jessicaCopy);
