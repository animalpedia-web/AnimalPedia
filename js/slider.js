import animalsData from '../data/animals.js';

const initFeaturedSlider = async () => {
  const slider = document.getElementById('featuredSlider');
  const indicator = document.getElementById('featuredIndicator');
  const prevButton = document.getElementById('sliderPrev');
  const nextButton = document.getElementById('sliderNext');

  if (!slider || !indicator) return;

  console.log('🔥 FEATURED SLIDER ĐÃ CHẠY');
  console.log('Supabase client:', window.supabaseClient);

  // =========================================
  // LẤY LƯỢT TÌM KIẾM TỪ SUPABASE
  // =========================================

  let sortedAnimals = [];

  if (window.supabaseClient) {

    try {

      const { data, error } = await window.supabaseClient
        .from('animal_search_counts')
        .select('slug, search_count')
        .order('search_count', { ascending: false });

      if (error) {

        console.error(
          '❌ Lỗi lấy lượt tìm kiếm từ Supabase:',
          error
        );

        // Nếu Supabase lỗi thì dùng dữ liệu gốc
        sortedAnimals = animalsData.slice();

      } else {

        console.log(
          '✅ Dữ liệu lượt tìm từ Supabase:',
          data
        );

        // =========================================
        // TẠO BẢNG LƯỢT TÌM
        // =========================================

        const counts = {};

        data.forEach(row => {
          counts[row.slug] = row.search_count || 0;
        });

        // =========================================
        // SẮP XẾP ANIMAL THEO LƯỢT TÌM
        // =========================================

        sortedAnimals = animalsData
          .slice()
          .sort((a, b) => {

            const countA = counts[a.slug] || 0;
            const countB = counts[b.slug] || 0;

            return countB - countA;

          });

        console.log(
          '🏆 TOP ĐỘNG VẬT:',
          sortedAnimals.slice(0, 8).map(animal => ({
            name: animal.name,
            slug: animal.slug,
            count: counts[animal.slug] || 0
          }))
        );

      }

    } catch (error) {

      console.error(
        '❌ Không thể kết nối Supabase:',
        error
      );

      sortedAnimals = animalsData.slice();

    }

  } else {

    console.error(
      '❌ Không tìm thấy Supabase client!'
    );

    sortedAnimals = animalsData.slice();

  }


  // =========================================
  // LẤY 8 CON CÓ LƯỢT TÌM CAO NHẤT
  // =========================================

  const animals = sortedAnimals.slice(0, 8);

  // Nếu không có dữ liệu
  if (animals.length === 0) {
    console.warn('⚠ Không có động vật để hiển thị.');
    return;
  }


  let currentIndex = 0;
  let intervalId;


  // =========================================
  // TẠO SLIDE
  // =========================================

  const buildSlide = (animal, active) => {
    const slide = document.createElement('a');

    slide.href =
      `animal.html?slug=${animal.slug}`;

    slide.className =
      `featured-slide${active ? ' active' : ''}`;

    slide.innerHTML = `
      <img 
        src="${animal.image}" 
        alt="${animal.name}" 
        onerror="this.onerror=null;this.src='images/placeholder.svg';"
      >

      <div class="featured-overlay"></div>

      <div class="featured-tag">
        <strong>${animal.name}</strong>
        <span>${animal.type}</span>
      </div>
    `;

    return slide;
  };


  // =========================================
  // TẠO DẤU CHẤM
  // =========================================

  const buildIndicators = () => {

    indicator.innerHTML = '';

    animals.forEach((_, index) => {

      const dot =
        document.createElement('span');

      if (index === currentIndex) {
        dot.classList.add('active');
      }

      dot.addEventListener('click', () => {

        currentIndex = index;

        render();

        resetInterval();

      });

      indicator.appendChild(dot);

    });

  };


  // =========================================
  // HIỂN THỊ SLIDE
  // =========================================

  const render = () => {

    const slidesContainer =
      slider.querySelector('.featured-slides');

    if (!slidesContainer) return;

    slidesContainer.innerHTML = '';

    animals.forEach((animal, index) => {

      slidesContainer.appendChild(
        buildSlide(
          animal,
          index === currentIndex
        )
      );

    });

    buildIndicators();

  };


  // =========================================
  // SLIDE TIẾP THEO
  // =========================================

  const nextSlide = () => {

    currentIndex =
      (currentIndex + 1) % animals.length;

    render();

  };


  // =========================================
  // SLIDE TRƯỚC
  // =========================================

  const prevSlide = () => {

    currentIndex =
      (currentIndex - 1 + animals.length)
      % animals.length;

    render();

  };


  // =========================================
  // RESET TIMER
  // =========================================

  const resetInterval = () => {

    clearInterval(intervalId);

    intervalId =
      setInterval(nextSlide, 3000);

  };


  // =========================================
  // KHỞI ĐỘNG
  // =========================================

  render();

  resetInterval();


  // =========================================
  // SWIPE TRÊN ĐIỆN THOẠI
  // =========================================

  let startX = null;


  slider.addEventListener(
    'pointerdown',
    (event) => {

      startX = event.clientX;

    }
  );


  slider.addEventListener(
    'pointerup',
    (event) => {

      if (startX === null) return;

      const deltaX =
        event.clientX - startX;

      if (Math.abs(deltaX) > 40) {

        if (deltaX < 0) {

          nextSlide();

        } else {
          prevSlide();

        }

        resetInterval();

      }

      startX = null;

    }
  );


  slider.addEventListener(
    'pointerleave',
    () => {

      startX = null;

    }
  );


  // =========================================
  // NÚT PREVIOUS
  // =========================================

  if (prevButton) {

    prevButton.addEventListener(
      'click',
      () => {

        prevSlide();

        resetInterval();

      }
    );

  }


  // =========================================
  // NÚT NEXT
  // =========================================

  if (nextButton) {

    nextButton.addEventListener(
      'click',
      () => {

        nextSlide();

        resetInterval();

      }
    );

  }


  // =========================================
  // DỪNG KHI DI CHUỘT VÀO
  // =========================================

  slider.addEventListener(
    'mouseenter',
    () => clearInterval(intervalId)
  );


  slider.addEventListener(
    'mouseleave',
    resetInterval
  );

};


document.addEventListener(
  'DOMContentLoaded',
  initFeaturedSlider
);