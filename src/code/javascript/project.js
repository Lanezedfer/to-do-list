import deleteIcon from '../../assets/images/icons/delete-icon.svg';

import { toggleTheme } from './toggle.js';
import { filterByAllTasks, filterByProject } from './filter.js';

export let projects = loadProjects();

function Project(name) {
  this.name = name;
  this.tasks = [];
}

// Project List
const projectsList = document.getElementById('project_list');

export function renderProjectsToSidebar() {
  clearProjectsList();
  
  projects.forEach((project, index) => {
    const listItem = createList(project, index);
    projectsList.appendChild(listItem);
  });

  toggleTheme();
}

function clearProjectsList() {
  projectsList.innerHTML = '';
}

function createList(project, index) {
  const list = document.createElement('li');
  list.textContent = project.name;
  list.addEventListener('click', () => {
    localStorage.setItem('lastFilter', 'project');
    localStorage.setItem('lastProjectIndex', index);
    filterByProject(index);
  });
  list.classList.add('project-list');

  const icon = createIcon(index);
  list.appendChild(icon);

  return list;
}

function createIcon(index) {
  const icon = document.createElement('img');
  icon.src = deleteIcon;
  icon.addEventListener('click', (event) => {
    event.stopPropagation();
    confirmRemoveProject(index);
  });
  icon.classList.add('project-list__icon');
  return icon;
}



// Add Project Form
const form = document.getElementById('add_project_form');

export function renderAddProjectForm() {
  clearAddProjectForm();
  
  const field = createFieldset();
  const input = createNameInput();
  const btnContainer = createBtnContainer();

  btnContainer.appendChild(createAddBtn());
  btnContainer.appendChild(createCancelBtn());

  field.appendChild(input);
  field.appendChild(btnContainer);
  form.appendChild(field);

  input.focus();
}

function clearAddProjectForm() {
  form.innerHTML = '';
}

function createFieldset() {
  const field = document.createElement('fieldset');
  field.classList.add('add-project-form');
  return field;
}

function createNameInput() {
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'project_name_input';
  input.placeholder = 'Project Name';
  input.required = true;
  input.id = 'project_name_input';
  input.classList.add('add-project-form__input');
  return input;
}

function createBtnContainer() {
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('add-project-form__container-btn');
  return btnContainer;
}

function createAddBtn() {
  const addBtn = document.createElement('button');
  addBtn.type = 'submit';
  addBtn.textContent = 'Add';
  addBtn.classList.add('add-project-form__btn-add');
  return addBtn;
}

function createCancelBtn() {
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.addEventListener('click', () => clearAddProjectForm());
  cancelBtn.classList.add('add-project-form__btn-cancel');
  return cancelBtn;
}



// Add and Remove
export function confirmAddProject() {
  const input = document.getElementById('project_name_input').value;

  const projectExists = projects.some(project => project.name === input);
  if (projectExists) {
    alert('Project name already exists. Choose a different name.');
    return;
  }

  addProject(input);
}

function addProject(name) {
  const project = new Project(name);
  projects.push(project);
  saveProjects();
  clearAddProjectForm();
  renderProjectsToSidebar();
}

function confirmRemoveProject(index) {
  const confirmProjectName = confirm(`Tasks under "${projects[index].name}" will also be deleted.`);
  
  if (confirmProjectName) {
    removeProject(index);
  }
}

function removeProject(index) {
  const filterTitle = document.getElementById('filter_title').textContent;

  const process = () => {
    projects.splice(index, 1);
    saveProjects();
    renderProjectsToSidebar();
  }

  if (projects.length === 0 || projects[index].name === filterTitle) {
    process();
    filterByAllTasks();
  } else {
    process();
  }
}



// Local Storage
export function saveProjects() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function loadProjects() {
  const storedProjects = localStorage.getItem('projects');
  if (storedProjects) {
    const parsedProjects = JSON.parse(storedProjects);
    return parsedProjects.map(projectData => {
      const project = new Project(projectData.name);
      project.tasks = projectData.tasks || [];
      return project;
    });
  }
  return [];
}