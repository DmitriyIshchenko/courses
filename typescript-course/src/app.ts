// factory
function Logger(logString: string) {
  console.log("LOGGER FACTORY"); // runs first
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY"); // runs first
  return function (constructor: any) {
    console.log("rendering template");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

// executes bottom up (applies to decorators, not factories)
@Logger("LOGGING")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("creating person object...");
  }
}
const pers = new Person();

console.log(pers);
