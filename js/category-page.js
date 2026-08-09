const pageName = window.location.pathname.split('/').pop() || 'index.html';
const categoryMap = {
  'invertebrates.html': 'Động vật không xương sống',
  'mammals.html': 'Động vật có vú',
  'birds.html': 'Chim',
  'reptiles.html': 'Bò sát',
  'fish.html': 'Cá',
  'amphibians.html': 'Lưỡng cư',
  'insects.html': 'Côn trùng',
  'crustacean.html': 'Giáp xác'
};

const category = categoryMap[pageName];
const grid = document.getElementById('animalGrid');
const title = document.querySelector('.hero h1');

if (title && category) {
  title.textContent = category;
}

if (!grid) {
  console.error("Không tìm thấy #animalGrid");
} else {

fetch('data/animals.json')
  .then((res) => res.json())
  .then((animals) => {
    const animalsInCategory = animals
      .filter((animal) => animal.type === category)
      .sort((a, b) => a.name.localeCompare(b.name, 'vi'));

    if (!animalsInCategory.length) {
      grid.innerHTML = '<div class="animal-card empty"><h3>Chưa có dữ liệu</h3></div>';
      return;
    }

    grid.innerHTML = animalsInCategory
  .map((animal) => `
    <a class="animal-card" href="animal.html?slug=${animal.slug}">
      <h3>${animal.name}</h3>
    </a>
  `)
  .join('');
  });

}
