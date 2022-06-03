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
    
    let thumb = this.elem.querySelector('.slider__thumb');
    
    thumb.onpointerdown = function(event){
      
      event.preventDefault(); 
      
      let slider = document.querySelector('.slider');
      slider.classList.add('slider_dragging');
     
      document.addEventListener('pointermove', onPointerMove);
     
      document.addEventListener('pointerup', onPointerUp);

      function onPointerMove(event) {
       
        event.preventDefault(); 
      
        let slider__thumb = document.querySelector('.slider__thumb');
        let slider = document.querySelector('.slider');
        let slider__steps = document.querySelectorAll('.slider__steps span');
        let slider__progress = document.querySelector('.slider__progress');
        let slider__value = document.querySelector('.slider__value');
        let segments = slider__steps.length - 1; 
        
        let result = CountSliderProgress(event.clientX, slider, segments);

        let value = result[0];
        
        let valuePercents = result[1];
        
        slider__thumb.style.left = valuePercents + '%';
        slider__progress.style.width = valuePercents + '%';
        slider__value.textContent = value;

        for(let elem of slider__steps) {
          elem.classList.remove('slider__step-active');
        }
        
        slider__steps[value].classList.add('slider__step-active');
        
      };


      function onPointerUp() {
        
        document.removeEventListener('pointerup', onPointerUp);
       
        let slider__thumb = document.querySelector('.slider__thumb');
        let slider = document.querySelector('.slider')
        slider.classList.remove('slider_dragging');
        
        let slider__steps = document.querySelectorAll('.slider__steps span');
        let slider__progress = document.querySelector('.slider__progress');
        let slider__value = document.querySelector('.slider__value');
        
        let segments = slider__steps.length - 1; 
               
        document.removeEventListener('pointermove', onPointerMove);

        let valuePercents = slider__value.textContent / segments * 100;
        slider__thumb.style.left = valuePercents + '%';
        slider__progress.style.width = valuePercents + '%';
        

        const myEventsliderChange = new CustomEvent('slider-change', {
          bubbles: true, 
          detail: +slider__value.textContent,
        });
        slider.dispatchEvent(myEventsliderChange);
        
      };

      function CountSliderProgress(clientX, slider, segments) {

        let left = clientX - slider.getBoundingClientRect().left; //получим расстояние в пикселях от начала слайдера до места клика
        let leftRelative = left / slider.offsetWidth; // cоотношение длины слайдера к точке куда щелкнули
        
        if (leftRelative < 0) {
          leftRelative = 0;
        }
        
        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let valuePercents = leftRelative * 100;
        
        let approximateValue = leftRelative * segments;
        let value = Math.round(approximateValue);

        return [value, valuePercents]
      };

    };

    thumb.ondragstart   = () => false;
    
    
    this.elem.addEventListener('click', (event) => {
      
      event.preventDefault(); 
      
      let slider = document.querySelector('.slider')
      let left = event.clientX - slider.getBoundingClientRect().left; //получим расстояние в пикселях от начала слайдера до места клика
      let leftRelative = left / slider.offsetWidth; // cоотношение длины слайдера к точке куда щелкнули
     
      let segments = this.steps - 1; // количество шагов в слайдере
      let approximateValue = leftRelative * segments;
      
      let value = Math.round(approximateValue);
      
      let valuePercents = value / segments * 100;
      
      let slider__thumb = document.querySelector('.slider__thumb');
      let slider__progress = document.querySelector('.slider__progress');
      let slider__value = document.querySelector('.slider__value');
      
      slider__thumb.style.left = valuePercents + '%';
      slider__progress.style.width = valuePercents + '%';
      slider__value.textContent = value;
      
      let slider__steps = document.querySelectorAll('.slider__steps span');
        
      for(let elem of slider__steps) {
        elem.classList.remove('slider__step-active');
      }
      
      slider__steps[value].classList.add('slider__step-active');
      
      this.sliderChange(event, value); 
      
    });

  }

  sliderChange(event, value = 0) {

    const myEventsliderChange = new CustomEvent('slider-change', {
      bubbles: true, 
      detail: +value,
    });
    
    event.target.dispatchEvent(myEventsliderChange);

  }
  
}
