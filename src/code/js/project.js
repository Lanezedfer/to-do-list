import deleteIcon from "../../assets/images/icons/delete-icon.svg";

import { filterByAllTasks, filterByProject } from "./filter.js";
import { toggleTheme } from "./toggle.js";

export let projects = loadProjects();

function Project(name) {
  this.name = name;
  this.tasks = [];
}

// Projects
const projectsList = document.getElementById("projects");

export function renderProjects() {
  clearProjects();
  projects.forEach((project, index) => {
    const list = createList(project, index);
    projectsList.appendChild(list);
  });
  toggleTheme();
}

function clearProjects() {
  projectsList.innerHTML = "";
}

function createList(project, index) {
  const list = document.createElement("li");
  list.classList.add("project__list");
  list.innerHTML = `
    ${project.name}
    <img
      src="${deleteIcon}"
      alt="Delete ${project.name}"
      class="project__icon"
    />
  `;
  list.addEventListener("click", () => handleListClick(index));
  const icon = list.querySelector(".project__icon");
  icon.addEventListener("click", (event) => handleIconClick(event, index));
  return list;
}

function handleListClick(index) {
  localStorage.setItem("lastFilter", "project");
  localStorage.setItem("lastProjectIndex", index);
  filterByProject(index);
}

function handleIconClick(event, index) {
  event.stopPropagation();
  deleteProject(index);
}

// Project Form
const form = document.getElementById("project_form");

export function renderProjectForm() {
  clearProjectForm();
  form.innerHTML = getProjectFormHTML();
  const cancelBtn = document.getElementById("project_form_cancel");
  cancelBtn.addEventListener("click", clearProjectForm);
}

function getProjectFormHTML() {
  return `
    <fieldset class="project-form">
      <input
        type="text"
        id="project_name"
        name="project_name"
        placeholder="Project Name"
        required
        class="project-form__input"
      />
      <p id="project_error" class="project-form__txt-error"></p>
      <div class="project-form__container-btn">
        <button type="submit" class="project-form__btn-add">Add</button>
        <button
          id="project_form_cancel"
          class="project-form__btn-cancel"
        >Cancel
        </button>
      </div>
    </fieldset>
  `;
}

function clearProjectForm() {
  form.innerHTML = "";
}

export function confirmAddProject() {
  const name = document.getElementById("project_name").value;
  const input = document.getElementById("project_name");
  const error = document.getElementById("project_error");
  if (isProjectExists(name)) {
    showError(input, error, "Project name already exists.");
    return;
  }
  addProject(name);
}

function isProjectExists(name) {
  return projects.some((project) => project.name === name);
}

function showError(input, error, message) {
  input.classList.add("project-form__input--error");
  error.textContent = message;
  setTimeout(() => {
    input.classList.remove("project-form__input--error");
    error.textContent = "";
  }, 3000);
}

function addProject(name) {
  const project = new Project(name);
  projects.push(project);
  saveProjects();
  clearProjectForm();
  renderProjects();
}

function deleteProject(index) {
  const filterTitle = document.getElementById("filter_title").textContent;
  const removeProjectProcess = () => {
    projects.splice(index, 1);
    saveProjects();
    renderProjects();
  };
  if (projects.length === 0 || projects[index].name === filterTitle) {
    removeProjectProcess();
    filterByAllTasks();
  } else {
    removeProjectProcess();
  }
}

// Local Storage
export function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
  const storedProjects = localStorage.getItem("projects");
  if (storedProjects) {
    const parsedProjects = JSON.parse(storedProjects);
    return parsedProjects.map((projectData) => {
      const project = new Project(projectData.name);
      project.tasks = projectData.tasks || [];
      return project;
    });
  }
  return [];
}
