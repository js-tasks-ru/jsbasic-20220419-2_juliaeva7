import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carousel = new Carousel(slides);
    let dataCarouselHolder = document.querySelector('[data-carousel-holder]');
    dataCarouselHolder.append(carousel.elem);
    
    this.ribbonMenu = new RibbonMenu(categories);
    let dataRibbonHolder = document.querySelector('[data-ribbon-holder]');
    dataRibbonHolder.append(this.ribbonMenu.elem);
  
    let stepSlider = new StepSlider({steps: 5, value: 3});
    let dataSliderHolder = document.querySelector('[data-slider-holder]');
    dataSliderHolder.append(stepSlider.elem);
  
    let cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(cartIcon.elem);
  
    let cart = new Cart(cartIcon);

    let response =  await fetch('./products.json');
    let products =  await response.json();
    this.productsGrid = new ProductsGrid(products);
    let productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = '';
    productsGridHolder.append(this.productsGrid.elem);
     
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener("product-add", function(event) { 
      let productToAdd = products.find((product) => product.id === event.detail);
      if (productToAdd) {
        cart.addProduct(productToAdd);
      }
    
    });

    stepSlider.elem.addEventListener("slider-change", (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });

    this.ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
      this.productsGrid.updateFilter({
        category: event.detail,
      });
    });

    document.getElementById('nuts-checkbox').addEventListener("change", (event) => {
       this.productsGrid.updateFilter({
        noNuts: event.target.checked,
      });
    });

    document.getElementById('vegeterian-checkbox').addEventListener("change", (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked,
     });
   });

    return new Promise((resolve) => {
      resolve();
    });


  }

}

