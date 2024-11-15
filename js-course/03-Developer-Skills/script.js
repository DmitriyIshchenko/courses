// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

const getAmplitude = function (arr) {
  let min = arr[0];
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    const currTemp = arr[i];
    if (typeof currTemp !== 'number') continue;
    if (currTemp < min) min = currTemp;
    if (currTemp > max) max = currTemp;
  }
  return max - min;
};

console.log(getAmplitude(temperatures));

const getAmplitudeNew = function (arr1, arr2) {
  const arr = arr1.concat(arr2);
  let min = arr[0];
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    const currTemp = arr[i];
    if (typeof currTemp !== 'number') continue;
    if (currTemp < min) min = currTemp;
    if (currTemp > max) max = currTemp;
  }
  return max - min;
};

console.log(getAmplitudeNew([12, 3, 4, 5], [55, 231, 12, 4]));


const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'cels',
    value: prompt('Degrees: '),
  };

  // 2. Find
  console.table(measurement);

  // 3. Fix
  const kelvin = +measurement.value + 273;
  return kelvin;
};

// 1. Identify
console.log(measureKelvin());
*/

//////////////////////////////////////////
// Challenge 1
//////////////////////////////////////////

const printForecast = function (temps) {
  let res = '...';
  for (let i = 0; i < temps.length; i++) {
    res += ` ${temps[i]}C in ${i + 1} days ...`;
  }
  console.log(res);
};

printForecast([17, 21, 23]);
printForecast([12, 5, -5, 0, 4]);
