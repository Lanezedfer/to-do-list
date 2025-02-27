import "../css/reset.css";
import "../css/index.css";
import "../css/project.css";
import "../css/task.css";

import {
  applyStoredFilter,
  filterByAllTasks,
  filterByCompleted,
  filterByImportant,
  filterByIncomplete,
  filterByMonth,
  filterByToday,
  filterByWeek,
} from "./filter.js";
import {
  confirmAddProject,
  renderProjectForm,
  renderProjects,
} from "./project.js";
import { addTask } from "./task.js";
import { toggleSidebar, toggleTheme } from "./toggle.js";

const initialLoad = () => {
  toggleSidebar();
  toggleTheme();
  applyStoredFilter();
  renderProjects();
};

export default initialLoad();

document.addEventListener("DOMContentLoaded", () => {
  // Toggle
  const sidebarToggle = document.getElementById("sidebar_toggle");
  sidebarToggle.addEventListener("change", toggleSidebar);
  window.addEventListener("resize", toggleSidebar);

  // Filter
  const allTasksFilter = document.getElementById("all_tasks");
  allTasksFilter.addEventListener("click", () => {
    filterByAllTasks();
    localStorage.setItem("lastFilter", "all");
  });

  const todayFilter = document.getElementById("today");
  todayFilter.addEventListener("click", () => {
    filterByToday();
    localStorage.setItem("lastFilter", "today");
  });

  const weekFilter = document.getElementById("week");
  weekFilter.addEventListener("click", () => {
    filterByWeek();
    localStorage.setItem("lastFilter", "week");
  });

  const monthFilter = document.getElementById("month");
  monthFilter.addEventListener("click", () => {
    filterByMonth();
    localStorage.setItem("lastFilter", "month");
  });

  const importantFilter = document.getElementById("important");
  importantFilter.addEventListener("click", () => {
    filterByImportant();
    localStorage.setItem("lastFilter", "important");
  });

  const incompleteFilter = document.getElementById("incomplete");
  incompleteFilter.addEventListener("click", () => {
    filterByIncomplete();
    localStorage.setItem("lastFilter", "incomplete");
  });

  const completedFilter = document.getElementById("completed");
  completedFilter.addEventListener("click", () => {
    filterByCompleted();
    localStorage.setItem("lastFilter", "completed");
  });

  // Project
  const addProjectPrompt = document.getElementById("add_project");
  addProjectPrompt.addEventListener("click", renderProjectForm);
});

document.getElementById("project_form").addEventListener("submit", (event) => {
  event.preventDefault();
  confirmAddProject();
});

document.getElementById("task_form").addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});
