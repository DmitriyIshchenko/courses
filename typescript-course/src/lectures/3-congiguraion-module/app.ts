export {};
const button = document.querySelector("button");

// always needs to return
function add(a: number, b: number) {
  if (a + b > 0) {
    return a + b;
  }

  return;
}

add(1, 2);

function clickHandler(message: string) {
  console.log("Clicked" + message);
}

// runtime check
if (button) {
  button.addEventListener("click", clickHandler.bind(null, "hello"));
}
