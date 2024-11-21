import '../css/reset.css';
import '../css/index.css';

import { toggleSidebar } from './toggle.js';

const initialLoad = () => {
  toggleSidebar();
}

export default initialLoad();

document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.getElementById('sidebar_toggle');
  sidebarToggle.addEventListener('change', toggleSidebar);
  window.addEventListener('resize', toggleSidebar);
});