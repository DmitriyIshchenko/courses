import { Project, ProjectStatus } from "../models/project.js";

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
    this.updateListeners();
  }

  moveProject(projectId: string, updatedStatus: ProjectStatus) {
    const movedProject = this.projects.find((proj) => projectId === proj.id);
    if (movedProject && movedProject.status !== updatedStatus) {
      movedProject.status = updatedStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    // trigger all listeners
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // pass copy to prevent editing
    }
  }
}

// global instance (singleton)
export const projectState = ProjectState.getInstance();
