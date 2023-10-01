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


console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("John"));
console.log(Boolean({}));

const money = 0;

if (money) {
  console.log("Don't spend it all");
} else console.log("You should get a job!");

let height = 0;
if (height) {
  console.log("Height is defined");
} else console.log("height is undefined");


const age = "18";
// const age = 18;

if (age === 18) console.log("You just became an adult (strict)");
if (age == 18) console.log("You just became an adult (loose)");

const favourite = Number(prompt("What is your favourite number?"));
console.log(favourite);

if (favourite === 23) {
  console.log("cool! 23 is an amazing number");
} else if (favourite === 7) {
  console.log("7 is also cool");
} else {
  console.log("Number is not 23 or 7");
}

if (favourite !== 23) {
  console.log("why not 23?");
}


const hasDriversLicense = true; //A
const hasGoodVision = true; //B

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

// if (hasDriversLicense && hasGoodVision) {
//   console.log("Sarah is able to drive");
// } else console.log("someone else should drive");

const isTired = false; // C
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log("Sarah is able to drive");
} else console.log("someone else should drive");



// //////////////////////////////////////////////////////
// Challenge 2
///////////////////////////////////////////////////////////

// const avgDolphins = (96 + 108 + 89) / 3;
// const avgKoalas = (88 + 91 + 110) / 3;

//BONUS 1
// const avgDolphins = (97 + 112 + 101) / 3;
// const avgKoalas = (109 + 95 + 123) / 3;

//BONUS 2
const avgDolphins = (97 + 112 + 101) / 3;
const avgKoalas = (109 + 95 + 106) / 3;

console.log(avgDolphins, avgKoalas);

if (avgDolphins > avgKoalas && avgDolphins >= 100) {
  console.log("Dolphins win!");
} else if (avgKoalas > avgDolphins && avgKoalas >= 100) {
  console.log("Koalas win!");
} else if (avgDolphins === avgKoalas && avgDolphins >= 100) {
  console.log("Draw!");
} else console.log("No team wins");


const day = "friday";

switch (day) {
  case "monday":
    console.log("Plan course structure");
    console.log("Go to coding meetup");
    break;
  case "tuesday":
    console.log("prepare video");
    break;
  case "wednesday":
  case "thursday":
    console.log("code");
    break;
  case "friday":
    console.log("record");
    break;
  case "saturday":
  case "sunday":
    console.log("enjoy");
    break;
  default:
    console.log("invalid");
}

if (day === "monday") {
  console.log("Plan course structure");
  console.log("Go to coding meetup");
} else if (day === "tuesday") {
  console.log("prepare video");
} else if (day === "wednesday" || day === "thursday") {
  console.log("code");
} else if (day === "friday") {
  console.log("record");
} else if (day === "saturday" || day === "sunday") {
  console.log("enjoy");
} else console.log("invalid");


const age = 23;

// age >= 18 ? console.log("full age") : console.log("underage");

const drink = age >= 18 ? "wine" : "water";
console.log(drink);

let drink2;

if (age > 18) {
  drink2 = "wine";
} else drink2 = "water";

console.log(drink2);

console.log(`I like to drink ${age >= 18 ? "wine" : "water"}`);
*/

const bill = 275;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
);
