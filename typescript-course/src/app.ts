class Department {
  static fiscalYear = 2001;
  protected employees: string[] = [];

  // shorthand
  constructor(private readonly id: string, private name: string) {}

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
    // console.log(this.fiscalYear) // Error
    console.log(Department.fiscalYear);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeesInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }

  static createEmployee(name: string) {
    return { name };
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
  private lastReport: string;

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");

    this.lastReport = reports[0];
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }

    throw Error("No report found");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value");
    }
    this.addReport(value);
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const steven = Department.createEmployee("Steven"); // static method
const year = Department.fiscalYear; // static field
console.log(steven, year);

const IT = new ITDepartment("i1", ["Max"]);
console.log(IT);
IT.describe();

const accounting = new AccountingDepartment("a1", []);
accounting.addEmployee("john");
accounting.addEmployee("Max");

accounting.mostRecentReport = "report1"; // setter
// accounting.employees.push("anna"); // BAD idea, make private
accounting.addReport("report2");
console.log(accounting.mostRecentReport); // getter
accounting.printReports();

accounting.describe();
accounting.printEmployeesInfo();

// const accountingCopy = { name: "as", describe: accounting.describe };
// accountingCopy.describe(); // this (accountingCopy) needs to have the exact same structure as instance of Department in order to pass ts checks
