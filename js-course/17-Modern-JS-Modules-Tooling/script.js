// Importing module
// ANCHOR - Named imports
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);
// console.log(shippingCost); // error

console.log('Importing module'); // will be executed after imported module

// NOTE - Import all exports
// import * as ShoppingCart from './shoppingCart.js';

// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// ANCHOR - Default export
// we can give it any name we want
import add from './shoppingCart.js';

// we can mix named and default imports (avoid to reduce complexity)
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// imports are not copies of the exports
import { cart } from './shoppingCart.js';

add('pizza', 2);
add('bread', 5);
add('apples', 4);

// we exported empty array -> live connection, not a copy
console.log(cart); // Array(3)

//ANCHOR - Top-level await (only in modules)
// blocks the execution of the entire module

/*
// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Finished'); // will be executed after fetching

//NOTE Returning data form async function using top-level await
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  // async function always returns promise
  // this object is fulfilled value of promise
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost); // Promise

// regular promise - not very clean
// getLastPost().then(post => console.log(post));

// top-level await
const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

/* 
// ANCHOR - Module pattern
  The goal is to encapsulate functionality to have private data
  and to expose a public API using a functions 
  (IIFE creates scope and returns data just once),
  because they have private data by default and allow to return values)

  It has some limitations: if we wanted 1 module per file, we would have to create different scripts and link all of them in the HTML file (we have to be careful with order of declaration and we would have all of the variables in the global scope). Also, we couldn't bundle them together using a module bundler.
*/

/* 
  This function was executed only once in the beginning,
  but we are able to manipulate the data that is inside the function.
  It works like this because of closures, which allow the function to have access to all the variables that were present at its birthplace.

  E.g. addToCart() have access to the cart variable (we are not using this.cart) and to shippingCost variable which isn't in the returned object.
*/

/*
const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

shoppingCart2.addToCart('apple', 4);
shoppingCart2.addToCart('pizza', 2);
console.log(shoppingCart2);
console.log(shoppingCart.shippingCost); // undefined
*/

//ANCHOR - CommonJS modules
// used in npm packages and node.js

// Export
// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(
//     `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//   );
// };

// Import
// const {addToCart} = require('./shoppingCart.js')

// ANCHOR - deep clone from lodash
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es/cloneDeep';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone); // false in the copy

console.log(stateDeepClone); // true in the copy

// NOTE - Parcel hot module replacement
// State is maintained (e.g. cart array will grow after each reload)

if (module.hot) {
  module.hot.accept();
}

// ANCHOR - E6 features with parcel
class Person {
  #greeting = 'hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${name}`);
  }
}

const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

// babel only transpile syntax, not new features
console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('Test').then(x => console.log(x));

// polifilling new features
import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// polifilling async functions
import 'regenerator-runtime/runtime';
