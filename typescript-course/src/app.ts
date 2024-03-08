import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

const projInput = new ProjectInput();
const activeProjList = new ProjectList("active");
const finishedProjList = new ProjectList("finished");
