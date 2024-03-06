////////////////////////////
// PROJECT TYPE
////////////////////////////
enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

////////////////////////////
// PROJECT STATE MANAGEMENT
////////////////////////////

// generic type (we don't know listener returns)
type Listener<T> = (items: T[]) => void;

class State<T> {
  // subscriber pattern
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private constructor() {
    super();
  }

  // ensure that there is only one instance
  private static instance: ProjectState;
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProject);
    // trigger all listeners
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // pass copy to prevent editing
    }
  }
}

// global instance (singleton)
const projectState = ProjectState.getInstance();

////////////////////////////
// VALIDATION
////////////////////////////

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable): boolean {
  let isValid = true;

  if (validatableInput.required) {
    // convert to string to use trim on numbers (ts error workaround)
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  // don't care about numbers in this case
  if (
    validatableInput.minLength &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length > validatableInput.minLength;
  }

  if (
    validatableInput.maxLength &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length < validatableInput.maxLength;
  }

  // only for numbers
  if (validatableInput.min && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value > validatableInput.min;
  }

  if (validatableInput.max && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value < validatableInput.max;
  }

  return isValid;
}

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

//////////////////////////////////
// COMPONENT BASE
//////////////////////////////////

// generic class
// abstract class (never instantiate it, only inherit)
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    // select elements
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    // get template content (form itself)
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;

    if (newElementId) this.element.id = newElementId;

    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }

  // abstract methods (force any child class to have these methods)
  abstract configure?(): void;
  abstract renderContent(): void;
}

//////////////////////////////////
// PROJECT LIST
//////////////////////////////////

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  constructor(hostId: string, private project: Project) {
    super("single-project", hostId, false, project.id);

    this.configure();
    this.renderContent();
  }

  configure(): void {}

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent =
      this.project.people.toString();
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  // populate nested tags
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;

    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  configure() {
    // subscribe
    projectState.addListener((projects: Project[]) => {
      // filter project by status
      const relevantProjects = projects.filter((proj) => {
        if (this.type == "active") {
          return proj.status === ProjectStatus.Active;
        }
        return proj.status === ProjectStatus.Finished;
      });

      // override local state with updated data
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    // clear list
    listEl.innerHTML = "";

    // render updated data
    for (const projectItem of this.assignedProjects) {
      new ProjectItem(listEl.id, projectItem);
    }
  }
}

////////////////////////////
// FORM
////////////////////////////
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

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
  }

  configure() {
    // regular js way of binding
    // this.element.addEventListener("submit", this.submitHandler.bind(this));

    // with autobind decorator the handler is already bound
    this.element.addEventListener("submit", this.submitHandler);
  }

  // nested tags are already populated in the html template
  renderContent() {}

  // use tuple
  private getUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    // validate inputs

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
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

      projectState.addProject(title, description, people);

      this.clearInputs();
    }
  }
}

const projInput = new ProjectInput();
const activeProjList = new ProjectList("active");
const finishedProjList = new ProjectList("finished");
