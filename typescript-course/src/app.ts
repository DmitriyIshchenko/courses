// function type alias
// type AddFn = (a: number, b: number) => number;

// function interface
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => n1 + n2;

interface Named {
  readonly name?: string;
  outputName?: string; // optional property
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }

  greet(phrase: string): void {
    if (this.name) {
      console.log(phrase + " " + this.name);
    }
    console.log("Hi");
  }
}

let user1: Greetable;

user1 = new Person();

user1.greet("Hello");
console.log(user1);
