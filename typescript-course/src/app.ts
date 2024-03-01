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

  // T is supposed to be an constructor function (returns object), hence the new operator
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // (optional) return new constructor function and replace the old one
    // class is a syntactic sugar
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super(); // have to call the original constructor (save the original functionality)

        // EXTRA logic that runs when the class is instantiated
        console.log("rendering template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
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

// ----

// target is prototype of the object (for static property - constructor function)
// typescript will ignore return
function Log(target: any, propertyName: string | Symbol) {
  console.log("property decorator");
  console.log(target, propertyName);
}

// target - prototype (for static accessor - constructor function)
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("accessor decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// target is as before
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);

  // can return new descriptor that will replace the old one
}

// typescript will ignore return
function Log4(
  target: any,
  name: string | Symbol, //name of the method
  position: number
) {
  console.log("parameter decorator");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log // decorators execute at definition
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

function autobind(_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    // run extra logic on access to this property
    get() {
      // this refers to whatever is responsible for triggering the getter -> always refers to the object
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjustedDescriptor;
}

class Printer {
  message = "this works!";

  @autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
// button.addEventListener("click", p.showMessage); // undefined
// button.addEventListener("click", p.showMessage.bind(p)); // default js way
button.addEventListener("click", p.showMessage);
