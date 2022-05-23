function initCarousel() {
  let carouselArrowRight = document.querySelector('.carousel__arrow_right');
  let carouselArrowLeft  = document.querySelector('.carousel__arrow_left');
   
  let slide = document.querySelector('.carousel__slide');
  let width = +slide.offsetWidth; // ширина картинки

  let slides = document.querySelectorAll('.carousel__slide');
  let inner = document.querySelector('.carousel__inner');
  
  let position = 0; // положение ленты прокрутки
  let slidesAmount = slides.length;

  function buttonsVisibility(){
    carouselArrowRight.style.display = (position/width == slidesAmount-1) ? 'none' : '';
    carouselArrowLeft.style.display = (position == 0) ? 'none' : '';
  };

  buttonsVisibility();
  // inner.style.transform = 'translateX(-2842px)';

  carouselArrowLeft.onclick = function() {
    
    position -= width;
    inner.style.transform = `translateX(-${position}px)`;
  
    buttonsVisibility();
  };

  carouselArrowRight.onclick = function() {
    
    position += width;
    inner.style.transform = `translateX(-${position}px)`;
    
    buttonsVisibility(); 
  };
}
