// Sidebar
const media = window.matchMedia("(max-width: 900px)");
const sidebarToggle = document.getElementById("sidebar_toggle");

export function toggleSidebar() {
  const body = document.getElementById("body");
  const header = document.getElementById("header");
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main");
  const footer = document.getElementById("footer");

  const standardLayout = () => {
    sidebar.classList.remove("sidebar--responsive-layout");
    body.classList.remove("body--responsive-layout");
    header.classList.remove("header--responsive-layout");
    main.classList.remove("main--responsive-layout");
    footer.classList.remove("footer--responsive-layout");
  };

  const responsiveLayout = () => {
    sidebar.classList.add("sidebar--responsive-layout");
    body.classList.add("body--responsive-layout");
    header.classList.add("header--responsive-layout");
    main.classList.add("main--responsive-layout");
    footer.classList.add("footer--responsive-layout");
  };

  if (media.matches) {
    if (sidebarToggle.checked) {
      sidebar.classList.add("sidebar--hidden");
      responsiveLayout();
    } else {
      sidebar.classList.remove("sidebar--hidden");
      responsiveLayout();
    }
  } else {
    if (sidebarToggle.checked) {
      sidebar.classList.add("sidebar--hidden");
      responsiveLayout();
    } else {
      sidebar.classList.remove("sidebar--hidden");
      standardLayout();
    }
  }
}

export function hideSidebar() {
  if (media.matches) {
    sidebarToggle.checked = true;
    toggleSidebar();
  }
}

// Theme
const root = document.documentElement;
const headerIcons = document.querySelectorAll(".header__icon");
const sidebarIcons = document.querySelectorAll(".sidebar__icon");

function toggleDarkTheme() {
  const projectIcons = document.querySelectorAll(".project__icon");
  const taskIcons = document.querySelectorAll(".task__icon");
  const addTaskPromptIcon = document.querySelectorAll(".add-task-prompt__icon");

  root.style.setProperty("--color-foreground-primary", "#ffffff");
  root.style.setProperty("--color-foreground-secondary", "#000000");
  root.style.setProperty("--color-background-primary", "#0f0f0f");
  root.style.setProperty("--color-background-secondary", "#2a2e32");
  root.style.setProperty("--color-background-tertiary", "#1b1e20");
  root.style.setProperty("--color-accent", "#0ae3f6");
  root.style.setProperty("--color-accent-hover", "#07b6c6");

  addTaskPromptIcon.forEach((icon) => {
    icon.classList.remove("icon--light-theme");
  });
  headerIcons.forEach((icon) => {
    icon.classList.remove("icon--light-theme");
  });
  projectIcons.forEach((icon) => {
    icon.classList.remove("icon--light-theme");
  });
  sidebarIcons.forEach((icon) => {
    icon.classList.remove("icon--light-theme");
  });
  taskIcons.forEach((icon) => {
    icon.classList.remove("icon--light-theme");
  });
}

function toggleLightTheme() {
  const projectIcons = document.querySelectorAll(".project__icon");
  const taskIcons = document.querySelectorAll(".task__icon");
  const addTaskPromptIcon = document.querySelectorAll(".add-task-prompt__icon");

  root.style.setProperty("--color-foreground-primary", "#000000");
  root.style.setProperty("--color-foreground-secondary", "#ffffff");
  root.style.setProperty("--color-background-primary", "#f1f5f9");
  root.style.setProperty("--color-background-secondary", "#cbd5e1");
  root.style.setProperty("--color-background-tertiary", "#e2e8f0");
  root.style.setProperty("--color-accent", "#0756c6");
  root.style.setProperty("--color-accent-hover", "#0a6cf6");

  addTaskPromptIcon.forEach((icon) => {
    icon.classList.add("icon--light-theme");
  });
  headerIcons.forEach((icon) => {
    icon.classList.add("icon--light-theme");
  });
  projectIcons.forEach((icon) => {
    icon.classList.add("icon--light-theme");
  });
  sidebarIcons.forEach((icon) => {
    icon.classList.add("icon--light-theme");
  });
  taskIcons.forEach((icon) => {
    icon.classList.add("icon--light-theme");
  });
}

export function toggleTheme() {
  const themeToggle = document.getElementById("theme_toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    if (savedTheme === "dark") {
      toggleDarkTheme();
      themeToggle.checked = false;
    } else {
      toggleLightTheme();
      themeToggle.checked = true;
    }
  } else {
    if (themeToggle.checked) {
      toggleLightTheme();
      localStorage.setItem("theme", "light");
    } else {
      toggleDarkTheme();
      localStorage.setItem("theme", "dark");
    }
  }

  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      toggleLightTheme();
      localStorage.setItem("theme", "light");
    } else {
      toggleDarkTheme();
      localStorage.setItem("theme", "dark");
    }
  });
}
