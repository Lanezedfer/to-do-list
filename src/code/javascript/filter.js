import { isToday, isAfter, startOfDay, addWeeks, addMonths } from 'date-fns';

import { hideSidebar, toggleTheme } from './toggle.js';
import { projects } from './project.js';
import { clearTasks, clearAddTaskForm, clearAddTaskPrompt, renderAddTaskPrompt, renderTasksToMain } from './task.js';

const filterTitle = document.getElementById('filter_title');

export function filterByAllTasks() {
  filterTitle.textContent = 'All Tasks';
  hideSidebar();
  clearTasks();
  clearAddTaskForm();
  clearAddTaskPrompt();

  const allTasks = [];
  projects.forEach(project => {
    project.tasks.forEach(task => {
      allTasks.push(task);
    });
  });

  renderTasksToMain(allTasks);
  toggleTheme();
}

export function filterByToday() {
  filterTitle.textContent = 'Today';
  hideSidebar();
  clearTasks();
  clearAddTaskForm();
  clearAddTaskPrompt();

  const tasksDueToday = [];

  projects.forEach(project => {
    project.tasks.forEach(task => {
      if (isToday(new Date(task.dueDate))) {
        tasksDueToday.push(task);
      }
    });
  });

  renderTasksToMain(tasksDueToday);
  toggleTheme();
}

export function filterByWeek() {
  filterTitle.textContent = 'This Week';
  hideSidebar();
  clearTasks();
  clearAddTaskForm();
  clearAddTaskPrompt();

  const tasksDueInAWeek = [];
  const oneWeekFromNow = addWeeks(new Date(), 1);

  projects.forEach(project => {
    project.tasks.forEach(task => {
      const dueDate = new Date(task.dueDate);
      if (isAfter(dueDate, startOfDay(new Date())) && dueDate <= startOfDay(oneWeekFromNow)) {
        tasksDueInAWeek.push(task);
      }
    });
  });

  renderTasksToMain(tasksDueInAWeek);
  toggleTheme();
}

export function filterByMonth() {
  filterTitle.textContent = 'This Month';
  hideSidebar();
  clearTasks();
  clearAddTaskForm();
  clearAddTaskPrompt();

  const tasksDueInAMonth = [];
  const oneMonthFromNow = addMonths(new Date(), 1);

  projects.forEach(project => {
    project.tasks.forEach(task => {
      const dueDate = new Date(task.dueDate);
      if (isAfter(dueDate, startOfDay(new Date())) && dueDate <= startOfDay(oneMonthFromNow)) {
        tasksDueInAMonth.push(task);
      }
    });
  });

  renderTasksToMain(tasksDueInAMonth);
  toggleTheme();
}

export function filterByImportant() {
  filterTitle.textContent = 'Important';
  hideSidebar();
  clearTasks();
  clearAddTaskForm();
  clearAddTaskPrompt();

  const importantTasks = [];
  projects.forEach(project => {
    project.tasks.forEach(task => {
      if (task.priority === true) {
        importantTasks.push(task);
      }
    });
  });

  renderTasksToMain(importantTasks);
  toggleTheme();
}

export function filterByIncomplete() {
  filterTitle.textContent = 'Incomplete';
  hideSidebar();
  clearTasks();
  clearAddTaskForm();
  clearAddTaskPrompt();

  const incompleteTasks = [];
  projects.forEach(project => {
    project.tasks.forEach(task => {
      if (task.status === false) {
        incompleteTasks.push(task);
      }
    });
  });

  renderTasksToMain(incompleteTasks);
  toggleTheme();
}

export function filterByCompleted() {
  filterTitle.textContent = 'Completed';
  hideSidebar();
  clearTasks();
  clearAddTaskForm();
  clearAddTaskPrompt();

  const completedTasks = [];
  projects.forEach(project => {
    project.tasks.forEach(task => {
      if (task.status === true) {
        completedTasks.push(task);
      }
    });
  });

  renderTasksToMain(completedTasks);
  toggleTheme();
}

export function filterByProject(index) {
  filterTitle.textContent = projects[index].name;
  hideSidebar();
  clearAddTaskForm();
  renderTasksToMain(projects[index].tasks);
  renderAddTaskPrompt();
  toggleTheme();
}

export function applyStoredFilter() {
  const lastFilter = localStorage.getItem('lastFilter');
  if (lastFilter) {
    switch (lastFilter) {
      case 'all':
        filterByAllTasks();
        break;
      case 'today':
        filterByToday();
        break;
      case 'week':
        filterByWeek();
        break;
      case 'month':
        filterByMonth();
        break;
      case 'important':
        filterByImportant();
        break;
      case 'incomplete':
        filterByIncomplete();
        break;
      case 'completed':
        filterByCompleted();
        break;
      case 'project':
        const projectIndex = localStorage.getItem('lastProjectIndex');
        projectIndex !== null ? filterByProject(projectIndex) : filterByAllTasks();
        break;
      default:
        break;
    }
  } else {
    filterByAllTasks();
  }
}