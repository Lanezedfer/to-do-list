import '../css/reset.css';
import '../css/index.css';
import '../css/project.css';

import { toggleSidebar, toggleTheme } from './toggle.js';
import { applyStoredFilter, filterByAllTasks, filterByToday, filterByWeek, filterByMonth, filterByImportant, filterByIncomplete, filterByCompleted } from './filter.js';
import { renderProjectsToSidebar, renderAddProjectForm, confirmAddProject } from './project.js';

const initialLoad = () => {
  toggleSidebar();
  toggleTheme();
  applyStoredFilter();
  renderProjectsToSidebar();
}

export default initialLoad();

document.addEventListener('DOMContentLoaded', () => {
  // Toggle
  const sidebarToggle = document.getElementById('sidebar_toggle');
  sidebarToggle.addEventListener('change', toggleSidebar);
  window.addEventListener('resize', toggleSidebar);



  // Filter
  const allTasksFilter = document.getElementById('all_tasks');
  allTasksFilter.addEventListener('click', () => {
    filterByAllTasks();
    localStorage.setItem('lastFilter', 'all');
  });

  const todayFilter = document.getElementById('today');
  todayFilter.addEventListener('click', () => {
    filterByToday();
    localStorage.setItem('lastFilter', 'today');
  });

  const weekFilter = document.getElementById('week');
  weekFilter.addEventListener('click', () => {
    filterByWeek();
    localStorage.setItem('lastFilter', 'week');
  });

  const monthFilter = document.getElementById('month');
  monthFilter.addEventListener('click', () => {
    filterByMonth();
    localStorage.setItem('lastFilter', 'month');
  });

  const importantFilter = document.getElementById('important');
  importantFilter.addEventListener('click', () => {
    filterByImportant();
    localStorage.setItem('lastFilter', 'important');
  });

  const incompleteFilter = document.getElementById('incomplete');
  incompleteFilter.addEventListener('click', () => {
    filterByIncomplete();
    localStorage.setItem('lastFilter', 'incomplete');
  });

  const completedFilter = document.getElementById('completed');
  completedFilter.addEventListener('click', () => {
    filterByCompleted();
    localStorage.setItem('lastFilter', 'completed');
  });



  // Project
  const addProjectPrompt = document.getElementById('add_project_prompt');
  addProjectPrompt.addEventListener('click', renderAddProjectForm);
});

document.getElementById('add_project_form').addEventListener('submit', (event) => {
  event.preventDefault();
  confirmAddProject();
});