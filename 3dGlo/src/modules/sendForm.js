const sendForm = (formArgument) => {
  const popUp = document.querySelector('.popup'),
  popUpContent = document.querySelector('.popup-content'),
  form = document.querySelectorAll('.form123'),
  objMessage = {
    errorMessage: 'Что то не так ',
    loadMessage: 'Загрузка',
    succesMessage:  'Спасибо ! Скоро свяжемся с вами',
  },
  statusMessage =  document.createElement('div');
  let body = {};
  statusMessage.classList.add('status-message');
  statusMessage.style.cssText = 'font-size: 2rem; color: #fff;'; 
  statusMessage.textContent = objMessage.loadMessage;
  objMessage.div = statusMessage;


  //анимация для popup
  let count = 1;
  let flyAnimate = () => {

    const flyInterval = requestAnimationFrame(flyAnimate);
    count = count - 0.005;

    if (popUpContent.style.opacity >= 0) {
      popUpContent.style.opacity = count; 
      } else {
        popUp.style.display = 'none';
        const tempDiv = popUpContent.querySelector('.status-message');
        if (!!tempDiv) {
          tempDiv.parentNode.removeChild(tempDiv);
        }
        cancelAnimationFrame(flyInterval);
        count = 0;
      }
  };
  //отправка данных на сервер
  const postData = (body) => {
    
    return  fetch('./server.php',{
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });
  };

  // навешиваем оброботки события на submit
  form.forEach(item => { 
    item.addEventListener('submit', (event) => {
      let flag = 0;
      const formData =  new FormData(item);
      // debugger;
      formData.forEach((val, key) => {
        
        if ((val.trim() === '') && (key.indexOf('mess') === -1)) {
          flag = 1;
        }
        body[key] = val;
      });
      
      event.preventDefault();

      if (flag) return; // незаполненная часть формы -уходим
      item.appendChild(objMessage.div);
      // alert('postdata next');
      postData(body)
      .then((response) => {
        if (response.status !== 200){
          throw new  Error('Status network not 200');
        }
        item.querySelectorAll('input').forEach(item => item.value = '');
        objMessage.div.textContent = objMessage.succesMessage;
      })
      .then(() => {
        if (popUp.style.display === 'block'){
          flyAnimate();
        } else {
        const tempDiv = item.querySelector('.status-message');
        setTimeout(() => { 
          if (!!tempDiv) {
          tempDiv.parentNode.removeChild(tempDiv);}
          },4000);
        }
      })
      .catch((error) => {
        objMessage.div.textContent = objMessage.errorMessage;
        console.log('errorMessage: ', objMessage.errorMessage);
        console.error(error);
      });
    });
  });
};

export default sendForm;