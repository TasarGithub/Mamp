const togglePopUp = () => {
     
  const popUp = document.querySelector('.popup'),
        popUpContent = document.querySelector('.popup-content'),
  // кнопки запуска модальных окон
    popUpBtn = document.querySelectorAll('.popup-btn');
  let flyInterval,
    count = 0.01;
    popUpContent.style.opacity = 0;

  popUpBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      popUp.style.display = 'block';
      validation();
     flyInterval = requestAnimationFrame(flyAnimate);
    });
  });

  const closePopUp = () => {
    popUp.style.display = 'none';
    popUpContent.style.opacity = 0;
    count = 0.01;
    
    formClear(popUpContent);
    const tempDiv = popUpContent.querySelector('.status-message');
    if (!!tempDiv) {
      tempDiv.parentNode.removeChild(tempDiv);
    }
    cancelAnimationFrame(flyInterval);
  };

  // закрытие мод окна по клику мимо него практика
  popUp.addEventListener('click', (event) =>{
    let target = event.target;
    if (target.classList.contains('popup-close')){
      closePopUp();
    } else {
      target = target.closest('.popup-content');
      if (!target) {
        closePopUp();
      }
    }
  });   

  //anime

  let flyAnimate = () => {
    flyInterval = requestAnimationFrame(flyAnimate);
    count=count + 0.01;

    if (popUpContent.style.opacity <= 1) {
            popUpContent.style.opacity = count; 
        } else {
          cancelAnimationFrame(flyInterval);
        }
  }; 
};

export default togglePopUp;