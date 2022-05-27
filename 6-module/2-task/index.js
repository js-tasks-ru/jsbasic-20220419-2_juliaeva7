import createElement from '/assets/lib/create-element.js';

export default class ProductCard {
  constructor(product, elem = '') {
    this.product = product;
    this.elem = this.createElement();
  }
  createElement() {
    let newElem = createElement(`
    <div class="card">
        <div class="card__top">
            <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
            <span class="card__price">€${this.product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${this.product.name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
    </div>
    `);

    let btnsAdd = document.querySelectorAll('.card__button');
    for (let i = 0; i < btnsAdd.length; i++) {
        btnsAdd[i].addEventListener('click', (event) => {this.productAdd(event); });
      };

    return newElem;
  }

  productAdd(event) {
    const myEventProductAdd = new CustomEvent('product-add', {
      bubbles: true, 
      detail: this.product.id
    });

    event.target.dispatchEvent(myEventProductAdd);
  }
}

