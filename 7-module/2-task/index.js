import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor(title = '', body = '') {
    this.title = title;
    this.body = body;
  }

  setTitle(title) {
    this.title = title;
    const modal__title = document.querySelector('.modal__title');
    if (modal__title) {
      modal__title.textContent = title;
    } 
  }
  
  setBody(body) {
    this.body = body;
    const modal__body = document.querySelector('.modal__body');
    if (modal__body) {
      while (modal__body.firstChild) {
        modal__body.removeChild(modal__body.firstChild);
      }
      modal__body.append(body);
    } 
  }

  open() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modal__overlay = createElement(`<div class="modal__overlay"></div>`);
    modal.append(modal__overlay);

    const modal__inner = createElement(`<div class="modal__inner"></div>`);
    
    const modal__header = createElement(`<div class="modal__header"></div>`);
    
    const modal__close = createElement(`
      <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>`);
    modal__header.append(modal__close);
 
    const modal__title = createElement(`
        <h3 class="modal__title">
          ${this.title}
        </h3>
      </div>`);
    modal__header.append(modal__title);

    const modal__body = document.createElement('div');
    modal__body.classList.add('modal__body');
    modal__body.append(this.body);

    modal__inner.append(modal__header);
    modal__inner.append(modal__body);

    modal.append(modal__inner);

    document.body.append(modal);
    document.body.classList.add('is-modal-open');

    
    modal__close.addEventListener('click', (event) => {
      event.preventDefault(); 
      this.close(); 
    });

    document.addEventListener('keydown', function(event) {
      if (event.code === 'Escape') {
        modal.remove();
        document.body.classList.remove('is-modal-open');
      }
    });
    
  }
  
  close() {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.remove();
    };
    document.body.classList.remove('is-modal-open');
    
  }

}
