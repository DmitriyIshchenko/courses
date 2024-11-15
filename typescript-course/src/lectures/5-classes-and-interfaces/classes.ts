// can not be instantiated
abstract class Department {
  static fiscalYear = 2001;
  protected employees: string[] = [];

  // shorthand
  constructor(protected readonly id: string, protected name: string) {}

  // enforce that all child classes share this method, with their own implementation
  abstract describe(this: Department): void;

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

  describe(): void {
    console.log(`IT Department - ID : ${this.id}`);
    // console.log(this.fiscalYear) // Error
    console.log(Department.fiscalYear);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  // Singleton pattern(only 1 instance allowed): private constructor + static instance
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");

    this.lastReport = reports[0];
  }

  // check if there is an instance already
  static getInstance(id: string, reports: string[]) {
    // inside static this refers to the class itself
    if (this.instance) {
      return this.instance;
    }

    this.instance = new AccountingDepartment(id, reports);
    return this.instance;
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

  describe() {
    console.log("Accounting department - ID: " + this.id);
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

// const accounting = new AccountingDepartment("a1", []);
const accounting = AccountingDepartment.getInstance("a1", []);
const accounting2 = AccountingDepartment.getInstance("a2", []); // still return the first instance

console.log(accounting, accounting2);
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
