const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'pages');
const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith('.html'));
const animals = [];

for (const file of files) {
  const html = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const slug = file.replace('.html', '');

  const get = (id) => {
    const match = html.match(new RegExp(`id="${id}">([^<]*)`));
    return match ? match[1].trim() : '';
  };

  const imgMatch = html.match(/id="animalImage"[^>]*src="([^"]+)"/);
  const image = imgMatch ? imgMatch[1].replace('../', '') : `images/${slug}.jpg`;
  const h1Match = html.match(/<h1>([^<]+)<\/h1>/);

  animals.push({
    slug,
    name: get('animalName') || (h1Match ? h1Match[1] : slug),
    scientificName: get('animalScientificName'),
    type: get('animalGroup'),
    image,
    weight: get('animalWeight'),
    length: get('animalLength'),
    lifespan: get('animalLifespan'),
    speed: get('animalSpeed'),
    diet: get('animalDiet'),
    distribution: get('animalDistribution'),
    intro: get('animalIntro'),
    habitat: get('animalHabitat'),
    feeding: get('animalFeeding'),
    distributionDetail: get('animalDistributionDetail'),
  });
}

animals.sort((a, b) => a.name.localeCompare(b.name, 'vi'));

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'animals.json'),
  JSON.stringify(animals, null, 2)
);

console.log(`Wrote ${animals.length} animals to data/animals.json`);
