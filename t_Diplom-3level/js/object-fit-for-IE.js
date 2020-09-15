// .img{
// 	bacground-position: center;
// 	bacground-size: cover;
// 	background-repeat: no-repeat;
// 	position: relative;
// }

// .img img{
// 	width: 0;
// 	height: 0;
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	visibility: hidden;
// }

// JS
function ibg(){
		let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage='url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
}
ibg();

// JQUERY
function ibgJq() {
	$.each($ ('.ibg'), function (index, val){
			if($(this).find('img').length > 0) {
				$(this).css('bacground-image', 'url("'+$(this).find('img').attr('src')+'")');
			}
		});
	}
ibgJq();
