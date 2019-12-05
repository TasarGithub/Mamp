const slider = () => {

  const slide = document.querySelectorAll('.portfolio-item'),
    btn = document.querySelectorAll('.portfolio-btn'),
    
    slider = document.querySelector('.portfolio-content');
  let currentSlide = 0,
    interval = 0;

  // добавляем dots и dot

  // создание элемента ul
  const dotUl = document.createElement('ul');
  //вставляем ul элемент в верстку
  slider.appendChild(dotUl);
  // одвеваем оформление на новый элемент
  dotUl.classList.add('portfolio-dots');
  //создаем li dot и вставляем в верстку по кол-ву слайдов 
  for (let i = 0; i < slide.length; i++) {
    const dotLi = document.createElement('li');
    dotUl.appendChild(dotLi);
    dotLi.classList.add('dot');
    if ( i === 0) {
      dotLi.classList.add('dot-active');
    }
  }

  const dot = document.querySelectorAll('.dot');
  
  const countSlide = (n,sld) => {
 
    if (n === sld.length) {
      return 0;
    } else if (n < 0) {
      return sld.length-1;
    } else {
      return n;
    }
  };

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };
  
  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');
    
    currentSlide = countSlide(++currentSlide, slide);
    
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');
  };

  const startSlide = (time = 3000)=> {
     interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener('click', (event) => {
    event.preventDefault();
    let target =  event.target;

    if (target.matches('.portfolio-btn, .dot')){
      
      // убираем классы показа
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      // ловим клики по стрелкам
      if (target.matches('#arrow-right')){
        currentSlide++;
      } else if (target.matches('#arrow-left')){
        currentSlide--;
      // ловим клики по точкам
      } else if (target.matches('.dot')){
        dot.forEach((elem, index) => {
          if (elem === target){
            currentSlide = index;
          }
        });
      }

      //восстанавливаем классы показа
      currentSlide = countSlide(currentSlide, slide); //проверка на выход за пределы
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    }
  });
  slider.addEventListener('mouseover', (event) => {
    if (event.target.matches('.portfolio-btn, .dot')) {
      stopSlide();
    }
  });
  slider.addEventListener('mouseout', (event) => {
    if (event.target.matches('.portfolio-btn, .dot')) {
      startSlide(1500);
    }
  });

  startSlide(1500);

};


export default slider;