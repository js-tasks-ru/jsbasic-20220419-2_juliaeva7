import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories, elem='') {
    this.categories = categories;
    this.elem = this.createElement();
  }

  createElement() {
    let ribbon = document.createElement('div');
    ribbon.classList.add('ribbon');
    ribbon.append(createElement( 
      `<button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`));
    
    this.ribbonInner = document.createElement('nav');
    this.ribbonInner.classList.add('ribbon__inner');
    
    this.categories.map(item => {
      this.ribbonInner.append(createElement( 
      `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`))
    });

    ribbon.append(this.ribbonInner);

    ribbon.append(createElement( 
      `<button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`));
    
    this.ribbonArrowLeft   = ribbon.querySelector('.ribbon__arrow_left');
    this.ribbonArrowRight  = ribbon.querySelector('.ribbon__arrow_right');

    this.ribbonArrowRight.classList.add('ribbon__arrow_visible');
    
    this.ribbonInner.addEventListener('scroll', (event) => {this.scroll(event); });
    
    this.ribbonArrowRight.addEventListener('click', (event) => {this.ribbonArrowRightFunction(event); });
    this.ribbonArrowLeft.addEventListener('click', (event) => {this.ribbonArrowLeftFunction(event); });
    
    ribbon.addEventListener('click', (event) => {
      event.preventDefault(); 
      this.selectRibbonItem(event); 
    });
    
    return ribbon;

  }

  selectRibbonItem(event) {

    const myEventSelectRibbonItem = new CustomEvent('ribbon-select', {
      bubbles: true, 
      detail: event.target.dataset.id,
    });
   
    event.target.dispatchEvent(myEventSelectRibbonItem);
    
    if (!event.target.classList.contains('ribbon__item')) return;
    
    let activated = this.elem.querySelectorAll('.ribbon__item_active');
    for(let elem of activated) {
      elem.classList.remove('ribbon__item_active');
    }
    event.target.classList.add('ribbon__item_active');

  }
  
  scroll(event) {
    
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth; // число пикселей, например, 100 или 0
    
    this.ribbonArrowLeft.classList.add('ribbon__arrow_visible');
    this.ribbonArrowRight.classList.add('ribbon__arrow_visible');
    
    this.ribbonArrowRight.style.display = (scrollRight < 1) ? 'none' : '';
    this.ribbonArrowLeft.style.display = (scrollLeft < 1) ? 'none' : '';

  }

  ribbonArrowRightFunction(event) {
    
    document.querySelector('.ribbon__inner').scrollBy(350, 0);
  
  }

  ribbonArrowLeftFunction(event) {
    
    document.querySelector('.ribbon__inner').scrollBy(-350, 0);
      
  }

}