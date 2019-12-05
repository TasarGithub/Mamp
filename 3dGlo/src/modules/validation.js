const validation = () => {
  const inputName =  document.querySelectorAll('.form-name'),
        inputEmail =  document.querySelectorAll('.form-email'),
        inputMessage =  document.querySelectorAll('.mess'), 
        inputTelephone = document.querySelectorAll('.form-phone');
      

  inputName.forEach(item => {
    item.addEventListener('input',() => {
      //debugger;
      item.value = item.value.replace(/[^а-яё\s]/gi, '');
    });
  });     
  
  inputEmail.forEach(item => {
    item.addEventListener('input',() => {
   //debugger;
      item.value = item.value.replace(/[^a-z@-_\d]/gi, '');
    });
  });   
  inputMessage.forEach(item => {
    item.addEventListener('input',() => {
      //debugger;
      item.value = item.value.replace(/[^а-яё\s]/gi, '');
    });
  });     
  inputTelephone.forEach(item => {
    item.addEventListener('input',() => {
      //debugger;
      item.value = item.value.replace(/\D/g, '');
    });
  });
};


export default validation;