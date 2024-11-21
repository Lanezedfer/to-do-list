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