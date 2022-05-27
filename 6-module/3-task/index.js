import createElement from '/assets/lib/create-element.js';

export default class Carousel {
  constructor(slides, elem = '') {
    this.slides = slides;
    this.elem = this.createElement();
  }
  createElement() {
    const carousel = document.createElement('div');
    this.carousel__inner = document.createElement('div');
    carousel.classList.add('carousel');
    this.carousel__inner.classList.add('carousel__inner');
    carousel.append(createElement(`<div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>`));
    carousel.append(createElement(`<div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>`));
      
    carousel.append(this.carousel__inner);
    this.slides.map(item => {
      this.carousel__inner.append(createElement( 
      `<div class="carousel__slide" data-id="${item.id}">
        <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${item.price.toFixed(2)}</span>
          <div class="carousel__title">${item.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`))
    });

    this.carouselArrowRight = carousel.querySelector('.carousel__arrow_right');
    this.carouselArrowLeft  = carousel.querySelector('.carousel__arrow_left');
  
    this.position = 0; // положение ленты прокрутки
    this.slidesAmount = this.slides.length;
    
    this.buttonsVisibility();

    this.carouselArrowRight.addEventListener('click', (event) => {this.carouselArrowRightFunction(event); });
    this.carouselArrowLeft.addEventListener('click', (event) => {this.carouselArrowLeftFunction(event); });
    
    let btnsCarouselProductAdd = this.carousel__inner.querySelectorAll('.carousel__button');
    for (let i = 0; i < btnsCarouselProductAdd.length; i++) {
      btnsCarouselProductAdd[i].addEventListener('click', (event) => {this.carouselProductAdd(event); });
      };

    return carousel;
  }

  carouselArrowRightFunction(event) {
    this.position += document.querySelector('.carousel__slide').offsetWidth;
    this.carousel__inner.style.transform = `translateX(-${this.position}px)`;
    
    this.buttonsVisibility();
  }

  carouselArrowLeftFunction(event) {
    this.position -= document.querySelector('.carousel__slide').offsetWidth;
    this.carousel__inner.style.transform = `translateX(-${this.position}px)`;
  
    this.buttonsVisibility();
  }

  buttonsVisibility(){
    let slideWidth = document.querySelector('.carousel__slide') == null ? 0 : document.querySelector('.carousel__slide').offsetWidth;
    this.carouselArrowRight.style.display = (this.position/(slideWidth) == this.slidesAmount-1) ? 'none' : '';
    this.carouselArrowLeft.style.display = (this.position == 0) ? 'none' : '';
  }

  carouselProductAdd(event) {
    const myEventcarouselProductAdd = new CustomEvent('product-add', {
      bubbles: true, 
      detail: event.target.closest('.carousel__slide').dataset.id,
    });

    event.target.dispatchEvent(myEventcarouselProductAdd);
  }
}