'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // ES6 enhanced obj literals
  openingHours,

  // ES6 new way of writing methods
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivererd to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngrediens) {
    console.log(mainIngredient, otherIngrediens);
  },
};

////////////////////////////////////////////////////
// Practice
///////////////////////////////////////////////////

const getCode = function (str) {
  return str.slice(0, 3).toUpperCase();
};

for (const flight of flights.split('+')) {
  let [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(from)} (${time.replace(
    ':',
    'h'
  )})`.padStart(44);
  console.log(output);
}

/*
////////////////////////////////////////////////////
// Challenge 4
///////////////////////////////////////////////////

// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const names = document.querySelector('textarea').value.split('\n');
  const longest = Math.max(...names.map(item => item.length));
  for (const [index, item] of names.entries()) {
    let [first, second] = item.trim().toLowerCase().split('_');
    const newName = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`.padEnd(longest + 5, ' ');
    console.log(`${newName} ${'✅'.repeat(index + 1)}`);
  }
});

////////////////////////////////////////////////////
// Strings part 3
///////////////////////////////////////////////////
console.log(`a+very+nice+string`.split('+'));
console.log('John Smith'.split(' '));
const [firstName, lastName] = 'John Smith'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const passenger = 'jessica ann smith davis';

const capitalizeName = function (name) {
  const names = name.toLowerCase().split(' ');
  const newName = [];
  for (const item of names) {
    // newName.push(item[0].toUpperCase() + item.slice(1));
    newName.push(item.replace(item[0], item[0].toUpperCase()));
  }
  console.log(newName.join(' '));
};

capitalizeName(passenger);
capitalizeName('john smith');

// Padding a string

const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(30, '+'));
console.log('John'.padStart(25, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const str = number + '';
  return str.slice(-4).padStart(str.length, '*');
};

console.log(maskCreditCard(23124187411215));
console.log(maskCreditCard('23123232'));

// Repeat

const message2 = 'Bad weather... All Departues Delayed... ';
console.log(message2.repeat(5));

const plainsInLine = function (n) {
  console.log(`There are ${n} plains in line ${'✈️'.repeat(n)}`);
};

plainsInLine(10);

////////////////////////////////////////////////////
// Strings part 2
///////////////////////////////////////////////////

const airLine = 'TAP Air Portugal';
console.log(airLine.toLowerCase());
console.log(airLine.toUpperCase());

// Fix capitalization in name

const passenger = 'jOhN';
const passengerLower = passenger.toLowerCase();
console.log(passenger[0].toUpperCase() + passengerLower.slice(1));

// Comparing email
const email = 'john@example.com';
const loginEmail = '  jOhN@ExamPle.com \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing

const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replaceAll(/door/g, 'gate'));

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));

console.log(plane.startsWith('Air'));
console.log(plane.startsWith('Aib'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the new Airbus family');
}

// Exercise

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('YOu are NOT allowed on board');
  } else console.log('Welcome aboard!');
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

////////////////////////////////////////////////////
// Strings part 1
///////////////////////////////////////////////////
const airLine = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]); // A
console.log(plane[1]); // 3
console.log(plane[2]); // 2
console.log('B737'[0]); // B

console.log(plane.length); // 4
console.log('B737'.length); // 4

console.log(airLine.indexOf('r')); // 6
console.log(airLine.lastIndexOf('r')); // 10
console.log(airLine.indexOf('Portugal')); // 8

// console.log(airLine.slice(4));
// console.log(airLine.slice(4, 7));

console.log(airLine.slice(0, airLine.indexOf(' '))); // TAP
console.log(airLine.slice(airLine.lastIndexOf(' ') + 1)); // Portugal

console.log(airLine.slice(-2)); // al
console.log(airLine.slice(1, -1)); // AP Air Portuga

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log(`middle seat :( `);
  } else console.log('lucky!');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');


////////////////////////////////////////////////////
// Challenge 3
///////////////////////////////////////////////////
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = [...new Set(gameEvents.values())];
console.log(events);
gameEvents.delete(64);
console.log(gameEvents);

console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
for (const [minute, event] of gameEvents) {
  const half = minute <= 45 ? 'FIRST' : 'LAST';
  console.log(`[${half} HALF] ${minute}: ${event}`);
}

////////////////////////////////////////////////////
// Maps: iteration
///////////////////////////////////////////////////

const question = new Map([
  ['question', 'what is the best programming lasnguage in the word?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again!'],
]);
console.log(question);

// Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app

console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}
// const answer = +prompt('Your answer:');
const answer = 3;
console.log(question.get('correct'));
console.log(question.get(answer === question.get('correct')));

// Conver Map to array

console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);


////////////////////////////////////////////////////
// Maps: fundamentals
///////////////////////////////////////////////////

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are close');

// console.log(rest.get('name'));
// console.log(rest.get(true));
// console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
console.log(rest.has('categories'));
// rest.clear();
rest.delete(2);

const arr = [1, 2];
rest.set(arr, 'test');
rest.set(document.querySelector('h1'), 'heading');
console.log(rest);

// console.log(rest.get([1, 2])); // doesn't work, different arrays in heap
console.log(rest.get(arr));
console.log(rest);

////////////////////////////////////////////////////
// Sets
///////////////////////////////////////////////////

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

console.log(new Set('john'));

console.log(ordersSet.size);

console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));

ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// Example

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(new Set(staff).size);

console.log(new Set('john').size);


////////////////////////////////////////////////////
// Challenge 2
///////////////////////////////////////////////////
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${player}`);
}

let sum = 0;
for (const odd of Object.values(game.odds)) {
  sum += odd;
}
const averageOdd = sum / Object.entries(game.odds).length;
console.log(averageOdd);

for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

const scorers = {};
for (const player of game.scored) {
  scorers[player] = scorers?.[player] ? scorers[player] + 1 : 1;
}
console.log(scorers);

////////////////////////////////////////////////////
// Looping objects
///////////////////////////////////////////////////

// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}
console.log(openStr);

//Property values
const values = Object.values(openingHours);
console.log(values);

// Entries
const entries = Object.entries(openingHours);
// console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

////////////////////////////////////////////////////
// Optional chaining
///////////////////////////////////////////////////

// if(restaurant.openingHours.mon) console.log();
// console.log(restaurant.openingHours.mon.open);

// WITH optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day} we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? "Medthod doesn't exist");
console.log(restaurant.orderRisotto?.(0, 1) ?? "Medthod doesn't exist");

// Arrays
const users = [
  {
    name: 'john',
    email: 'john@example.com',
  },
];

console.log(users[0]?.name ?? 'User array is empty');

////////////////////////////////////////////////////
// For...of loop
///////////////////////////////////////////////////

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// for (let item of menu) console.log(item);

for (let [index, item] of menu.entries()) {
  console.log(`${index + 1}: ${item}`);
}

// console.log([...menu.entries()]);


////////////////////////////////////////////////////
// Challenge 1
////////////////////////////////////////////////////
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
const { team1, x: draw, team2 } = game.odds;

const printGoals = function (...playerNames) {
  for (let i = 0; i < playerNames.length; i++) {
    console.log(playerNames[i]);
  }
  console.log(`Goals: ${playerNames.length}`);
};

console.log((team1 < team2 && game.team1) || (team1 > team2 && game.team2));
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);


////////////////////////////////////////////////////
// Logical assignment
////////////////////////////////////////////////////
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR assingment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

//nullish assignment operator
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// console.log(rest1);
// console.log(rest2);

// AND assignment
// rest1.owner = rest1.owner && '<ANONIMOUS>';
// rest2.owner = rest2.owner && '<ANONIMOUS>';

rest1.owner &&= '<ANONIMOUS>';
rest2.owner &&= '<ANONIMOUS>';
console.log(rest1);
console.log(rest2);


////////////////////////////////////////////////////
// Nullish coalescing operator
////////////////////////////////////////////////////
restaurant.guestsNum = 0;

const guests = restaurant.guestsNum || 10;
console.log(guests);

const guestsCorrect = restaurant.guestsNum ?? 10; // Nullish coalescing operator
console.log(guestsCorrect);


////////////////////////////////////////////////////
// Short-circuiting
////////////////////////////////////////////////////

console.log('------------- OR -------------');
// Use any data type, return any data type, short-circuiting
console.log(3 || 'john');
console.log('' || 'john');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.guestsNum = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.guestsNum || 10;
console.log(guests2);

console.log('------------- AND -------------');

console.log(0 && 'john');
console.log(7 && 'john');

console.log('hello' && 23 && null && 'john');

// Example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('cheese', 'mushrooms');


////////////////////////////////////////////////////
// Rest operator
////////////////////////////////////////////////////

// 1.Destructuring

const arr = [1, 2, ...[3, 4]]; // Spread (on right side)

const [a, b, ...others] = [1, 2, 3, 4, 5]; // Rest (on left side)
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

//Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2.Functions

const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives');
restaurant.orderPizza('mushrooms');


////////////////////////////////////////////////////
// Spread operator
////////////////////////////////////////////////////

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// Iterables: arrays, strings, maps, sets. NOT objects
const str = 'john';
const letters = [...str, ' ', 'S.'];
console.log(letters);

// Example
// const ingredients = [prompt(), prompt(), prompt()];
// restaurant.orderPasta(...ingredients);

//Objects
const newRestaurant = { ...restaurant, founder: 'John', year: 1992 };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'sdfdsfsf';
console.log(restaurantCopy);


////////////////////////////////////////////////////
// Destructuring objects
////////////////////////////////////////////////////
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});
restaurant.orderDelivery({
  address: 'Via del sole, 21',
  starterIndex: 1,
});

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//Mutating variables

let a = 11;
let b = 22;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj); // wrap
console.log(a, b);

// nested objects

const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);


////////////////////////////////////////////////////
// Destructuring arrays
////////////////////////////////////////////////////

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Switching variables
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

// Recieve 2 return values from a function
const [starterCourse, mainCourse] = restaurant.order(2, 0);
console.log(starterCourse, mainCourse);

// Nested destructuring
const nested = [2, 3, [5, 6]];
// const [i, , j] = nested;
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);*/
