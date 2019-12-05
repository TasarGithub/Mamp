'use strict';


import validation from './modules/validation';
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import toggleImg from './modules/toggleImg';
import onlyNumber from './modules/onlyNumber';
import slider from './modules/slider';
import calc from './modules/calc';
import sendForm from './modules/sendForm';


validation();

// таймер

countTimer('10 december 2019');

//menu
toggleMenu();

//popup

togglePopUp();

// tabs
tabs();

//img mouse toggle
toggleImg();

//calc only number input
onlyNumber();

slider();


calc(100);


//send-ajax STAFF:
 formSendAll 
 formClear 
 postData  
 creatDivMessage
// send-ajax-form1 and form2

sendForm('form1');

sendForm('form2');

// send-ajax-popUpform

sendFormPopUp(); 
