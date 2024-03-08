// DEFAULT GENERICS

// Array generic
const names: Array<string> = ["John", "Pete"]; // string[]
names[0].split(" "); // ok

// Promise generic

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done");
  }, 2000);
});

promise.then((data) => {
  data.split(""); // ok
  // data.push(1); // Error
  console.log(data);
});
