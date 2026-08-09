import animals from '../data/animals.js';

const initSearch = () => {
  const searchToggle = document.getElementById('searchToggle');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if (!searchToggle || !searchInput || !searchResults) return;

  const clearSearch = () => {
    searchInput.value = '';
    searchResults.innerHTML = '';
    searchResults.classList.remove('show');
  };

  searchToggle.addEventListener('click', () => {
    const isActive = searchInput.classList.toggle('active');
    if (isActive) {
      searchInput.focus();
    } else {
      clearSearch();
    }
  });

  const filterAnimals = () => {
    const value = searchInput.value.trim().toLowerCase();
    const matches = animals.filter(animal => {
      const name = animal.name.toLowerCase();
      return name.startsWith(value);
    });

    searchResults.innerHTML = '';
    searchResults.classList.remove('show');

    if (!value) return;

    if (matches.length > 0) {
      const list = document.createElement('ul');
      matches.forEach((animal) => {
        const item = document.createElement('li');
        item.innerHTML = `<a href="animal.html?slug=${animal.slug}"><strong>${animal.name}</strong> — ${animal.type}</a>`;
        const link = item.querySelector('a');
        link.addEventListener('click', () => {
          const stored = localStorage.getItem('animalSearchCounts');
          const counts = stored ? JSON.parse(stored) : {};
          counts[animal.slug] = (counts[animal.slug] || 0) + 1;
          localStorage.setItem('animalSearchCounts', JSON.stringify(counts));
        });
        list.appendChild(item);
      });
      searchResults.appendChild(list);
      searchResults.classList.add('show');
    } else {
      searchResults.innerHTML = '<p>Không tìm thấy loài nào phù hợp.</p>';
      searchResults.classList.add('show');
    }
  };

  searchInput.addEventListener('input', filterAnimals);
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      filterAnimals();
    }
  });
};

document.addEventListener('DOMContentLoaded', initSearch);
