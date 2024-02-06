class Department {
  private employees: string[] = [];

  // shorthand
  constructor(private id: string, private name: string) {}

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeesInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("a1", "Accounting");
accounting.addEmployee("john");
accounting.addEmployee("john");
// accounting.employees.push("anna"); // BAD idea, make private

accounting.describe();
accounting.printEmployeesInfo();

// const accountingCopy = { name: "as", describe: accounting.describe };
// accountingCopy.describe(); // this (accountingCopy) needs to have the exact same structure as instance of Department in order to pass ts checks
