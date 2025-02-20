import { projects } from "./project.js";

const filterTitle = document.getElementById("filter_title");

export function filterByAllTasks() {
  filterTitle.textContent = "All Tasks";
}

export function filterByToday() {
  filterTitle.textContent = "Today";
}

export function filterByWeek() {
  filterTitle.textContent = "This Week";
}

export function filterByMonth() {
  filterTitle.textContent = "This Month";
}

export function filterByImportant() {
  filterTitle.textContent = "Important";
}

export function filterByIncomplete() {
  filterTitle.textContent = "Incomplete";
}

export function filterByCompleted() {
  filterTitle.textContent = "Completed";
}

export function filterByProject(index) {
  filterTitle.textContent = projects[index].name;
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
