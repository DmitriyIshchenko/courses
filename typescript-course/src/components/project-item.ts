import { Component } from "./base-components.js";
import { Project } from "../models/project.js";
import { Draggable } from "../models/drag-drop.js";
import { autobind } from "../decorators/autobind.js";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  // use getter to transform data when we retrieve it
  get peopleAssigned() {
    return `${this.project.people} ${
      this.project.people === 1 ? "person" : "people"
    } assigned`;
  }

  constructor(hostId: string, private project: Project) {
    super("single-project", hostId, false, project.id);

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    // special prop for drag events - attaches data to the drag event
    event.dataTransfer!.setData("text/plain", this.project.id);

    // specifies the drag operation and controls how the cursor will look like
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_: DragEvent): void {}

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.peopleAssigned;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
