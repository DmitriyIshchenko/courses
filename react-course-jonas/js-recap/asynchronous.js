// fetch() and json() return a promise
// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// async functions always return a promise
async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  console.log(data);

  return data; // promise
}

const todos = getTodos();
console.log(todos);

getTodos();

// executes immediately
console.log("some string");
