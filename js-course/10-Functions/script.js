'use strict';

/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // numPassengers = numPassengers || 1; // old way
  // price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 15); // skip default parameter


const flight = 'LH123';
const john = {
  name: 'john smith',
  passport: 223423523525,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = `Mr. ${passenger.name}`;

  if (passenger.passport === 223423523525) {
    alert('Checked in');
  } else alert('Wrong passport!');
};

// checkIn(flight, john);
// console.log(flight, john);

// Is the same as doing...
// const flightNum = flight;
// const passenger = john;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(john);
checkIn(flight, john);



// Pass callbacks 

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher order function
const transformer = function (str, fn) {
  console.log(`Original: ${str}`);
  console.log(`Transformed: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best', upperFirstWord);
transformer('JavaScript is the best', oneWord);

// JS uses callback all the time
const high5 = () => console.log('🤚');

document.body.addEventListener('click', high5);

['John Smith', 'Ann', 'Bob'].forEach(high5);


// Returning functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greaterHey = greet('hey');
greaterHey('john');
greaterHey('steve');

greet('hello')('bob');

const greetArrow = greating => name => console.log(`${greating} ${name}`);

greetArrow('hi')('alice');


const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],

  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(123, 'John');
lufthansa.book(444, 'Bob');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// book(23, 'Sarah'); // doesn't work

// Call method
book.call(eurowings, 23, 'Sarah');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Airline',
  iataCode: 'SA',
  bookings: [],
};

book.call(swiss, 11, 'Joe');
console.log(swiss);

// Apply method

const flightData = [583, 'Cooper'];

book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

// Bind method

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookSA = book.bind(swiss);

bookEW(223, 'Steven');
console.log(eurowings);

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Pete');

// With Event Listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// const addTax = value => value + value * 0.23;
console.log(addVAT(200));

// const add = ((rate, value) => value + value * rate).bind(null, 0.23);
const addTaxRate = rate => value => value + value * rate;
const addVAT2 = addTaxRate(0.23);

console.log(addVAT2(200));


//////////////////////////////////////
// Challenge 1

//////////////////////////////////////
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const input = +prompt(`${this.question}\n${this.options.join('\n')}
(Write option number)`);

    if (!isNaN(input) && input >= 0 && input <= this.answers.length) {
      this.answers[input]++;
    }
    this.displayResult();
  },
  displayResult(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}.`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResult.call({ answers: [5, 2, 3] });
poll.displayResult.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');


// IIFE

// const runOnce = function () {
//   console.log(`This will never run again`);
// };
// runOnce();
// runOnce();

(function () {
  console.log(`This will never run again`);
  const isPrivate = 23;
})();

// console.log(isPrivate);

(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate); // error
console.log(notPrivate);


const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();
booker();

console.dir(booker);


// Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};
g();
f();
h();
f();
f();
console.dir(f);

// Example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);
*/

/////////////////////////////////////////
// Challenge 2
/////////////////////////////////////////
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
