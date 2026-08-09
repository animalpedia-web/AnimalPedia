const initMenu = () => {
  const menuToggle = document.getElementById('menuToggle');
  const sideMenu = document.getElementById('sideMenu');

  if (menuToggle && sideMenu) {
    menuToggle.addEventListener('click', () => {
      sideMenu.classList.toggle('active');
    });
  }
};

document.addEventListener('DOMContentLoaded', initMenu);
