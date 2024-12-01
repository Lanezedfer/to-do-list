import { compareAsc, format, parseISO } from 'date-fns';

import addIcon from '../../assets/images/icons/add-icon.svg';
import deleteIcon from '../../assets/images/icons/delete-icon.svg';

import { projects, saveProjects } from "./project.js";

function Task(project, name, description, dueDate, priority, status) {
  const task = {
    name: name,
    description: description,
    dueDate: dueDate,
    priority: priority,
    status: status
  }

  project.tasks.push(task);
}

const main = document.getElementById('main');
const mainContent = document.getElementById('main_content');
const form = document.getElementById('add_task_form');
const addTaskPrompt = document.getElementById('add_task_prompt');

// Tasks
export function renderTasksToMain(tasks) {
  clearTasks();
  const sortedTasks = sortTasksByDueDate(tasks);
  if (sortedTasks.length > 0) {
    let id = 0;
    sortedTasks.forEach(task => {
      id += 1;
      mainContent.appendChild(createCard(task, id));
      toggleStatus(task, id);
      togglePriority(task, id);
    });
  }
}

export function clearTasks() {
  mainContent.innerHTML = '';
}

function createCard(task, id) {
  const card = document.createElement('div');
  card.classList.add('task');

  card.appendChild(createTop(task, id));
  card.appendChild(createTaskDescriptionTxt(task.description, id));
  card.appendChild(createBottom(task, id));

  return card;
}

function createTop(task, id) {
  const top = document.createElement('div');
  top.classList.add('task__top');
  top.appendChild(createTaskStatusLabel(task, id));
  top.appendChild(createTaskNameTxt(task.name, id));
  top.appendChild(createTaskDueDateTxt(task.dueDate));
  return top;
}

function createTaskNameTxt(name, id) {
  const text = document.createElement('h1');
  text.textContent = name;
  text.classList.add('task__txt-name');
  text.id = `task_${id}_name`;
  return text;
}

function createTaskDescriptionTxt(description, id) {
  const text = document.createElement('p');
  text.textContent = description;
  text.classList.add('task__txt-description');
  text.id = `task_${id}_description`;
  return text;
}

function createTaskDueDateTxt(dueDate) {
  const date = parseISO(dueDate);
  const formattedDate = format(date, 'HH:mm (dd-MM-yyyy)');

  const text = document.createElement('p');
  text.textContent = formattedDate;
  text.classList.add('task__txt-date');
  return text;
}

function createTaskStatusInput(task, id) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.name = `task_${id}_status_toggle`;
  input.classList.add('toggle');
  input.id = `task_${id}_status_toggle`;
  input.addEventListener('change', () => toggleStatus(task, id));

  if (task.status === true) {
    input.checked = true;
  }

  return input;
}

function createTaskStatusLabel(task, id) {
  const label = document.createElement('label');
  label.htmlFor = `task_${id}_status_toggle`;
  label.classList.add('task__label-status');
  label.id = `task_${id}_status_label`;
  label.appendChild(createTaskStatusInput(task, id));
  label.appendChild(createTaskStatusSpan());
  return label;
}

function createTaskStatusSpan() {
  const span = document.createElement('span');
  span.classList.add('task__span-status');
  return span;
}

function createBottom(task, id) {
  const bottom = document.createElement('div');
  bottom.classList.add('task__bottom');
  bottom.appendChild(createPriorityContainer(task, id));
  bottom.appendChild(createDeleteTaskIcon(task, id));
  return bottom;
}

function createTaskPriorityInput(task, id) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.name = `task_${id}_priority_toggle`;
  input.classList.add('toggle');
  input.id = `task_${id}_priority_toggle`;
  input.addEventListener('change', () => togglePriority(task, id));

  if (task.priority === true) {
    input.checked = true;
  }

  return input;
}

function createTaskPriorityLabel(id) {
  const label = document.createElement('label');
  label.htmlFor = `task_${id}_priority_toggle`;
  label.classList.add('task__label-priority');
  return label;
}

function createPriorityContainer(task, id) {
  const div = document.createElement('div');
  div.classList.add('task__container-priority');

  div.appendChild(createTaskPriorityInput(task, id));
  div.appendChild(createTaskPriorityLabel(id));
  return div;
}

function createDeleteTaskIcon(task) {
  const deleteTaskIcon = document.createElement('img');
  deleteTaskIcon.src = deleteIcon;
  deleteTaskIcon.classList.add('task__icon');
  deleteTaskIcon.addEventListener('click', () => confirmDeleteTask(task));
  return deleteTaskIcon;
}



// Add Task Prompt
export function renderAddTaskPrompt() {
  clearAddTaskPrompt();

  addTaskPrompt.textContent = 'Add Task';
  addTaskPrompt.classList.add('add-task-prompt');
  addTaskPrompt.addEventListener('click', renderAddTaskForm);

  const addTaskIcon = document.createElement('img');
  addTaskIcon.src = addIcon;
  addTaskIcon.classList.add('add-task-prompt__icon');
  
  addTaskPrompt.appendChild(addTaskIcon);
  main.appendChild(addTaskPrompt);
}

export function clearAddTaskPrompt() {
  addTaskPrompt.innerHTML = '';
}



// Add Task Form
function renderAddTaskForm() {
  clearAddTaskForm();
  form.classList.add('add-task-form');

  const field = createFieldset();

  field.appendChild(createLeftColumn());
  field.appendChild(createRightColumn());
  field.appendChild(createBtnContainer());

  form.appendChild(field);
  main.appendChild(form);

  inputFocus();
}

export function clearAddTaskForm() {
  form.classList.remove('add-task-form');
  form.innerHTML = '';
}

function createFieldset() {
  const field = document.createElement('fieldset');
  field.classList.add('add-task-form__field');
  return field;
}

function createLeftColumn() {
  const left = document.createElement('div');
  left.classList.add('add-task-form__column-left');
  left.appendChild(createTaskNameContainer());
  left.appendChild(createTaskDateContainer());
  left.appendChild(createAddPriorityContainer());
  return left;
}

function createRightColumn() {
  const right = document.createElement('div');
  right.classList.add('add-task-form__column-right');
  right.appendChild(createTaskDescriptionContainer());
  return right;
}

function createTaskNameInput() {
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'task_name_input';
  input.required = true;
  input.classList.add('add-task-form__input');
  input.id = 'task_name_input';
  return input;
}

function createTaskNameLabel() {
  const label = document.createElement('label');
  label.textContent = 'Name';
  label.htmlFor = 'task_name_input';
  label.classList.add('add-task-form__label');
  label.id = 'task_name_label';
  return label;
}

function createTaskNameContainer() {
  const div = document.createElement('div');
  div.appendChild(createTaskNameLabel());
  div.appendChild(createTaskNameInput());
  return div;
}

function createTaskDateInput() {
  const input = document.createElement('input');
  input.type = 'datetime-local';
  input.name = 'task_date_input';
  input.required = 'true';
  input.classList.add('add-task-form__input');
  input.id = 'task_date_input';
  return input;
}

function createTaskDateLabel() {
  const label = document.createElement('label');
  label.textContent = 'Date';
  label.htmlFor = 'task_date_input';
  label.classList.add('add-task-form__label');
  label.id = 'task_date_label';
  return label;
}

function createTaskDateContainer() {
  const div = document.createElement('div');
  div.appendChild(createTaskDateLabel());
  div.appendChild(createTaskDateInput());
  return div;
}

function createAddTaskPriorityInput() {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.name = 'priority_toggle';
  input.classList.add('toggle');
  input.id = 'priority_toggle';
  return input;
}

function createAddTaskPriorityLabel() {
  const label = document.createElement('label');
  label.htmlFor = 'priority_toggle';
  label.classList.add('add-task-form__label-priority');
  return label;
}

function createAddTaskPriorityText() {
  const label = document.createElement('h2');
  label.textContent = 'Important';
  label.classList.add('add-task-form__label');
  return label;
}

function createAddPriorityContainer() {
  const div = document.createElement('div');
  div.classList.add('add-task-form__toggle-container');
  div.appendChild(createAddTaskPriorityText());
  div.appendChild(createAddTaskPriorityInput());
  div.appendChild(createAddTaskPriorityLabel());
  return div;
}

function createTaskDescriptionInput() {
  const textarea = document.createElement('textarea');
  textarea.name = 'task_description_input';
  textarea.classList.add('add-task-form__input');
  textarea.id = 'task_description_input';
  return textarea;
}

function createTaskDescriptionLabel() {
  const label = document.createElement('label');
  label.textContent = 'Description';
  label.htmlFor = 'task_description_input';
  label.classList.add('add-task-form__label');
  label.id = 'task_description_label';
  return label;
}

function createTaskDescriptionContainer() {
  const div = document.createElement('div');
  div.appendChild(createTaskDescriptionLabel());
  div.appendChild(createTaskDescriptionInput());
  return div;
}

function createAddBtn() {
  const addBtn = document.createElement('button');
  addBtn.type = 'submit';
  addBtn.textContent = 'Add';
  addBtn.classList.add('add-task-form__btn-add');
  return addBtn;
}

function createCancelBtn() {
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.classList.add('add-task-form__btn-cancel');
  cancelBtn.addEventListener('click', () => clearAddTaskForm());
  return cancelBtn;
}

function createBtnContainer() {
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('add-task-form__btn-container');
  btnContainer.appendChild(createAddBtn());
  btnContainer.appendChild(createCancelBtn());
  return btnContainer;
}

function inputFocus() {
  const fields = [
    { inputId: 'task_name_input', labelId: 'task_name_label' },
    { inputId: 'task_date_input', labelId: 'task_date_label' },
    { inputId: 'task_description_input', labelId: 'task_description_label' }
  ];

  fields.forEach(({ inputId, labelId }) => {
    const input = document.getElementById(inputId);
    const label = document.getElementById(labelId);

    input.addEventListener('focus', () => label.classList.add('add-task-form__label--focus'));
    input.addEventListener('blur', () => label.classList.remove('add-task-form__label--focus'));
  });
}



// Sort
function sortTasksByDueDate(tasks) {
  return tasks.sort((taskA, taskB) => {
    const dateA = parseISO(taskA.dueDate);
    const dateB = parseISO(taskB.dueDate);
    return compareAsc(dateA, dateB);
  });
}


// Toggle
function toggleStatus(task, id) {
  const name = document.getElementById(`task_${id}_name`);
  const description = document.getElementById(`task_${id}_description`);
  const status = document.getElementById(`task_${id}_status_toggle`);
  if (status.checked) {
    name.classList.add('task__txt--completed');
    description.classList.add('task__txt--completed');
    task.status = true;
  } else {
    name.classList.remove('task__txt--completed');
    description.classList.remove('task__txt--completed');
    task.status = false;
  }
  saveProjects();
}

function togglePriority(task, id) {
  const priority = document.getElementById(`task_${id}_priority_toggle`);
  priority.checked ? task.priority = true : task.priority = false;
  saveProjects();
}



// Add and Remove
export function addTask() {
  const projectName = document.getElementById('filter_title').textContent;
  const name = document.getElementById('task_name_input').value;
  const date = document.getElementById('task_date_input').value;
  const priority = document.getElementById('priority_toggle').checked;
  const description = document.getElementById('task_description_input').value;
  const status = false;

  let project = projects.find(p => p.name === projectName);
  Task(project, name, description, date, priority, status);
  saveProjects();
  clearAddTaskForm();
  renderTasksToMain(project.tasks);
}

function confirmDeleteTask(task) {
  const confirmTaskName = confirm(`Task "${task.name}" will be deleted.`);
  
  if (confirmTaskName) {
    deleteTask(task);
  }
}

function deleteTask(task) {
  const projectIndex = projects.findIndex(project => project.tasks.includes(task));
  const taskIndex = projects[projectIndex].tasks.indexOf(task);

  if (taskIndex > -1) {
    projects[projectIndex].tasks.splice(taskIndex, 1);
  }

  saveProjects();
  renderTasksToMain(projects[projectIndex].tasks);
}
