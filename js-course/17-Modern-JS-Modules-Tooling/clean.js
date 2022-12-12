'use strict';

// arrays are objects
// freezes the first level of the object
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// make immutable
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200; // error

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
// const limit = spendingLimits[user] || 0;
const getLimit = (user, limits) => limits?.[user] ?? 0;

// Pure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  // return new state, instead of changing it
  return value <= getLimit(cleanUser, limits)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// const checkExpenses = function (state, limits) {
//   return state.map(entry =>
//     entry.value < -getLimit(entry.user, limits)
//       ? { ...entry, flag: 'limit' }
//       : entry
//   );
// };

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(entry.user, limits)
      ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2)) // emojis are 2 chars
    .join(' / ');
  // .reduce((str, cur) => `${str} ${cur.description.slice(-2)}`, '');
  console.log(bigExpenses);
};

logBigExpenses(finalBudget, 500);
