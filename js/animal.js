import animals from '../data/animals.js';

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el && value) el.textContent = value;
};

const imagePath = (path) => path || 'images/placeholder.svg';

const normalizeVideos = (animal) => {
  const source = animal.videos || animal.video || [];
  const videos = Array.isArray(source) ? source : [source];

  return videos
    .map((video) => (typeof video === 'string' ? { url: video } : video))
    .filter((video) => video && video.url);
};

const renderGallery = (animal) => {
  const gallery = document.getElementById('animalGallery');
  const imageEl = document.getElementById('animalImage');
  if (!gallery || !imageEl) return;

  const images = Array.from(new Set([animal.image, ...(animal.gallery || [])].filter(Boolean)));
  if (!images.length) return;

  const setActiveImage = (path, alt) => {
    imageEl.src = imagePath(path);
    imageEl.alt = alt;
    gallery.querySelectorAll('button').forEach((button) => {
      button.classList.toggle('active', button.dataset.image === path);
    });
  };

  gallery.replaceChildren();
  images.forEach((path, index) => {
    const button = document.createElement('button');
    const thumbnail = document.createElement('img');

    button.type = 'button';
    button.className = 'gallery-thumb';
    button.dataset.image = path;
    button.setAttribute('aria-label', `Xem ảnh ${index + 1} của ${animal.name}`);
    thumbnail.src = imagePath(path);
    thumbnail.alt = `${animal.name} - ảnh ${index + 1}`;
    thumbnail.loading = 'lazy';
    thumbnail.addEventListener('error', () => {
      thumbnail.src = 'images/placeholder.svg';
    }, { once: true });
    button.appendChild(thumbnail);
    button.addEventListener('click', () => setActiveImage(path, animal.name));
    gallery.appendChild(button);
  });

  imageEl.addEventListener('error', () => {
    imageEl.src = 'images/placeholder.svg';
  }, { once: true });
  setActiveImage(images[0], animal.name);
};

const renderVideos = (animal) => {
  const section = document.getElementById('animalVideosSection');
  const container = document.getElementById('animalVideos');
  if (!section || !container) return;

  const videos = normalizeVideos(animal);
  container.replaceChildren();
  if (!videos.length) return;

  videos.forEach((video, index) => {
    const figure = document.createElement('figure');
    const isDirectVideo = /\.mp4(?:$|\?)/i.test(video.url) || /pexels\.com\/.*\/download\/video\//i.test(video.url);

    if (isDirectVideo) {
      const player = document.createElement('video');
      player.src = video.url;
      player.controls = true;
      player.preload = 'metadata';
      player.playsInline = true;
      player.setAttribute('aria-label', video.title || `Video về ${animal.name} ${index + 1}`);
      figure.appendChild(player);
    } else {
      const iframe = document.createElement('iframe');
      iframe.src = video.url;
      iframe.title = video.title || `Video về ${animal.name} ${index + 1}`;
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      figure.appendChild(iframe);
    }

    if (video.title) {
      const caption = document.createElement('figcaption');
      caption.textContent = video.title;
      figure.appendChild(caption);
    }

    container.appendChild(figure);
  });

  section.hidden = false;
};

const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');
const animal = animals.find((a) => a.slug === slug);

if (animal) {
  renderGallery(animal);
  renderVideos(animal);

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
}
