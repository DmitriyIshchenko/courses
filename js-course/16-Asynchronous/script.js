'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `        
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// helper function

const getJSON = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    // manually throwing error
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

// ANCHOR - XMLHttpRequest

/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  // Old school way
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send(); // done in background

  request.addEventListener('load', function () {
    // destructuring
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // render country 1
    renderCountry(data);

    // Get neighbour country
    const [neighbour] = data.borders;

    // no neighbours
    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('usa');
getCountryAndNeighbour('russia');
*/

// NOTE - callback hell example (triangular structure)
/* 
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
        setTimeout(() => {
          console.log('5 second passed');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

//ANCHOR - Promises

/* const getCountryData = function (country) {
  // build promise
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    // consume promise
    .then(function (response) {
      console.log(response);
      return response.json(); // json() method also returns a promise
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
}; */

// cleaner and updated version
/*
  const getCountryData = function (country) {
  // country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      response => {
        console.log(response);

        // manually throwing error
        if (!response.ok) {
          throw new Error(`Country not found! (${response.status})`);
        }
        return response.json();
      }
      // err => alert(err) // error catching
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;

      // country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found! (${response.status})`);
      }
      return response.json();
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    // error handling
    .catch(err => {
      console.error(`ERROR!!!`);
      renderError(`Something went wrong: ${err.message}. Try again!`);
    })
    // is going to be called always (e.g. hiding loading spinners)
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/

// with wrapper
const getCountryData = function (country) {
  // country 1
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found!'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0]?.borders?.[0]; // optional chaining - undefined if doesn't exist
      if (!neighbour) throw new Error('No neighbour found!');

      // country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found!'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    // error handling
    .catch(err => {
      console.error(`ERROR!!!`);
      renderError(`Something went wrong: ${err.message} Try again!`);
    })
    // is going to be called always (e.g. hiding loading spinners)
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', () => getCountryData('ukraine'));
// btn.addEventListener('click', () => getCountryData('australia'));

//ANCHOR - CHALLENGE 1

/*
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Requesting to fast! (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) throw new Error('Country not found!');
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`ERROR!!! ${err.message}`);
      // renderError(`Something went wrong: ${err.message} Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};


btn.addEventListener('click', () => whereAmI(52.508, 13.381));
// btn.addEventListener('click', () => whereAmI(19.037, 72.873));
// btn.addEventListener('click', () => whereAmI(-33.933, 18.474));
*/

/*
 // NOTE Microtasks priority example

Output:
Test start
Test end
Resolved promise 1
Resolved promise 2
0 sec timer
 */

/*
// sync log (first - top level code)
console.log('Test start');
// instant timer (fifth - regular callback will be executed last), it will be delayed by heavy task and will not be executed after 0 seconds
setTimeout(() => {
  console.log(`0 sec timer`);
}, 0);
// Promise that resolves immediately (third - microtask priority)
Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise with heavy task, still resolves immediately (forth - microtask priority)
Promise.resolve('Resolved promise 2').then(res => {
  // simulate heavy task
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
// another sync log (second - top level code)
console.log('Test end');
*/

//ANCHOR PROMISES FROM SCRATCH

/* Promise constructor takes exactly 1 argument - executor function which will be automatically executed as soon as promise constructor runs. 
It should eventually produce a result value that is gonna be the future value of the promise.
 */

/*
// building promise - promisifying
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening...');
  setTimeout(function () {
    // fulfilled promise
    if (Math.random() >= 0.5) {
      // calling resolve() will mark promise as a fulfilled
      // passed value will be available in the then() handler
      resolve('You win!');
    } else {
      // pass the error message that will be available in the catch() handler
      reject(new Error('You lost your money!'));
    }
  }, 2000);
});

//consuming promise
lotteryPromise
  .then(res => console.log(res))
  .catch(err => console.error(err.message));
*/

/*
// NOTE promisifying setTimeout function by returning a promise
const wait = function (seconds) {
  // impossible for timer to fail, so we don't need to specify the reject() function
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
*/

/** 
// build promise using arrow functions
const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

// consume promises and create a chain of asynchronous behavior
wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for another second'));

//* CALLBACK HELL
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);


//NOTE Escaping from callback hell by chaining promises

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 seconds passed');
    return wait(1);
  });

//* Resolve/reject immediately
Promise.resolve('Resolved :)').then(res => console.log(res));
Promise.reject(new Error('Rejected :(')).catch(err => console.error(err));
*/

//NOTE Promisifying geolocation API
/** 
// build promise
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(new Error('Something went wrong!'))
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// consume promise
// getPosition().then(pos => console.log(pos));

// update function from challenge 1
const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Requesting to fast! (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) throw new Error('Country not found!');
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`ERROR!!! ${err.message}`);
      // renderError(`Something went wrong: ${err.message} Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', whereAmI);
*/

/*
// ANCHOR CHALLENGE 2

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');
let image;
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    image = document.createElement('img');
    image.src = imgPath;
    image.addEventListener('load', function () {
      imgContainer.appendChild(image);
      resolve(image);
    });
    image.addEventListener('error', () =>
      reject(new Error('Something went wrong!'))
    );
  });
};

createImage('img/img-1.jpg')
  .then(() => wait(2))
  .then(() => {
    image.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(() => wait(2))
  .then(() => (image.style.display = 'none'))
  .catch(err => console.error(err.message));
 */

// ANCHOR CONSUMING PROMISES WITH ASYNC/AWAIT

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// automatically returns a promise
const whereAmI = async function () {
  try {
    // Geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data!');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Country not found!');
    const [data] = await res.json();
    renderCountry(data);

    // this string will become the fulfilled value of the promise returned by the async function
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    // errors handling
    console.error(`${err.message}`);
    renderError(`${err.message}`);

    // async function return fulfilled promise even if there is an error, so we need to rethrow it
    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');
// const city = whereAmI(); // async code will be executed after top level sync code
// console.log(city);

// NOTE Returning from async function

// returning from the async function (chaining)
// mixing the chaining and async/await syntax -> meh
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

// returning from the async function (IIFE)
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.log(`2: ${err.message}`);
  }
  console.log('3: Finished getting location');
})();

// NOTE Try/catch errors handling
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }


// ANCHOR Running promises in parallel

//ANCHOR - Promise.all
const get3Countries = async function (c1, c2, c3) {
  try {
    //
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    // if 1 promise rejects, whole Promise.all rejects as well
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.error(`${err.message}`);
  }
};

btn.addEventListener('click', () => get3Countries('usa', 'canada', 'mexico'));
*/

//* Promise combinators: race, allSettled, any

/*
//ANCHOR -  Promise.race
  Receives an array of promises, returns a promise, 
is settled as soon as one of the input promises settles
doesn't matter if the promise got rejected of fulfilled).
First settled(!) promise wins the race.
*/

// (async function () {
//   const [response] = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//     getJSON(`https://restcountries.com/v3.1/name/spain`),
//     getJSON(`https://restcountries.com/v3.1/name/usa`),
//   ]);
//   console.log(response.name.common);
// })();

// const timeout = function (seconds) {
//   return new Promise((_, reject) => {
//     setTimeout(() => {
//       reject(new Error('Request took too long!'));
//     }, seconds * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/tanzania`),
//   timeout(0.15),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

/* 
  //ANCHOR - Promise.allSettled
  Returns an array of all the settled promises. Never short circuits (unlike Promise.all).
*/

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

/*
  //ANCHOR -  Promise.any
  Returns the first fulfilled promise and ignores rejected promises.
*/

// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

//ANCHOR -  CHALLENGE 3

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = imgPath;
    image.addEventListener('load', function () {
      imgContainer.appendChild(image);
      resolve(image);
    });
    image.addEventListener('error', () =>
      reject(new Error('Something went wrong!'))
    );
  });
};

// let currentImage;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => (currentImage.style.display = 'none'))
//   .catch(err => console.error(err.message));

const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err.message);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    let imgs = imgArr.map(async path => await createImage(path));
    imgs = await Promise.all(imgs);
    imgs.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err.message);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
