////////////////////////////
// AUTOBIND DECORATOR
////////////////////////////

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjustedDescriptor;
}

////////////////////////////
// FORM
////////////////////////////
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // get template
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    // get app div
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // get template content (form itself)
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    // get form fields
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();

    // render form
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }

  // use tuple
  private getUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    // validate input

    //  simple validation
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPeople.trim().length === 0
    ) {
      // TODO: implement error handling
      alert("Invalid input");
      return;
    } else return [enteredTitle, enteredDescription, +enteredPeople];
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitHandler(e: Event) {
    e.preventDefault();

    const userInput = this.getUserInput();
    // check if tuple (there is no tuples in js)
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;

      console.log(title, description, people);
      this.clearInputs();
    }
  }

  private configure() {
    // regular js way of binding
    // this.element.addEventListener("submit", this.submitHandler.bind(this));

    // with autobind decorator the handler is already bound
    this.element.addEventListener("submit", this.submitHandler);
  }
}

const projInput = new ProjectInput();
