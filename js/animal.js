const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el && value) el.textContent = value;
};

fetch('data/animals.json')
  .then((res) => res.json())
  .then((animals) => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const animal = animals.find((a) => a.slug === slug);

    if (!animal) return;

    const imageEl = document.getElementById('animalImage');
    if (imageEl) {
      imageEl.src = animal.image;
      imageEl.alt = animal.name;
    }

    document.title = `AnimalPedia - ${animal.name}`;
    setText('animalTitle', animal.name);
    setText('animalName', animal.name);
    setText('animalScientificName', animal.scientificName);
    setText('animalGroup', animal.type);
    setText('animalWeight', animal.weight);
    setText('animalLength', animal.length);
    setText('animalLifespan', animal.lifespan);
    setText('animalSpeed', animal.speed);
    setText('animalDiet', animal.diet);
    setText('animalDistribution', animal.distribution);
    setText('animalIntro', animal.intro);
    setText('animalHabitat', animal.habitat);
    setText('animalFeeding', animal.feeding);
    setText('animalDistributionDetail', animal.distributionDetail);
  });
