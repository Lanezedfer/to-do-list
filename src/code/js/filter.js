import { addMonths, addWeeks, isAfter, isToday, startOfDay } from "date-fns";

import { projects } from "./project.js";
import {
  clearAddTaskPrompt,
  clearTaskForm,
  clearTasks,
  renderAddTaskPrompt,
  renderTasks,
} from "./task.js";
import { hideSidebar, toggleTheme } from "./toggle.js";

const filterTitle = document.getElementById("filter_title");

export function filterByAllTasks() {
  filterTitle.textContent = "All Tasks";
  hideSidebar();
  clearTasks();
  clearTaskForm();
  clearAddTaskPrompt();

  const allTasks = [];
  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      allTasks.push(task);
    });
  });

  renderTasks(allTasks);
  toggleTheme();
}

export function filterByToday() {
  filterTitle.textContent = "Today";
  hideSidebar();
  clearTasks();
  clearTaskForm();
  clearAddTaskPrompt();

  const tasksDueToday = [];

  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      if (isToday(new Date(task.dueDate))) {
        tasksDueToday.push(task);
      }
    });
  });

  renderTasks(tasksDueToday);
  toggleTheme();
}

export function filterByWeek() {
  filterTitle.textContent = "This Week";
  hideSidebar();
  clearTasks();
  clearTaskForm();
  clearAddTaskPrompt();

  const tasksDueInAWeek = [];
  const oneWeekFromNow = addWeeks(new Date(), 1);

  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      const dueDate = new Date(task.dueDate);
      if (
        isAfter(dueDate, startOfDay(new Date())) &&
        dueDate <= startOfDay(oneWeekFromNow)
      ) {
        tasksDueInAWeek.push(task);
      }
    });
  });

  renderTasks(tasksDueInAWeek);
  toggleTheme();
}

export function filterByMonth() {
  filterTitle.textContent = "This Month";
  hideSidebar();
  clearTasks();
  clearTaskForm();
  clearAddTaskPrompt();

  const tasksDueInAMonth = [];
  const oneMonthFromNow = addMonths(new Date(), 1);

  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      const dueDate = new Date(task.dueDate);
      if (
        isAfter(dueDate, startOfDay(new Date())) &&
        dueDate <= startOfDay(oneMonthFromNow)
      ) {
        tasksDueInAMonth.push(task);
      }
    });
  });

  renderTasks(tasksDueInAMonth);
  toggleTheme();
}

export function filterByImportant() {
  filterTitle.textContent = "Important";
  hideSidebar();
  clearTasks();
  clearTaskForm();
  clearAddTaskPrompt();

  const importantTasks = [];
  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      if (task.priority === true) {
        importantTasks.push(task);
      }
    });
  });

  renderTasks(importantTasks);
  toggleTheme();
}

export function filterByIncomplete() {
  filterTitle.textContent = "Incomplete";
  hideSidebar();
  clearTasks();
  clearTaskForm();
  clearAddTaskPrompt();

  const incompleteTasks = [];
  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      if (task.status === false) {
        incompleteTasks.push(task);
      }
    });
  });

  renderTasks(incompleteTasks);
  toggleTheme();
}

export function filterByCompleted() {
  filterTitle.textContent = "Completed";
  hideSidebar();
  clearTasks();
  clearTaskForm();
  clearAddTaskPrompt();

  const completedTasks = [];
  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      if (task.status === true) {
        completedTasks.push(task);
      }
    });
  });

  renderTasks(completedTasks);
  toggleTheme();
}

export function filterByProject(index) {
  filterTitle.textContent = projects[index].name;
  hideSidebar();
  clearTaskForm();
  renderTasks(projects[index].tasks);
  renderAddTaskPrompt();
  toggleTheme();
}

export function applyStoredFilter() {
  const lastFilter = localStorage.getItem("lastFilter");
  const lastProjectIndex = localStorage.getItem("lastProjectIndex");
  if (lastFilter) {
    switch (lastFilter) {
      case "all":
        filterByAllTasks();
        break;
      case "today":
        filterByToday();
        break;
      case "week":
        filterByWeek();
        break;
      case "month":
        filterByMonth();
        break;
      case "important":
        filterByImportant();
        break;
      case "incomplete":
        filterByIncomplete();
        break;
      case "completed":
        filterByCompleted();
        break;
      case "project":
        if (lastProjectIndex !== null && projects[lastProjectIndex]) {
          filterByProject(lastProjectIndex);
        } else {
          filterByAllTasks();
        }
        break;
      default:
        break;
    }
  } else {
    filterByAllTasks();
  }
}
