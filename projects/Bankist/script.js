'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-07-18T17:01:17.194Z',
    '2022-07-21T23:36:17.929Z',
    '2022-07-23T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUsernames(accounts);

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMovement = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMovement}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Dispaly summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      currentAccount = '';
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
      window.scrollTo(0, 0);
    }

    //Decrese 1 second;
    time--;
  };
  // Set time to 5 minutes
  let time = 120;

  // Call timer every second
  tick();

  const timer = setInterval(tick, 1000);
  return timer;
};

// Event handlers

let currentAccount, timer;
// FAKE LOGIN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    account => account.username == inputLoginUsername.value
  );

  // Create current date
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);

  if (currentAccount?.pin === +inputLoginPin.value) {
    console.log('login');

    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAcc.movements.push(amount);
    recieverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();

  // Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const pin = +inputClosePin.value;
  if (currentAccount.username === username && currentAccount.pin === pin) {
    const index = accounts.findIndex(acc => acc.username === username);
    accounts.splice(index, 1);

    // Log out
    currentAccount = '';
    labelWelcome.textContent = 'Log in to get started';
    containerApp.style.opacity = 0;
    window.scrollTo(0, 0);
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount, sorted);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

console.log(arr.slice());
console.log([...arr]);

// SPLICE
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT

const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));

const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);

console.log(arr.at(-1));
console.log('John'.at(-1));


// FOREACH vs FOR
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [index, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
}
console.log(`----- FOREACH -------`);
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
});


// FOREACH on maps

// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => console.log(`${key}: ${value}`));

const currenciesUnique = new Set([...currencies.keys(), 'EUR', 'EUR']);
currenciesUnique.forEach((value, _, map) => console.log(`${value}: ${value}`));


////////////////////////////////////////
// Challenge 1
////////////////////////////////////////

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2, 2);
  dogsJuliaCorrected.concat(dogsKate).forEach((age, i) => {
    const str =
      age >= 3 ? `an adult, and is ${age} years old` : 'still a puppy';
    console.log(`Dog number ${i + 1} is ${str}`);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('---- DATA 2 ----');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUDS = movements.map(mov => mov * eurToUsd);

console.log(movements, movementsUDS);

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// FILTER
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

const withdrawls = movements.filter(mov => mov < 0);
console.log(withdrawls);
// REDUCE

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balanceFor = 0;
for (const mov of movements) balanceFor += mov;
console.log(balanceFor);

// Maximum value

const maxValue = movements.reduce(
  (acc, curr) => (curr > acc ? curr : acc),
  movements[0]
);
console.log(maxValue);

//////////////////////////////
// Challenge 2

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
// Pipeline
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * 1.1)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);


const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(account => account.owner === 'Jessica Davis');
console.log(account);

for (const account of accounts) {
  if (account.owner === 'Jessica Davis') {
    console.log(account);
    break;
  }
}

// Equality
console.log(movements.includes(-130));
// const anyDeposits = movements.some(mov => mov === -130);

// Condition
const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);



// EVERY

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback

const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.filter(deposit));

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// flat
const total = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
console.log(total);

// flatMap
const total2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
console.log(total2);


// Strings
const owners = ['John', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

console.log(movements);

// return < 0, A, B
// return > 0 B, A

// Ascending
// console.log(
//   movements.sort((a, b) => {
//     if (a > b) {
//       return 1;
//     }
//     if (b > a) return -1;
//   })
// );
console.log(movements.sort((a, b) => a - b));

// Descending
// console.log(
//   movements.sort((a, b) => {
//     if (a > b) {
//       return -1;
//     }
//     if (b > a) return 1;
//   })
//   );
console.log(movements.sort((a, b) => b - a));

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6));

// Empty array + fill method
const x = new Array(7);
console.log(x);
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

arr.fill(23, 4, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const diceRolls = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 6 + 1)
);
console.log(diceRolls);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => +el.textContent.replace('€', '')
  );
  console.log(movementsUI);
});

// Practice

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(bankDepositSum);

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposits1000);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);
console.log(numDeposits1000);

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

const bankDeposits = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => (cur > 0 ? [...acc, cur] : acc), []);
console.log(bankDeposits);

// this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const capitalize = str => str.replace(str[0], str[0].toUpperCase());

  const exceptions = ['an', 'a', 'and', 'the', 'but', 'or', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

////////////////////////////////////
// Challenge 4
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

console.log(dogs);

// 2.
const sarahsGog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah's gos is eating too ${
    sarahsGog.curFood > sarahsGog.recFood ? 'much' : 'little'
  }`
);

// 3.
const { ownersEatTooMuch, ownersEatTooLittle } = dogs.reduce(
  (acc, dog) => {
    acc[
      dog.curFood > dog.recFood ? 'ownersEatTooMuch' : 'ownersEatTooLittle'
    ].push(...dog.owners);
    return acc;
  },
  { ownersEatTooMuch: [], ownersEatTooLittle: [] }
);
console.log(ownersEatTooMuch, ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eats too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eats too little!`);

// 5.

console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.
const isEatingOkay = function (dog) {
  return dog.curFood >= dog.recFood * 0.9 && dog.curFood <= dog.recFood * 1.1;
};

console.log(dogs.some(isEatingOkay));

// 7.
const dogsEatOkay = dogs.filter(isEatingOkay);
console.log(dogsEatOkay);

// 8.
const sortedDogs = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(sortedDogs);


// NUMBERS 

console.log(23 === 23.0);

// Base 10 - 0 to 9; 1/10 = 0.1; 3/10 = 3.3333333333...
// Binary base 2 - 0 1

console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // false

// Conversion
console.log(Number('23'));
console.log(Number(+'23'));

// Parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e30px', 10)); // NaN

console.log(Number.parseInt('2.5rem', 10)); // 2
console.log(Number.parseFloat('2.5rem')); // 2.5

// console.log(parseFloat('2.5rem')); // these functions are global

// check if value is NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN(+'20x')); // true
console.log(Number.isNaN(23 / 0)); //false

// Checking if value is an numbers
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite(+'20px')); // false
console.log(Number.isFinite(20 / 0)); // false

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23.1)); // false


console.log(Math.sqrt(25));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 12, 22, 44));
console.log(Math.max(5, 12, 22, '23'));
console.log(Math.max(5, 12, 22, '23px'));

console.log(Math.min(5, 12, 22, '23'));
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// console.log(Math.trunc(Math.random() * 6)) + 1;

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
console.log(randomInt(5, 10));

// Rounding integers
console.log('---- ROUND ----');
console.log('23.3 ->', Math.round(23.3)); // 23
console.log('23.9 ->', Math.round(23.9)); // 24

console.log('---- CEIL ----');
console.log('23.3 ->', Math.ceil(23.3)); // 24
console.log('23.9 ->', Math.ceil(23.9)); // 24

console.log('---- FLOOR ----');
console.log('23.3 ->', Math.floor(23.3)); // 23
console.log('23.9 ->', Math.floor('23.9')); // 23

console.log('---- TRUNC ----');
console.log('23.3 ->', Math.trunc(23.3)); // 23
console.log('23.9 ->', Math.trunc(23.9)); // 23

console.log('---- TRUNC VS FLOOR ----');
console.log('-23.3 ->', Math.trunc(-23.3)); // -23
console.log('-23.9 ->', Math.floor(-23.9)); // 24

// Rouding decimals
console.log('---- DECIMALS ----');
console.log((2.7).toFixed(0)); // '3' - return string
console.log((2.7).toFixed(3)); // '2.700'
console.log(+(2.345).toFixed(2)); // 2.35
*/

/*
// Remainder operator
console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

console.log(6 % 2); // 0
console.log(7 % 2); // 1

const isEven = n => n % 2 === 0;
console.log(isEven(12));

// Ntn time
labelBalance.addEventListener('click', () => {
  Array.from(document.querySelectorAll('.movements__row')).forEach((row, i) => {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
*/

/*
// Numeric separators

// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee2 = 15_00;
const transferFee1 = 1_500;

// const PI = 3._1415; // illegal
// const PI = _3.1415; // illegal
const PI = 3.14_15;
console.log(PI);

console.log(Number('23_00')); // NaN
console.log(parseInt('23_00')); // 23
*/

/*
// BIGINT

console.log(2 ** 53 - 1); // biggest number js can represent
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);
console.log(2 ** 53 + 5);
console.log(2 ** 53 + 6);

console.log(23756956234573247534809573n); // BIGINT
console.log(BigInt(23756956));

// Operations
console.log(10000n + 10000n);
console.log(1000012312312312313123n * 10123123123123123000n);
// console.log(Math.sqrt(100n)); // error

const huge = 123123213123123123213n;
const num = 23;
// console.log(huge * num); // error
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15);
console.log(20n === 20); // false
console.log(typeof 20n);
console.log(20n == 20); // true

console.log(huge + ' is really big!');

// Divisions
console.log(10n / 3n);
console.log(10 / 3);
*/

// DATES

/*
// Create a date
const now = new Date();
console.log(now);

console.log(new Date('Jul 22 2022 15:37:47'));
console.log(new Date('December 23, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 33));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));


// Working with dates

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2142246180000));

console.log(Date.now());

console.log(future.setFullYear(2040));
console.log(future);


const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);
*/

/*
const num = 38823131.22;
const options = {
  style: 'currency',
  currency: 'USD',
  // useGrouping: false,
};

console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('GE: ', new Intl.NumberFormat('de-GE', options).format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  'Browser: ',
  new Intl.NumberFormat(navigator.language, options).format(num)
);
console.log('RU: ', new Intl.NumberFormat('ru-RU', options).format(num));
*/

/*
// setTimeout
const ingrediens = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingrediens
);

console.log('Waiting...');

if (ingrediens.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
// setInterval(function () {
//   const now = new Date();
//   console.log(
//     new Intl.DateTimeFormat(navigator.language, {
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//     }).format(now)
//   );
// }, 1000);
*/
