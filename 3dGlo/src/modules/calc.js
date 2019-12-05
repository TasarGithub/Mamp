const calc = (price = 100) => {

  const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcDay = document.querySelector('.calc-day'),
    calcCount = document.querySelector('.calc-count'),
    totalValue = document.getElementById('total');
  
  const countSum = () => {
 
    let total = 0,
      countValue = 1,
      dayValue = 1;
    const  typeValue = calcType.options[calcType.selectedIndex].value,
      squareValue = +calcSquare.value;

    //расчет по кол-ву помещений
    if (calcCount.value > 1){
      countValue += (calcCount.value - 1) / 10;
    }
    // срок исполнения
    if (calcDay.value < 5){
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = Math.floor(price * typeValue * squareValue * dayValue * countValue);
      let tempValue = +totalValue.textContent;
     
      let flyAmount = () => {

        const flyInterval = requestAnimationFrame(flyAmount);
        if ( tempValue < total) {
            tempValue += 200;
            totalValue.textContent = tempValue;
            if (Math.abs(tempValue - total) < 200) {
              cancelAnimationFrame(flyInterval);
              totalValue.textContent = total;
            }
        } else if ( tempValue > total){
            tempValue -= 200;
            totalValue.textContent = tempValue;
            if (Math.abs(tempValue - total) < 200) {
              cancelAnimationFrame(flyInterval);
              totalValue.textContent = total;
            }
        } 
      }; 
      flyAmount();
    } 
  };
  
  calcBlock.addEventListener('change', (event) => {
    
    const target = event.target;
    if (target.matches('select') || target.matches('input')) {
      countSum();
    }
  });

};


export default calc;