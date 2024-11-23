// Sidebar
export function toggleSidebar() {
  const media = window.matchMedia('(max-width: 900px)');
  const sidebarToggle = document.getElementById('sidebar_toggle');

  const body = document.getElementById('body');
  const header = document.getElementById('header');
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main');
  const footer = document.getElementById('footer');

  const standardLayout = () => {
    sidebar.classList.remove('sidebar--responsive-layout');
    body.classList.remove('body--responsive-layout');
    header.classList.remove('header--responsive-layout');
    main.classList.remove('main--responsive-layout');
    footer.classList.remove('footer--responsive-layout');
  };

  const responsiveLayout = () => {
    sidebar.classList.add('sidebar--responsive-layout');
    body.classList.add('body--responsive-layout');
    header.classList.add('header--responsive-layout');
    main.classList.add('main--responsive-layout');
    footer.classList.add('footer--responsive-layout');
  };

  if (media.matches) {
    if (sidebarToggle.checked) {
      sidebar.classList.add('sidebar--hidden');
      responsiveLayout();
    } else {
      sidebar.classList.remove('sidebar--hidden');
      responsiveLayout();
    }
  } else {
    if (sidebarToggle.checked) {
      sidebar.classList.add('sidebar--hidden');
      responsiveLayout();
    } else {
      sidebar.classList.remove('sidebar--hidden');
      standardLayout();
    }
  }
}



// Theme
const root = document.documentElement;
const headerIcons = document.querySelectorAll('.header__icon');
const sidebarIcons = document.querySelectorAll('.sidebar__icon');

function toggleLightTheme() {
  const projectIcons = document.querySelectorAll('.project-list__icon');

  root.style.setProperty('--color-foreground', '#000000');
  root.style.setProperty('--color-foreground-secondary', '#FFFFFF');
  root.style.setProperty('--color-background', '#F1F5F9');
  root.style.setProperty('--color-background-secondary', '#CBD5E1');
  root.style.setProperty('--color-background-tertiary', '#E2E8F0');
  root.style.setProperty('--color-accent', '#0756C6');
  root.style.setProperty('--color-accent-hover', '#0A6CF6');
  
  headerIcons.forEach(icon => { icon.classList.add('icon--light-theme'); });
  sidebarIcons.forEach(icon => { icon.classList.add('icon--light-theme'); });
  projectIcons.forEach(icon => { icon.classList.add('icon--light-theme'); });
}

function toggleDarkTheme() {
  const projectIcons = document.querySelectorAll('.project-list__icon');

  root.style.setProperty('--color-foreground', '#FFFFFF');
  root.style.setProperty('--color-foreground-secondary', '#000000');
  root.style.setProperty('--color-background', '#0F0F0F');
  root.style.setProperty('--color-background-secondary', '#2A2E32');
  root.style.setProperty('--color-background-tertiary', '#1B1E20');
  root.style.setProperty('--color-accent', '#0AE3F6');
  root.style.setProperty('--color-accent-hover', '#07B6C6');

  headerIcons.forEach(icon => { icon.classList.remove('icon--light-theme'); });
  sidebarIcons.forEach(icon => { icon.classList.remove('icon--light-theme'); });
  projectIcons.forEach(icon => { icon.classList.remove('icon--light-theme'); });
}

export function toggleTheme() {
  const themeToggle = document.getElementById('theme_toggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    if (savedTheme === 'dark') {
      toggleDarkTheme();
      themeToggle.checked = false;
    } else {
      toggleLightTheme();
      themeToggle.checked = true;
    }
  } else {
    if (themeToggle.checked) {
      toggleLightTheme();
      localStorage.setItem('theme', 'light');
    } else {
      toggleDarkTheme();
      localStorage.setItem('theme', 'dark');
    }
  }

  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      toggleLightTheme();
      localStorage.setItem('theme', 'light');
    } else {
      toggleDarkTheme();
      localStorage.setItem('theme', 'dark');
    }
  });
}