export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.createElem();

  }

  createElem(){

    let valuePercents = this.value / (this.steps-1) * 100;
    
    let slider = document.createElement('div');
    slider.classList.add('slider');

    let slider__thumb = document.createElement('div');
    slider__thumb.classList.add('slider__thumb');
    slider__thumb.style.left = valuePercents + '%';

    let slider__value = document.createElement('span');
    slider__value.classList.add('slider__value');
    slider__value.textContent = this.value;

    slider__thumb.append(slider__value);
    slider.append(slider__thumb);

    let slider__progress = document.createElement('div');
    slider__progress.classList.add('slider__progress');
    slider__progress.style.width = valuePercents + '%';
    slider.append(slider__progress);

    let slider__steps = document.createElement('div');
    slider__steps.classList.add('slider__steps');
    
    for (let i = 0; i < this.steps; i++) {
      let step = document.createElement('span');
      if (i === this.value) {
        step.classList.add('slider__step-active');
      };
      slider__steps.append(step);
    };
    slider.append(slider__steps);

    this.elem = slider;
    
    this.elem.addEventListener('click', (event) => {
      
      event.preventDefault(); 
      
      let left = event.clientX - event.target.getBoundingClientRect().left; //получим расстояние в пикселях от начала слайдера до места клика
      let leftRelative = left / event.target.offsetWidth; // cоотношение длины слайдера к точке куда щелкнули
     
      let segments = this.steps - 1; // количество шагов в слайдере
      let approximateValue = leftRelative * segments;
      
      let value = Math.round(approximateValue);
      
      let valuePercents = value / segments * 100;
      
      slider__thumb.style.left = valuePercents + '%';
      slider__progress.style.width = valuePercents + '%';
      slider__value.textContent = value;

      let activated = slider__steps.querySelectorAll('span');
      for(let elem of activated) {
        elem.classList.remove('slider__step-active');
      }
      
      activated[value].classList.add('slider__step-active');
      
      this.sliderChange(event, value); 
      
    });

  }

  sliderChange(event, value = 0) {

    const myEventsliderChange = new CustomEvent('slider-change', {
      bubbles: true, 
      detail: value,
    });
    
    event.target.dispatchEvent(myEventsliderChange);

  }

}
