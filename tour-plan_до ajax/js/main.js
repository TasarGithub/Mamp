// document.addEventListener("DOMContentLoaded", function(event){
//   // console.log ("klkl");
//   const modal = document.querySelector('.modal');
//   const modalBtn = document.querySelectorAll('[data-toggle=modal]');
//   const switchModal = () =>{
//     modal.classList.toggle('modal--visible');
//   };
//   const closeBtn = document.querySelector('.modal__close');

//   modalBtn.forEach(element => {
//     element.addEventListener('click', switchModal);
//   });
//   console.log (modal);
//   closeBtn.addEventListener('click', switchModal);
// });

$(document).ready(function () {

  var modal =$('.modal'),
  modalThanks =$('.modal-thanks'),
  formModal =$('#modal__form'),
  formControl =$('.control__form'),
  formFooter =$('.footer__form'),
  btnControl =$('.control__button'),
  btnFooter =$('.footer__button'),
  modalBtn = $('[data-toggle="modal"]'),
  closeBtnThanks = $('.modal-thanks__close'),
  closeBtn = $('.modal__close');


  var modalAll = document.querySelectorAll('[data-close="modal"]'),
    modaljs = document.querySelector('.modal');






  //Close modal windows
  $('[data-close="modal"]').each(function(index, item){
    //console.log('item: ', item);

    $(item).click(function(event) {
      var target = event.target;
  
      //console.log('target', target); 
     
          if  ($(target).hasClass("modal--visible")) {
            $(target).removeClass("modal--visible");
          }
    });
    $(document).keydown(function(event) {
      if (event.code === 'Escape' && ( $(item).hasClass("modal--visible"))) {
        $(item).removeClass("modal--visible");
      }
    });

  });


  modalBtn.on('click', function () {
    // if ($('div').is('#glo_vksubscribe')) {
    //   $('#glo_vksubscribe').remove();
    //   $('.modal__title').text('Оставьте заявку и наш менеджер свяжется с вами ');
    // }
    $('#modal__form').css('display',"flex");
    $('.modal__title').css('display',"block");
    $('.modal__thanks-block').css('display',"none");
    $('.modal__form').css('opacity',1);
    $('.modal__title').css('opacity',1); 

    modal.toggleClass('modal--visible');
  });

  closeBtn.on('click', function() {
    modal.removeClass('modal--visible');
  });

  
  closeBtnThanks.on('click', function() {
    modalThanks.removeClass('modal--visible');
  });



  let flyInterval,
    count = 1;


  //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper-container.swiper-container--hotel-body', {
    // Optional parameters
    // direction: 'vertical',
    loop: true,
    // // pagination: {
    // //   el: '.swiper-pagination',
    // //   type: 'bullets',
    // //   clickable: true,
		// // },
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},

    navigation: {
      nextEl: '.swiper-button--next',
      prevEl: '.swiper-button--prev',
		}
		
  });
  var next = $('.swiper-button--next');
  var prev = $('.swiper-button--prev');
  // //var bullets = $('.swiper-pagination');
  
  // next.css('left',prev.width() + 6 + bullets.width() + 32);
	
	// // bullets.css('left',prev.width() + 21);

  //initialize swiper when document ready
  var mySwiperReveiwes = new Swiper ('.swiper-container.swiper-container--reviews', {
    // Optional parameters
    // direction: 'vertical',
    loop: true,
    // // pagination: {
    // //   el: '.swiper-pagination',
    // //   type: 'bullets',
    // //   clickable: true,
		// // },
		// keyboard: {
		// 	//enabled: true,
		// 	// onlyInViewport: true,
		// },

		navigation: {
			nextEl: '.swiper-button--reviews-next',
			prevEl: '.swiper-button--reviews-prev',
		},
  });



  //anime
  new WOW().init();


  // Валидация форм
  //, .footer__form, .control__form

  //Замена встроенного метода проверки емейла на лучший , с проверкой точки
  // $.validator.methods.email = function( value, element ) {
  //   return this.optional( element ) || /[A-z0-9._]+@[A-z0-9.-]+\.[a-z]+/.test( value );
  // };

  // $('#modal__form').validate({
  //   errorClass: "invalid",
  //   errorElement: "div",
  //   rules: {
  //     // строчное правило simple rule, converted to {required:true}
  //     userName: {
  //       required: true,
  //       minlength: 2,
  //       maxlength: 15
  //     },
  //     userPhone: {
  //       required: true,
  //       minlength: 17
  //     },
  //     //правило - объект
  //     userEmail: {
  //       required: true,
  //       email: true
  //     },

  //     modalPolicyCheckbox: {
  //       required: true
  //     }
  //   },
  //   //сообщения
  //   messages: {
  //     userName: {
  //       required: "Заполните поле",
  //       minlength: "Имя не короче двух букв",
  //       maxlength: "Имя не длинее 15ти букв"
  //     },
  //     userPhone: {
  //       required: "Заполните поле",
  //       minlength: "Введите корректный телефон",
  //     },      
  //     userEmail: {
  //       required: "Заполните поле",
  //       email: "Введите корректный email"
  //     },
  //     modalPolicyCheckbox: {
  //       required: "Заполните поле"
  //     }
  //   },

  //   submitHandler: function(form) {
  //     $.ajax({
  //       type: "POST",
  //       url: "send.php",
  //       data: $(form).serialize(),
  //       success: function (response) {
  //         //console.log('response: ', response);

  //         //console.log($(form).serialize());
  //         $('form')[2].reset();
  //         modal.removeClass('modal--visible');
  //         modalThanks.toggleClass('modal--visible');
  //         ym(62095768,'reachGoal','sendForm');
  //       },
  //       erorr: function(response) {
  //         console.error('Ошибка запроса' + response);
  //       }
        
  //     });
  //   }
  // });

  // $('.control__form').validate({
  //   errorClass: "invalid",
  //   errorElement: "div",
  //   rules: {
  //     // строчное правило simple rule, converted to {required:true}
  //     userNameControl: {
  //       required: true,
  //       minlength: 2,
  //       maxlength: 15
  //     },
  //     userPhoneControl: {
  //       required: true,
  //       minlength: 17
  //     },
  //     //правило - объект
  //     userEmailControl: {
  //       required: true,
  //       email: true
  //     },
  //     controlPolicyCheckbox: {
  //       required: true
  //     }
  //   },
  //   //сообщения
  //   messages: {
  //     userNameControl: {
  //       required: "Заполните поле",
  //       minlength: "Имя не короче двух букв",
  //       maxlength: "Имя не длинее 15ти букв"
  //     },
  //     userPhoneControl: {
  //       required: "Заполните поле",
  //       minlength: "Исправьте телефон",
  //     },      
  //     userEmailControl: {
  //       required: "Заполните поле",
  //       email: "Исправьте email"
  //     },
  //     controlPolicyCheckbox: {
  //       required: "Заполните поле"
  //     }
  //   },
  //   submitHandler: function(form) {
  //     $.ajax({
  //       type: "POST",
  //       url: "send.php",
  //       data: $(form).serialize(),
  //       success: function (response) {
  //         //console.log('$(form).serialize()');
  //         //console.log($(form).serialize());
  //         //console.log('Ajax сработал. Ответ сервера: ' + response);
  //         modalThanks.toggleClass('modal--visible');
  //         //$('.control__form').reset(); не работает, надо именно форма нужна
  //         $('form')[0].reset();
  //         ym(62095768,'reachGoal','sendForm');
  //       }
  //     });
  //   }

  // });

  // $('.metering__form').validate({
  //   errorClass: "invalid",
  //   errorElement: "div",
  //   rules: {
  //     // строчное правило simple rule, converted to {required:true}
  //     userNameMetering: {
  //       required: true,
  //       minlength: 2,
  //       maxlength: 15
  //     },
  //     userPhoneMetering: {
  //       required: true,
  //       minlength: 17
  //     },
  //     //правило - объект
  //     userEmailMetering: {
  //       required: true,
  //       email: true
  //     },
  //     meteringPolicyCheckbox: {
  //       required: true
  //     }
  //   },
  //   //сообщения
  //   messages: {
  //     userNameMetering: {
  //       required: "Заполните поле",
  //       minlength: "Имя не короче двух букв",
  //       maxlength: "Имя не длинее 15ти букв"
  //     },
  //     userPhoneMetering: {
  //       required: "Заполните поле",
  //       minlength: "Исправьте телефон",
  //     },      
  //     userEmailMetering: {
  //       required: "Заполните поле",
  //       email: "Исправьте email"
  //     },
  //     meteringPolicyCheckbox: {
  //       required: "Заполните поле"
  //     }
  //   },

  //   submitHandler: function(form) {
  //     $.ajax({
  //       type: "POST",
  //       url: "send.php",
  //       data: $(form).serialize(),
  //       success: function (response) {
  //         //console.log('response: ', response);

  //         //$('.modal__form').hide(); //css('display',"none");
  //         //console.log($(form).serialize());
  //         $('form')[10].reset();
  //         //$('.metering__form').reset();
  //         modal.removeClass('modal--visible');
  //         modalThanks.toggleClass('modal--visible');
  //         ym(62095768,'reachGoal','sendForm');
  //       },
  //       erorr: function(response) {
  //         console.error('Ошибка запроса' + response);
  //       }
  //     });
  //   }
    
  // });

  // $('.footer__form').validate({
  //     errorClass: "invalid",
  //     errorElement: "div",
  //     rules: {
  //       // строчное правило simple rule, converted to {required:true}
  //       userNameFooter: {
  //         required: true,
  //         minlength: 2,
  //         maxlength: 15
  //       },
  //       userPhoneFooter: {
  //         required: true,
  //         minlength: 17
  //       },
  //       //правило - объект
  //       footerPolicyCheckbox: {
  //         required: true
  //       }
  //     },
  //     //сообщения
  //     messages: {
  //       userNameFooter: {
  //         required: "Заполните поле",
  //         minlength: "Имя не короче двух букв",
  //         maxlength: "Имя не длинее 15ти букв"
  //       },
  //       userPhoneFooter: {
  //         required: "Заполните поле",
  //         minlength: "Введите корректный телефон",
  //       },      
  //       footerPolicyCheckbox: {
  //         required: "Заполните поле"
  //       }
  //     },

  //     submitHandler: function(form) {
  //       $.ajax({
  //         type: "POST",
  //         url: "send.php",
  //         data: $(form).serialize(),
  //         success: function (response) {
  //           //console.log($(form).serialize());
  //           //console.log('Ajax сработал. Ответ сервера: ' + response);
  //           $('form')[1].reset();
  //           //$('.footer__form').reset();
  //           // // modal.removeClass('modal--visible');
  //           modalThanks.toggleClass('modal--visible');
  //           ym(62095768,'reachGoal','sendForm');
  //         }
  //       });
  //     }

  // });




  //$('.phone').mask('0000-0000');
  // маска для телефона
  //$('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "+7 (___) ___-__-__"});
  $('[type=tel]').mask('+7(000) 000-00-00');//, {placeholder: "Ваш номер телефона:"});
  
 // $('#user-phone-metering').mask('+7(000) 000-00-00', {placeholder: "Ваш телефон:"});
  
  // Яндекс карта с меткой с собственным изображением
    //перенесена в html
  ///

  //подключение YouTube
  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady(){
    player = new YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: 'TvVYeLvujLk',
      events: {
        'onReady': videoPlay,
      }
    });
  });
  function videoPlay(event) {
    event.target.playVideo();
  }

// <iframe width="560" height="315" src="https://www.youtube.com/embed/TvVYeLvujLk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


//  function topArrow(){
//     const totop = document.querySelector('.totop'),
//       hero = document.querySelector('.hero');
 
//     totop.style.opacity = 0;
     
//     const base = hero.offsetTop;
    

//      window.addEventListener('scroll', function(){    
//       if (window.pageYOffset > base ) {
//         totop.style.opacity = 1;
//       } else {
//         totop.style.opacity = 0;
//       }
//     });
//   }
  
//   topArrow();

//   $("#totop").click(function(){
//     //Необходимо прокрутить в начало страницы
//     var curPos=$(document).scrollTop();
//     var scrollTime=curPos/1.73;
//     $("body,html").animate({"scrollTop":0},scrollTime);
//     });




  //плавная прокрутка

  $('a[href^="#"]').on('click',function (e) {
    e.preventDefault();
    if ( $(this).attr("class").indexOf("totop") < 0) {
      var id = $(this).attr('href');
      var    top = $(id).offset().top;
      if ( $(this).attr("class").indexOf("footer__contacts") > 0){
      $('body,html').animate({
            scrollTop: top - 400
        }, 3000);
      } else {
        $('body,html').animate({
          scrollTop: top  }, 3000);
      }
    }
  });

	// $(window).resize(function (e) {
	// 	if ($(window).width() <= 768) {
	// 		var widthSwiperCont = $("#map").width(),
	// 		widthSwiperContFixed;
	// 		widthSwiperContFixed = widthSwiperCont.toFixed();
	// 		$('.swiper-container').css("width", widthSwiperContFixed);
	// 		console.log('$(swiper-container).width()', widthSwiperCont);
	// 		console.log('$(swiper-container).width().toFixed(): ', widthSwiperContFixed);
		
	// 	}


	// });
	
	// $('.parallax-window').parallax({imageSrc: '../img/bg-subscribe.jpg'});
	// Бургер клик
	$('.navbar__burger').click(function (e) {
		// $('.user, .form__search').toggleClass('mobile-block--visible');
		$('.navbar__bottom').toggleClass('navbar__bottom--mobile-menu');
		$('.navbar__burger').toggleClass('active');
		$('body').toggleClass('body__lock');
	});


});

