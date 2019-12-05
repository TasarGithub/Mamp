const onlyNumber = () =>{
  const calcBlock =  document.querySelector('.calc-block');
    
    calcBlock.addEventListener('input', (event) =>{
      let target = event.target;
      target = target.closest('input');

      if (target) {
        let number = target.value;
        target.value = number.replace(/\D/g, '');
      }
    });
  
};

export default onlyNumber;