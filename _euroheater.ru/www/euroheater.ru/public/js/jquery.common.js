// jquery ready
$(document).ready(function() {

    var pathname = window.location.pathname;

    // ������������� ������� jquery owl-carousel
    var owl1 = $('.owl-carousel_b_photos');
    owl1.owlCarousel({
        margin: 10,
        loop: true,
        nav: true,
        dots: false,
        responsive: {
          300: { items: 1 },
          770: { items: 2 },
          1000: { items: 3 }
        }
    });
    var owl2 = $('.owl-carousel_b_reviews');
    owl2.owlCarousel({
        margin: 10,
        loop: true,
        nav: true,
        dots: false,
        responsive: {
          300: { items: 1 },
          770: { items: 3 },
          1000: { items: 5 }
        }
    });
    var owl3 = $('.owl-carousel_b_reviews_txt');
    owl3.owlCarousel({
        margin: 10,
        loop: true,
        nav: false,
        dots: true,
        responsive: {
          300: { items: 1 },
          770: { items: 1 },
          1000: { items: 1 }
        }
    });
    var owl4 = $('.owl-carousel_b_clients');
    owl4.owlCarousel({
        margin: 10,
        loop: true,
        nav: true,
        dots: false,
        responsive: {
          300: { items: 1 },
          770: { items: 3 },
          1000: { items: 5 }
        }
    });

    // ������ jquery.fancybox
    $(".fancybox").fancybox({
        helpers : {
            title: {
                type: 'inside',
                position: 'bottom'
            }
        }
    });
      
    // ������������� ���� ��� ��������� ������
$('.switch_menu').click(function(){
        $("body").toggleClass("menu_active");
});

    // ��������� ������ �� ���� �� ���������
$('.read_more').on('click', function() {
$(this).closest('div').find('.hidden-text').fadeIn();
$(this).remove();
return false;
});

// ���������� ���������
/*
$('.slogan').hover(function(){
jQuery(this).find('.hover-tip').fadeToggle();
});      
*/

    // ��������� �����
    if (!navigator.userAgent.match(/(iPod|iPhone)/)) {
        $('body').removeClass('no_float');
        if($('.header').length > 0) {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 10) $('.header').addClass("active");
                else $('.header').removeClass("active");
            });
        }
     }
     if (typeof enable_floating_hat === "undefined" || enable_floating_hat == 0) $('body').addClass('no_float');
     // /��������� �����

    // ��� �������� ���������� ���� bootstrap, ������� ��� ���������
    $('.modal').on('hidden.bs.modal', function () {
        $(".qtip").remove();
    });

    // ������ ��������. ���� �� + ��� -
    $('.customer-feedback-vote').click(function() {
        var action = $(this).data('action'); // console.log(action);
        var id = $(this).parent().data('feedback-id'); // console.log(id);
        var that = this;
        if (id && action) {
            $.post('/public/js/jquery.ajax.feedback.php', { 'id': id, 'action': action }, function(data) {
                if (data) {
                    try {
                        var result = JSON.parse(data);
                        if (result['result'] == 'already_voted') showMessageLeft(that, '�� ��� ���������� �� ���� �����.');
                        else {
                            if (result['votes_plus']) $('.feedback-votes-plus-' + result['id']).html('+' + result['votes_plus']);
                            if (result['votes_minus']) $('.feedback-votes-minus-' + result['id']).html('-' + result['votes_minus']);
                        }
                    }
                    catch(err) { console.log(err); }
                    // �������� ��� ���������
                    $(".qtip").remove();
                }
            });
        }
        return false;
    }); // /������ ��������. ���� �� + ��� -

    if (pathname == '/raschet/') $('#calculation_form_name').focus();

}); // jquery ready

// ����������� ���������� ������������ ������� AJAX
function setAjaxStatus(resultElementID) {
    $(document).ajaxSend(function () {
    });
    $(document).ajaxStart(function () {
        $(resultElementID).html('<img src="/public/images/preloader_25x25.gif" border="0" />');
    });
    $(document).ajaxSuccess(function () {
        $(resultElementID).html('');
    });
    $(document).ajaxStop(function () {
        $(resultElementID).html('');
    });
    $(document).ajaxComplete(function () {
        $(resultElementID).html('');
    });
    $(document).ajaxError(function () {
        $(resultElementID).html('������ ��� ��������.');
    });
}
// �������� ��������� JQUERY.QTIP
function showMessage(element, message) {
    if (!element)return;
    if (!message)return;
    $(element).qtip({
        content: message,
        show: {solo: true, ready: true},
        style: {classes: 'qtip-text-hint'},
        position: {my: 'left center', at: 'right center', target: $(element)}
    });
}
// �������� ��������� JQUERY.QTIP �����
function showMessageLeft(element, message) {
    if (!element)return;
    if (!message)return;
    $(element).qtip({
        content: message,
        show: {solo: true, ready: true},
        style: {classes: 'qtip-text-hint'},
        position: {my: 'right center', at: 'left center', target: $(element)}
    });
}
// �������� ��������� JQUERY.QTIP ������
function showMessageTop(element, message) {
    if (!element)return;
    if (!message)return;
    $(element).qtip({
        content: message,
        show: {solo: true, ready: true},
        style: {classes: 'qtip-text-hint'},
        position: {my: 'bottom center', at: 'top center', target: $(element)}
    });
}
// ���������, �������� �� ������ 3 ����� ������ �������
function hasDifferentLetters(var_name) {
    if (typeof var_name === "undefined")return;
    if (var_name[0] != var_name[1] || var_name[0] != var_name[2] || var_name[1] != var_name[2])return 1;
}
// ������������ ������� ����� � ����������
function convertRuLettersToEn(text) {
    if (!text || typeof text === "undefined")return '';
    text = text.replace(/�/g, 'a').replace(/�/g, 'A').replace(/�/g, 'b').replace(/�/g, 'B').replace(/�/g, 'v').replace(/�/g, 'V').replace(/�/g, 'g').replace(/�/g, 'G').replace(/�/g, 'd').replace(/�/g, 'D').replace(/�/g, 'e').replace(/�/g, 'E').replace(/�/g, 'jo').replace(/�/g, 'Jo').replace(/�/g, 'zh').replace(/�/g, 'Zh').replace(/�/g, 'z').replace(/�/g, 'Z').replace(/�/g, 'i').replace(/�/g, 'I').replace(/�/g, 'j').replace(/�/g, 'J').replace(/�/g, 'k').replace(/�/g, 'K').replace(/�/g, 'l').replace(/�/g, 'L').replace(/�/g, 'm').replace(/�/g, 'M').replace(/�/g, 'n').replace(/�/g, 'N').replace(/�/g, 'o').replace(/�/g, 'O').replace(/�/g, 'p').replace(/�/g, 'P').replace(/�/g, 'r').replace(/�/g, 'R').replace(/�/g, 's').replace(/�/g, 'S').replace(/�/g, 't').replace(/�/g, 'T').replace(/�/g, 'u').replace(/�/g, 'U').replace(/�/g, 'f').replace(/�/g, 'F').replace(/�/g, 'h').replace(/�/g, 'H').replace(/�/g, 'c').replace(/�/g, 'C').replace(/�/g, 'ch').replace(/�/g, 'Ch').replace(/�/g, 'sh').replace(/�/g, 'Sh').replace(/�/g, 'sh').replace(/�/g, 'Sh').replace(/�/g, '').replace(/�/g, '').replace(/�/g, 'y').replace(/�/g, 'Y').replace(/�/g, '').replace(/�/g, '').replace(/�/g, 'e').replace(/�/g, 'E').replace(/�/g, 'ju').replace(/�/g, 'Ju').replace(/�/g, 'ya').replace(/�/g, 'Ya');
    return text;
}
// ���������, ������������� �� EMAIL ������� xxx@yyy.xx
function isEmailValid(email) {
    if (typeof email === "undefined") return;
    if(/(.+)@(.+){2,}\.(.+){2,}/.test(email)) return 1;
    else return;
}
// �������� ��� ���������� ���� GOOGLE ANALYTICS
function ga(a, b, c, d, e) {}

// ������� ����� �� /_templates/functions.js
function nextPhoto(go) {
    var holder = $("photoholder");
    var src = { 0: '' };
    src = holder.src.split("/");
    var avail = $("photoavail");
    avail = avail.innerHTML;
    var photos = { 0: '' };
    photos = avail.toString().split("###");
    var newname = -1;
    if (photos.length > 1) {
        for (var i = 0; i < photos.length; i=i+1) {
            if (photos[i] == src[ src.length - 1 ]) {
                if (go > 0) {
                    if (i == (photos.length - 1)) {
                        newname = photos[0];
                    } else {
                        newname = photos[i+1];
                    }
                } else {
                    if (i == 0) {
                        newname = photos[ photos.length - 1 ];
                    } else {
                        newname = photos[i-1];
                    }
                }
            }
        }
        holder.src = '/_images/photos/' + newname;
    }
}

// ����������, ���������� �� GET-����������
function isGetVarExists(var_name){
    if (typeof var_name === "undefined") return;

    var url = location.search; // console.log(url);
    url = url.replace('#', '');
    url = url.replace('?', ''); // console.log(url);

    if (url == var_name) return 1; // example: /?calc

    var vars = url.split("&");  // console.log(vars); // example: /?a=1&calc
    for (var i=0; i < vars.length; i++){
        if (vars[i].indexOf('=') != -1) var vars2 = vars[i].split("=");
        else var vars2 = vars[i];
        if (vars2[0] == var_name || vars2 == var_name) return vars2[1]; // content of variable
    }
    return;
}

// ����������, �������� �� ������ ������
function isInteger(s){
    if (typeof s !== "undefined"){
        return (s.toString().search(/^-?[0-9]+$/) == 0);
    }
}