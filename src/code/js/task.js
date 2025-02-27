import { compareAsc, format, parseISO } from "date-fns";

import { projects, saveProjects } from "./project.js";

import addIcon from "../../assets/images/icons/add-icon.svg";
import deleteIcon from "../../assets/images/icons/delete-icon.svg";

function Task(project, name, description, dueDate, priority, status) {
  const task = {
    name: name,
    description: description,
    dueDate: dueDate,
    priority: priority,
    status: status,
  };

  project.tasks.push(task);
}

const main = document.getElementById("main");
const mainContent = document.getElementById("main_content");
const form = document.getElementById("task_form");
const addTaskPrompt = document.getElementById("add_task_prompt");

// Tasks
export function renderTasks(tasks) {
  clearTasks();
  const sortedTasks = sortTasksByDueDate(tasks);
  if (sortedTasks.length > 0) {
    let id = 0;
    sortedTasks.forEach((task) => {
      id += 1;
      mainContent.appendChild(createCard(task, id));
      const deleteIcon = document.getElementById(`${id}_delete`);
      const priorityToggle = document.getElementById(`${id}_priority`);
      const statusToggle = document.getElementById(`${id}_status`);
      deleteIcon.addEventListener("click", () => deleteTask(task));
      priorityToggle.addEventListener("click", () => togglePriority(task, id));
      statusToggle.addEventListener("click", () => toggleStatus(task, id));
    });
  }
}

export function clearTasks() {
  mainContent.innerHTML = "";
}

function createCard(task, id) {
  const card = document.createElement("div");
  card.id = `${id}`;
  card.classList.add("task");
  card.innerHTML = getCardHTML(task, id);
  return card;
}

function getCardHTML(task, id) {
  return `
    <div class="task__top">
      <label
        for="${id}_status"
        class="task__label-status"
      >
        <input
          type="checkbox"
          id="${id}_status"
          name="${id}_status"
          class="toggle"
          ${task.status ? "checked" : ""}
        />
        <span class="task__span-status"></span>
      </label>
      <h1
        id="${id}_name"
        class="task__txt-name ${task.status ? "task__txt--completed" : ""}"
      >${task.name}
      </h1>
      <p class="task__txt-date">
        ${format(parseISO(task.dueDate), "HH:mm (dd-MM-yyyy)")}
      </p>
    </div>
    <p
      id="${id}_description"
      class="task__txt-description ${task.status ? "task__txt--completed" : ""}"
    >${task.description}
    </p>
    <div class="task__bottom">
      <div class="task__container-priority">
        <input
          type="checkbox"
          id="${id}_priority"
          name="${id}_priority"
          class="toggle"
          ${task.priority ? "checked" : ""}
        />
        <label
          for="${id}_priority"
          class="task__label-priority"
        ></label>
      </div>
      <img
        id="${id}_delete"
        src="${deleteIcon}"
        alt="Delete ${task.name}"
        class="task__icon" 
      />
    </div>
  `;
}

// Add Task Prompt
export function renderAddTaskPrompt() {
  clearAddTaskPrompt();

  addTaskPrompt.classList.add("add-task-prompt");
  addTaskPrompt.textContent = "Add Task";
  addTaskPrompt.addEventListener("click", renderTaskForm);

  const addTaskIcon = document.createElement("img");
  addTaskIcon.src = addIcon;
  addTaskIcon.classList.add("add-task-prompt__icon");

  addTaskPrompt.appendChild(addTaskIcon);
  main.appendChild(addTaskPrompt);
}

export function clearAddTaskPrompt() {
  addTaskPrompt.innerHTML = "";
}

// Task Form
function renderTaskForm() {
  clearTaskForm();
  form.classList.add("task-form");
  form.innerHTML = getTaskFormHTML();
  const cancelBtn = document.getElementById("task_form_cancel");
  main.appendChild(form);
  inputFocus();
  cancelBtn.addEventListener("click", clearTaskForm);
}

function getTaskFormHTML() {
  return `
    <fieldset class="task-form__field">
      <div class="task-form__column-left">
        <div>
          <label
            id="name_label"
            for="task_name_input"
            class="task-form__label"
          >Name
          </label>
          <input
            type="text"
            id="name_input"
            name="task_name_input"
            required
            class="task-form__input"
          />
        </div>
        <div>
          <label
            id="date_label"
            for="task_date_input"
            class="task-form__label"
          >Date
          </label>
          <input
            type="datetime-local"
            id="date_input"
            name="task_date_input"
            required
            class="task-form__input"
          />
        </div>
        <div class="task-form__toggle-container">
          <h2 class="task-form__label">Important</h2>
          <input
            type="checkbox"
            id="priority_toggle"
            name="priority_toggle"
            class="toggle"
          />
          <label
            for="priority_toggle"
            class="task-form__label-priority"
          /></label>
        </div>
      </div>
      <div class="add-task-form__column-right">
        <div>
          <label
            id="description_label"
            for="task_description_input"
            class="task-form__label"
          >Description
          </label>
          <textarea
            id="description_input"
            name="task_description_input"
            class="task-form__input"
          ></textarea>
        </div>
      </div>
      <div class="task-form__btn-container">
        <button type="submit" class="task-form__btn-add">Add</button>
        <button
          id="task_form_cancel"
          class="task-form__btn-cancel"
          >Cancel
        </button>
      </div>
    </fieldset>
  `;
}

export function clearTaskForm() {
  form.classList.remove("task-form");
  form.innerHTML = "";
}

function inputFocus() {
  const fields = [
    { inputId: "name_input", labelId: "name_label" },
    { inputId: "date_input", labelId: "date_label" },
    { inputId: "description_input", labelId: "description_label" },
  ];

  fields.forEach(({ inputId, labelId }) => {
    const input = document.getElementById(inputId);
    const label = document.getElementById(labelId);

    input.addEventListener("focus", () =>
      label.classList.add("task-form__label--focus"),
    );
    input.addEventListener("blur", () =>
      label.classList.remove("task-form__label--focus"),
    );
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
  const name = document.getElementById(`${id}_name`);
  const description = document.getElementById(`${id}_description`);
  const status = document.getElementById(`${id}_status`);
  if (status.checked) {
    name.classList.add("task__txt--completed");
    description.classList.add("task__txt--completed");
    task.status = true;
  } else {
    name.classList.remove("task__txt--completed");
    description.classList.remove("task__txt--completed");
    task.status = false;
  }
  saveProjects();
}

function togglePriority(task, id) {
  const priority = document.getElementById(`${id}_priority`);
  priority.checked ? (task.priority = true) : (task.priority = false);
  saveProjects();
}

// Add and Remove
export function addTask() {
  const projectName = document.getElementById("filter_title").textContent;
  const name = document.getElementById("name_input").value;
  const date = document.getElementById("date_input").value;
  const priority = document.getElementById("priority_toggle").checked;
  const description = document.getElementById("description_input").value;
  const status = false;

  let project = projects.find((p) => p.name === projectName);
  Task(project, name, description, date, priority, status);
  saveProjects();
  clearTaskForm();
  renderTasks(project.tasks);
}

function deleteTask(task) {
  const projectIndex = projects.findIndex((project) =>
    project.tasks.includes(task),
  );
  const taskIndex = projects[projectIndex].tasks.indexOf(task);

  if (taskIndex > -1) {
    projects[projectIndex].tasks.splice(taskIndex, 1);
  }

  saveProjects();
  renderTasks(projects[projectIndex].tasks);
}
