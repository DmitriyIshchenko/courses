"use strict";

/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true; // typo
if (hasDriversLicense) console.log("I can drive");

//reserved
// const interface = "Audio";
// const private = "df";



function logger() {
  console.log("My name is John");
}

logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges`;
  return juice;
}

const appleJuice = fruitProcessor(3, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);


const age1 = calcAge1(1991);

function calcAge1(birthYear) {
  return 2037 - birthYear;
}

console.log(age1);

const calcAge2 = function (brithYear) {
  return 2037 - brithYear;
};

const age2 = calcAge2(1991);
console.log(age2);


//Arrow function
const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const currentAge = 2037 - birthYear;
  const retirementAge = 65 - currentAge;
  return `${firstName} retires in ${retirementAge} years`;
};

console.log(yearsUntilRetirement(1991, "John"));
console.log(yearsUntilRetirement(1980, "Bob"));


function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePices = cutFruitPieces(oranges);
  const juice = `Juice with ${applePieces} peaces of apple and ${orangePices} pieces of orange`;
  return juice;
}

console.log(fruitProcessor(2, 3));


const calcAge = function (birthYear) {
  return 2037 - birthYear;
};

const calcRetirement = function (age) {
  return 65 - age;
};

const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired`);
    return -1;
  }
};

console.log(yearsUntilRetirement(1991, "John"));
console.log(yearsUntilRetirement(1950, "Mike"));


///////////////////////////////////////////////////
//Challenge 1
//////////////////////////////////////////////////

const calcAverage = (first, second, third) => (first + second + third) / 3;

const avgDolphins1 = calcAverage(44, 23, 71);
const avgKoalas1 = calcAverage(65, 54, 49);

const avgDolphins2 = calcAverage(85, 54, 41);
const avgKoalas2 = calcAverage(23, 34, 27);

const checkWinner = function (avgDolphins, avgKoalas) {
  if (avgDolphins >= avgKoalas * 2) {
    console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= avgDolphins * 2) {
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
  } else console.log("No team wins");
};

checkWinner(avgDolphins1, avgKoalas1);
checkWinner(avgDolphins2, avgKoalas2);

const friend1 = "mike";
const friend2 = "peter";
const friend3 = "steve";

const friends = ["mike", "peter", "steve"];
console.log(friends);

// const years = new Array(1991, 2020, 1821);
// console.log(years);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends[friends.length - 1]);

friends[2] = "bob";
console.log(friends);

// friends = [1,2,3]; illegal

const person = ["john", "smith", 2037 - 1991, "teacher", friends];
console.log(person);

// Exercise

const calcAge = function (birthYear) {
  return 2037 - birthYear;
};

const years = [1990, 1957, 2010, 2018];

// console.log(calcAge(years)); //NaN

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [
  calcAge(years[0]),
  calcAge(years[1]),
  calcAge(years[years.length - 1]),
];
console.log(ages);


const friends = ["mike", "peter", "steve"];

// Add
const newLength = friends.push("john");
console.log(friends, newLength);

friends.unshift("frank");
console.log(friends);

//remove
friends.pop();
const popped = friends.pop();
console.log(friends, popped);

friends.shift();
console.log(friends);

console.log(friends.indexOf("peter"));
console.log(friends.indexOf("bob"));

console.log(friends.includes("mike"));

friends.push(23);
console.log(friends.includes("23")); //strict equality

if (friends.includes("mike")) console.log("you have a friend called mike");



///////////////////////////////////
// Challenge 2
///////////////////////////////////
const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills, tips, total);



const person = {
  firstName: "John",
  lastName: "Smith",
  age: 2037 - 1991,
  job: "teacher",
  friends: ["mike", "peter", "steve"],
};

console.log(person);

console.log(person.lastName);
console.log(person["lastName"]);

const nameKey = "Name";
console.log(person["first" + nameKey]);
console.log(person["last" + nameKey]);

// console.log(person.'last' + nameKey);

person.location = "Portugal";
person["twitter"] = "@person_twitter";

// const interestedIn = prompt("what do you want to know about person?");
// if (person[interestedIn]) {
//   console.log(person[interestedIn]);
// } else console.log("Wrong request");

///////////////////////
// Challenge
///////////////////////

console.log(
  `${person.firstName} has ${person.friends.length} friends, and his best friend is calles ${person.friends[0]}`
);



const person = {
  firstName: "John",
  lastName: "Smith",
  birthYear: 1991,
  job: "teacher",
  friends: ["mike", "peter", "steve"],
  hasDriversLicense: true,

  // calcAge: function () {
  //   // console.log(this);
  //   return 2037 - this.birthYear;
  // },
  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${
      this.job
    }, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
  },
};

console.log(person.calcAge());

console.log(person.age);
console.log(person.age);
console.log(person.age);

// /////////////////////////////////////////
// Challenge
// /////////////////////////////////////////

console.log(person.getSummary());

//////////////////////////////////////////////
// Challenge 3
//////////////////////////////////////////////

const mark = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const john = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

if (mark.calcBMI() > john.calcBMI()) {
  console.log(
    `${mark.fullName}'s BMI (${mark.BMI}) is higher than ${john.fullName}'s BMI (${john.BMI})`
  );
} else {
  console.log(
    `${john.fullName}'s BMI (${john.BMI}) is higher than ${mark.fullName}'s BMI (${mark.BMI})`
  );
}



console.log("lifting weights repetition 1");
console.log("lifting weights repetition 2");
console.log("lifting weights repetition 3");

for (let rep = 0; rep <= 10; rep++) {
  console.log(`lifting weights repetition ${rep}`);
}



const person = [
  "john",
  "smith",
  2037 - 1991,
  "teacher",
  ["mike", "pete", "steve"],
];

const types = [];
for (let i = 0; i < person.length; i++) {
  //Reading
  console.log(person[i], typeof person[i]);

  //Filling
  // types[i] = typeof person[i];
  types.push(typeof person[i]);
}
console.log(types);

const years = [1991, 2007, 1969, 2022];
const ages = [];
for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}
console.log(ages);

// continue adn break

for (let i = 0; i < person.length; i++) {
  if (typeof person[i] !== "string") continue;
  console.log(person[i], typeof person[i]);
}

for (let i = 0; i < person.length; i++) {
  if (typeof person[i] === "number") break;
  console.log(person[i], typeof person[i]);
}



const person = [
  "john",
  "smith",
  2037 - 1991,
  "teacher",
  ["mike", "pete", "steve"],
];

for (let i = person.length - 1; i >= 0; i--) {
  console.log(i, person[i]);
}

for (let exercise = 1; exercise <= 3; exercise++) {
  console.log(`-------------- Stating exercise ${exercise}`);
  for (let rep = 1; rep <= 5; rep++) {
    console.log(`Repetition ${rep} `);
  }
}


// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`lifting weights repetition ${rep}`);
// }

// console.log("----------------------");
// let rep = 1;
// while (rep <= 10) {
//   console.log(`lifting weights repetition ${rep}`);
//   rep++;
// }

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log("loop is about to end");
}
*/

const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
  const tip = calcTip(bills[i]);
  tips.push(tip);
  totals.push(bills[i] + tip);
}

console.log(tips, totals);

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};

console.log(calcAverage(totals));
