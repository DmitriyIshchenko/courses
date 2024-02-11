interface Greetable {
  readonly name: string;
  greet(phrase: string): void;
}

class Person implements Greetable {
  age = 30;
  constructor(public name: string) {}

  greet(phrase: string): void {
    console.log(phrase + " " + this.name);
  }
}

let user1: Greetable;

user1 = new Person("Max");

user1.greet("Hello");
console.log(user1);
