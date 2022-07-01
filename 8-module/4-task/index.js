import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product=undefined) {
    if (product === null || product === undefined) {
      return;
    };

    let cartItem = this.cartItems.find(item => item.product.id === product.id);
    if (cartItem === undefined) {
      this.cartItems.push({
        product: product,
        count: 1
      })
    }
    else {
      cartItem.count = +cartItem.count + 1;

    };

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
   
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    cartItem.count = +cartItem.count + amount;
    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return  (this.cartItems.length === 0)
  }

  getTotalCount() {
    let summ = 0;
    this.cartItems.map(el => summ += el.count);
    return summ; 
 }

  getTotalPrice() {
    let summ = 0;
    this.cartItems.map(el => summ += (el.product.price*el.count));
    return summ; 
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {

    this.modal = new Modal();
    this.modal.setTitle('Your order');
      
    let renderAllModal = document.createElement('div');
    for (let item of this.cartItems) {
      let renderProduct = this.renderProduct(item.product, item.count);
      let buttonMinus = renderProduct.querySelector('.cart-counter__button_minus');
      let buttonPlus = renderProduct.querySelector('.cart-counter__button_plus');
      buttonMinus.addEventListener('click', (event) => {
        this.updateProductCount(item.product.id, -1);
        // item.count += -1;
        // item.count = (item.count<0 ? 0 : item.count);
      }); 
      buttonPlus.addEventListener('click', (event) => {
        this.updateProductCount(item.product.id, 1);
        // item.count += 1;
      }); 
      renderAllModal.append(renderProduct);
    };
    let elementCartForm = this.renderOrderForm();
    elementCartForm.addEventListener('submit', (event) => {
      this.onSubmit(event);
    }); 
    renderAllModal.append(elementCartForm);

    this.modal.setBody(renderAllModal);

    this.modal.open();

  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      let elementProduct = document.querySelector(`[data-product-id="${cartItem.product.id}"]`);
      let elementQuantity = elementProduct.querySelector('.cart-counter__count');
      let elementPrice = elementProduct.querySelector('.cart-product__price');
      let elementInfoPrice = document.querySelector('.cart-buttons__info-price');
      elementQuantity.innerHTML = cartItem.count;
      elementPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      elementInfoPrice.innerHTML = `€${(this.getTotalPrice().toFixed(2))}`;
      if (cartItem.count < 1) {
        elementProduct.remove();
      };
    };
    if (this.isEmpty()) {
      this.modal.close();
    };

    this.cartIcon.update(this);
  } 

  onSubmit(event) {
    
    event.preventDefault();
    
    fetch('https://httpbin.org/post', {
        method: 'POST',
        body: new FormData(event.target) 
    })
    .then(response => {
        if (response.ok) {
          this.modal.setTitle('Success!');
          this.cartItems = [];
          this.modal.setBody(createElement(`<div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
          `));
          this.cartIcon.update(this);
          
        }   
        
    });

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}