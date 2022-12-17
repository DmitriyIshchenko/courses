import { TIMEOUT_SEC } from './config';

// returns a promise that will be rejected after certain number of seconds
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const wait = async sec =>
  new Promise(resolve => setTimeout(resolve, sec * 1000));

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    };
    const fetchPromise = uploadData ? fetch(url, options) : fetch(url);
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // data is the resolved value of promise that getJSON() returns
    return data;
  } catch (err) {
    // re-throw error, because otherwise fulfilled promise will be returned
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    // will throw error if the fetch doesn't settle within the specified time
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // data is the resolved value of promise that getJSON() returns
    return data;
  } catch (err) {
    // re-throw error, because otherwise fulfilled promise will be returned
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    // will throw error if the fetch doesn't settle within the specified time
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    };

    const res = await Promise.race([fetch(url, options), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // data is the resolved value of promise that getJSON() returns
    return data;
  } catch (err) {
    // re-throw error, because otherwise fulfilled promise will be returned
    throw err;
  }
};
*/
