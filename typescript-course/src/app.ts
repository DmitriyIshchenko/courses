class Department {
  protected employees: string[] = [];

  // shorthand
  constructor(private readonly id: string, private name: string) {}

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

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports);
  }
}

const IT = new ITDepartment("i1", ["Max"]);
console.log(IT);
IT.describe();

const accounting = new AccountingDepartment("a1", ["report1"]);
accounting.addEmployee("john");
accounting.addEmployee("Max");
// accounting.employees.push("anna"); // BAD idea, make private
accounting.addReport("report2");
accounting.printReports();

accounting.describe();
accounting.printEmployeesInfo();

// const accountingCopy = { name: "as", describe: accounting.describe };
// accountingCopy.describe(); // this (accountingCopy) needs to have the exact same structure as instance of Department in order to pass ts checks
