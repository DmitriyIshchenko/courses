import { Component } from "./base-components.js";
import { ProjectItem } from "./project-item.js";
import { Project, ProjectStatus } from "../models/project.js";
import { projectState } from "../state/project-state.js";
import { DragTarget } from "../models/drag-drop.js";
import { autobind } from "../decorators/autobind.js";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    // check if drop is allowed
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      // the default for js in not allowing dropping, you have to manually allow it (otherwise the drop event won't trigger)
      event.preventDefault();

      // visually indicate drop area
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    // extract dropped project id from the event
    const projectId = event.dataTransfer!.getData("text/plain");

    // update state
    projectState.moveProject(
      projectId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @autobind
  dragLeaveHandler(event: DragEvent): void {
    // remove drop area styles after drop
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    // listen to drag n drop events
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    // subscribe to state changes
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

  // populate nested tags
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;

    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
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
