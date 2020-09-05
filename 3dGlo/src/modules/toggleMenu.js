const toggleMenu = () =>{
  const btnMenu =  document.querySelector('.menu'),
    menu =  document.querySelector('menu'),
    menuLi = menu.querySelectorAll('ul>li'),
    closeBtn = document.querySelector('.close-btn'),
    
    //фция закрытие/открытие меню 
    handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };
    
    // обработка клика на открытие меню
   btnMenu.addEventListener('click', (event) => {
    let target =  event.target;
     handlerMenu();
   });

   //обработка кликов на закрытие по closeBtn и элементам меню
   menu.addEventListener('click', (event) => {
    let target =  event.target;
    
     if (target === closeBtn){
       handlerMenu();
      } else if (target.href !== undefined) {
        handlerMenu();
      } else {
        menuLi.forEach((elem) => { 
        if (target === elem){
          handlerMenu();
       } 
      });
    }
   });

};
export default toggleMenu;