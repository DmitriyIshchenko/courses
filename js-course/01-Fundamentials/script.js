/* let js = "amazing";

console.log(40 + 8 + 23 - 10);

console.log(23);

let firstName = "Jonas";

console.log(firstName);
console.log(firstName);
console.log(firstName);

let PI = 3.14;

let myFirstJob = "programmer";
let myCurrentJob = "teacher";

console.log(myFirstJob);

let javascriptIsFun = true;
console.log(typeof true);
console.log(typeof javascriptIsFun);
console.log(typeof 23);
console.log(typeof "ad");

javascriptIsFun = "YES";
console.log(typeof javascriptIsFun);

let year;

console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(typeof null);


let age = 30;
age = 31; // mutating/reassigning

const birthYaer = 1991;

//error
// birthYear = 1990;

//also error
// const job;

var job = "programmer";
job = "teacher";

lastName = "sdfsg"; //legal but bad practice
console.log(lastName);


const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

// 2 ** 3 = 2 * 2 * 2
console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);

const firstName = "Jonas";
const lastName = "Smith";

console.log(firstName + " " + lastName);

let x = 10 + 5;
x += 10; // x = x + 10;
x *= 4;
x++;
x--;
x--;
console.log(x);

console.log(ageJonas > ageSarah);
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);

const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5;
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);


// Coding challenge #1

const massMark = 78;
const heightMark = 1.69;

const massJohn = 92;
const heightJohn = 1.92;

const markBMI = massMark / heightMark ** 2;
const johnBMI = massJohn / heightJohn ** 2;

const markHigherBMI = markBMI > johnBMI;
console.log(markHigherBMI);

/////////////////////////////////////

const firstName = "John";
const job = "teacher";
const birthYear = 1991;
const year = 2037;

// const person =
// "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job + "!";
const person = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
console.log(person);

console.log("String width\n\
multiple\n\
lines");

console.log(`String with
multiple
lines`);


const age = 15;

if (age >= 18) {
  console.log("Sarah can start driving license");
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years`);
}

const birthYear = 1991;

let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}

console.log(century);


////////////////////////////////////////////////
// Coding Challenge #2
const massMark = 78;
const heightMark = 1.69;

const massJohn = 92;
const heightJohn = 1.95;

const markBMI = massMark / heightMark ** 2;
const johnBMI = massJohn / heightJohn ** 2;

if (markBMI > johnBMI) {
  console.log(
    `Mark's BMI (${markBMI.toFixed(
      1
    )}) is higher than John's (${johnBMI.toFixed(1)})!`
  );
} else {
  console.log(
    `John's BMI (${johnBMI.toFixed(
      1
    )}) is higher than Mark's (${markBMI.toFixed(1)})!`
  );
}
*/

//conversion
const inputYear = "1991";
console.log(Number(inputYear));
console.log(Number(inputYear) + 18);

console.log(Number("John"));
console.log(typeof NaN);

console.log(String(23), 23);

//coercion
console.log("I am" + 23 + "yars old");
console.log("23" - "10" - 3);
console.log("23" * "2");

let n = "1" + 1; // "11"
n = n - 1; // 11 - 1 = 10
console.log(n); //10
