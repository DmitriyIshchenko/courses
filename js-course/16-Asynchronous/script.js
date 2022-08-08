'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src=${data.flags.png} />
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
          Object.values(data.currencies)[0]['name']
        }</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);

    return response.json();
  });
};
///////////////////////////////////////

/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
    <img class="country__img" src=${data.flags.png} />
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
          Object.values(data.currencies)[0]['name']
        }</p>
    </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('USA');
getCountryData('ukraine');
*/

/*
// Callback hell
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    // Render country 1
    renderCountry(data);

    // Get neighbour country
    const [neighbour] = data.borders;

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

// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa');

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

// const getCountryAndNeighbour = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'fsdfsf';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
// .then(response => {
//   if (!response.ok)
//     throw new Error(`Country not found (${response.status})`);
//   response.json();
// })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(err);
//       renderError(`Something went wrong: ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryAndNeighbour = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      if (!data[0].borders) throw new Error('No neighbour found');
      const neighbour = data[0].borders[0];

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong: ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryAndNeighbour('usa');
// });

// getCountryAndNeighbour('udsfsgsg');

/*
//////////////////////////////////////////////////
// Challenge 1
const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=258334198015983163719x64028`
  )
    .then(response => {
      if (!response.ok) throw new Error('Reload too fast!');

      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/alpha/${data.prov}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(err))
    .finally(() => (countriesContainer.style.opacity = 1));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);


// Figure out the order of logs
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test end');


// Building promises

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening!');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You won!');
    } else {
      reject(new Error('You lost'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout

// const wait = function (seconds) {
//   return new Promise(resolve => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };



wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 second passed');
    return wait(1);
  });

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));


const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function (lat, lng) {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=258334198015983163719x64028`
      );
    })
    .then(response => {
      if (!response.ok) throw new Error('Reload too fast!');

      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/alpha/${data.prov}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(err))
    .finally(() => (countriesContainer.style.opacity = 1));
};

// btn.addEventListener('click', whereAmI);


/////////////////////////////////////////////////
// Challenge 2

const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = imgPath;
    image.addEventListener('load', function () {
      document.querySelector('.images').append(image);
      resolve(image);
    });
    image.addEventListener('error', () =>
      reject(new Error('Loading has failed.'))
    );
  });
};

let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));


// ASYNC AWAIT

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// fetch(`https://restcountries.com/v3.1/name/${country}`).then(res=>console.log(res))

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //Reverse geocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=258334198015983163719x64028`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Get country data
    const resCounty = await fetch(
      `https://restcountries.com/v3.1/alpha/${dataGeo.prov}`
    );
    if (!resCounty.ok) throw new Error('Problem getting country data');
    const data = await resCounty.json();

    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong: ${err.message} `);

    // Reject promise returned from async function
    throw err;
  }
};
console.log('1: Will get location');
// const city = whereAmI()
// console.log(city);

// RETURNING DATA FROM ASYNC FUNCTION

// Promise chaining way
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: Problem: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

// Async/await way
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: Problem: ${err.message}`);
  }
  console.log('3: Finished getting location');
})();

// TRY CATCH
// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }


// RUNNING PROMISES IN PARALLEL

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');


// PROMISE COMBINATORS

// Promise.race - return first settled promise (short circuits if error)
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => reject(new Error('Request took too long')), sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled - like Promise.all, but never short circuits

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

// Error
// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res)).catch(err => console.error(err));;

// Promise.any [ES2021] - return first fullfilled promise

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));
*/
////////////////////////////////////////////////////
// Challenge 3

const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = imgPath;
    image.addEventListener('load', function () {
      document.querySelector('.images').append(image);
      resolve(image);
    });
    image.addEventListener('error', () =>
      reject(new Error('Loading has failed.'))
    );
  });
};

const loadNPause = async function () {
  try {
    let currentImg = await createImage('img/img-1.jpg');
    await wait(2);
    currentImg.style.display = 'none';

    currentImg = await createImage('img/img-2.jpg');
    await wait(2);
    currentImg.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    let imgs = imgArr.map(async path => await createImage(path));
    const imgsElems = await Promise.all(imgs);
    imgsElems.forEach(el => el.classList.add('parallel'));
  } catch (err) {
    console.error(`Problem: ${err.message}`);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
