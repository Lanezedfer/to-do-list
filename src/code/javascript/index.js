import '../css/reset.css';
import '../css/index.css';

import { toggleSidebar, toggleTheme } from './toggle.js';

const initialLoad = () => {
  toggleSidebar();
  toggleTheme();
}

export default initialLoad();

document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.getElementById('sidebar_toggle');
  sidebarToggle.addEventListener('change', toggleSidebar);
  window.addEventListener('resize', toggleSidebar);
});