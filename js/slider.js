import animalsData from '../data/animals.js';

const initFeaturedSlider = () => {
  const slider = document.getElementById('featuredSlider');
  const indicator = document.getElementById('featuredIndicator');
  const prevButton = document.getElementById('sliderPrev');
  const nextButton = document.getElementById('sliderNext');
  if (!slider || !indicator) return;

  const stored = localStorage.getItem('animalSearchCounts');
  const counts = stored ? JSON.parse(stored) : {};
  const sortedAnimals = animalsData.slice().sort((a, b) => {
    const countA = counts[a.slug] || 0;
    const countB = counts[b.slug] || 0;
    return countB - countA;
  });
  const animals = sortedAnimals.slice(0, 8);
  let currentIndex = 0;
  let intervalId;

  const buildSlide = (animal, active) => {
    const slide = document.createElement('a');
    slide.href = `animal.html?slug=${animal.slug}`;
    slide.className = `featured-slide${active ? ' active' : ''}`;
    slide.innerHTML = `
      <img src="${animal.image}" alt="${animal.name}" onerror="this.onerror=null;this.src='images/placeholder.svg';">
      <div class="featured-overlay"></div>
      <div class="featured-tag">
        <strong>${animal.name}</strong>
        <span>${animal.type}</span>
      </div>
    `;
    return slide;
  };

  const buildIndicators = () => {
    indicator.innerHTML = '';
    animals.forEach((_, index) => {
      const dot = document.createElement('span');
      if (index === currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = index;
        render();
        resetInterval();
      });
      indicator.appendChild(dot);
    });
  };

  const render = () => {
    const slidesContainer = slider.querySelector('.featured-slides');
    if (!slidesContainer) return;
    slidesContainer.innerHTML = '';
    animals.forEach((animal, index) => {
      slidesContainer.appendChild(buildSlide(animal, index === currentIndex));
    });
    buildIndicators();
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % animals.length;
    render();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + animals.length) % animals.length;
    render();
  };

  const resetInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 3000);
  };

  render();
  resetInterval();

  let startX = null;

  slider.addEventListener('pointerdown', (event) => {
    startX = event.clientX;
  });

  slider.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const deltaX = event.clientX - startX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) nextSlide(); else prevSlide();
      resetInterval();
    }
    startX = null;
  });

  slider.addEventListener('pointerleave', () => {
    startX = null;
  });

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  }

  slider.addEventListener('mouseenter', () => clearInterval(intervalId));
  slider.addEventListener('mouseleave', resetInterval);
};

document.addEventListener('DOMContentLoaded', initFeaturedSlider);
