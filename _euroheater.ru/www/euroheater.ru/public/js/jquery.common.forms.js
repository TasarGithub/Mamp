// ������� jquery ��� ��������� ����
$(document).ready(function() { // jquery ready
    // ������������� ����� � ��������� ���� "�������� ������"
    $('#callback_modal').on('shown.bs.modal', function () { $('#callback_form_name').focus(); });
    // ������������� ����� � ��������� ���� "������ ��������� ������"
    $('#calc_modal').on('shown.bs.modal', function () { $('#calc_form_name').focus(); });
    // ������������� ����� � ��������� ���� "������ �� ������"
    $('#rent_modal').on('shown.bs.modal', function () { $('#rent_form_name').focus(); });
    // ������������� ����� � ��������� ���� "�������� �����"
    $('#review_modal').on('shown.bs.modal', function () { $('#feedback_form_name').focus(); });
    // ������������� ����� � ��������� ���� "�������� �����"
    $('#full_price_modal').on('shown.bs.modal', function () { $('#full_price_modal_name').focus(); });

    // ****************************************************************************************

    // ��������� ���� "�������� ������". ���������� ������� ������� Enter
    $('#callback_form_name, #callback_form_phone').keypress(function(e) {
        if (e.which == 13) { $('#callback_form_submit_button').click(); return false; }
    });

    // ��������� ���� "�������� ������". �������������
    $('#callback_form_submit_button').click(function() {
        // setting container for ajax preloader
        setAjaxStatus('#callback_form_ajax_preloader.modal_ajax_preloader');

        var name = $.trim($('#callback_form_name').val());
        if (!name || name.length < 3 || !hasDifferentLetters(name)) {
            showMessage('#callback_form_name', '����������, ������� ���������� ���.')
            $('#callback_form_name').focus();
            return false;
        }

        var phone = $.trim($('#callback_form_phone').val());
        if (!phone || (phone.match(/\d/g) ? phone.match(/\d/g).length : 0) < 10) {
            showMessage('#callback_form_phone', '����������, ������� ���� ������� � �����.<br />��������: (495) 134-23-53.');
            $('#callback_form_phone').focus();
            return false;
        }

        if (name && phone) {
            $.post('/public/js/jquery.ajax.callback.php', { 'name': name, 'name_en': convertRuLettersToEn(name), 'phone': phone, 'phone_en': convertRuLettersToEn(phone), 'url': window.location.href }, function(data) {
                if (data) {
                    $('#callback_modal #myModalLabel').html('���� ������ ����������!');
                    $('#callback_modal .modal-footer').html('');
                    $('#callback_modal .modal-body').html(data);
                    // ���� ��� �������
                    yaCounter22280926.reachGoal('callback-data');
                }
            });
        }
    }); // /��������� ���� "�������� ������". �������������

    // ****************************************************************************************

    // ��������� ���� "������ ��������� ������". ���������� ������� ������� Enter
    $('#calc_form_name, #calc_form_phone').keypress(function(e) {
        if (e.which == 13) { $('#calc_form_submit_button').click(); return false; }
    });

    // ��������� ���� "������ ��������� ������". �������������
    $('#calc_form_submit_button').click(function() {
        // setting container for ajax preloader
        setAjaxStatus('#calc_form_ajax_preloader');

        var name = $.trim($('#calc_form_name').val());
        if (!name || name.length < 3 || !hasDifferentLetters(name)) {
            showMessage('#calc_form_name', '����������, ������� ���������� ���.')
            $('#calc_form_name').focus();
            return false;
        }

        var phone = $.trim($('#calc_form_phone').val());
        if (!phone || (phone.match(/\d/g) ? phone.match(/\d/g).length : 0) < 10) {
            showMessage('#calc_form_phone', '����������, ������� ���� ������� � �����.<br />��������: (495) 134-23-53.');
            $('#calc_form_phone').focus();
            return false;
        }

        if (name && phone) {
            $.post('/public/js/jquery.ajax.calculate.cost-of-rent.php', { 'name': name, 'name_en': convertRuLettersToEn(name), 'phone': phone, 'phone_en': convertRuLettersToEn(phone), 'url': window.location.href }, function(data) {
                if (data) {
                    $('#calc_modal #myModalLabel').html('���� ������ ����������!');
                    $('#calc_modal .modal-footer').html('');
                    $('#calc_modal .modal-body').html(data);
                    // ���� ��� �������
                     yaCounter22280926.reachGoal('raschet-data');
                }
            });
        }
    }); // /��������� ���� "������ ��������� ������". �������������

    // ****************************************************************************************

    // ����� "������ ����������� �� ������ ���" (/raschet/). ���������� ������� ������� Enter
    $('#calculation_form_name, #calculation_form_phone').keypress(function(e) {
        if (e.which == 13) { $('#calculation_form_submit_button').click(); return false; }
    });

    // ����� "������ ����������� �� ������ ���" (/raschet/). �������������
    $('#calculation_form_submit_button').click(function() {
        // setting container for ajax preloader
        setAjaxStatus('#calculation_form_ajax_preloader');

        var name = $.trim($('#calculation_form_name').val());
        if (!name || name.length < 3 || !hasDifferentLetters(name)) {
            showMessage('#calculation_form_name', '����������, ������� ���������� ���.')
            $('#calculation_form_name').focus();
            return false;
        }

        var phone = $.trim($('#calculation_form_phone').val());
        if (!phone || (phone.match(/\d/g) ? phone.match(/\d/g).length : 0) < 10) {
            showMessage('#calculation_form_phone', '����������, ������� ���� ������� � �����.<br />��������: (495) 134-23-53.');
            $('#calculation_form_phone').focus();
            return false;
        }

        var power = $.trim($('#calculation_form_power option:selected').text());
        var duration = $.trim($('#calculation_form_duration option:selected').text());

        if (name && phone) {
            $.post('/public/js/jquery.ajax.calculation.php', { 'name': name, 'name_en': convertRuLettersToEn(name), 'phone': phone, 'phone_en': convertRuLettersToEn(phone), 'power': power, 'power_en': convertRuLettersToEn(power), 'duration': duration, 'duration_en': convertRuLettersToEn(duration), 'url': window.location.href }, function(data) {
                if (data) {
                    $('#h1').html('���� ������ ����������!');
                    $('#calculation_form').html(data);
                    // ���� ��� �������
                    // yaCounter34243715.reachGoal('calc');
                }
            });
        }
    }); // /����� "������ ����������� �� ������ ���" (/raschet/). �������������

    // ****************************************************************************************

    // ��������� ���� "������ �� ������". ���������� ������� ������� Enter
    $('#rent_form_name, #rent_form_phone').keypress(function(e) {
        if (e.which == 13) { $('#rent_form_submit_button').click(); return false; }
    });

    // ��������� ���� "������ �� ������". �������������
    $('#rent_form_submit_button').click(function() {
        // setting container for ajax preloader
        setAjaxStatus('#rent_form_ajax_preloader');

        var name = $.trim($('#rent_form_name').val());
        if (!name || name.length < 3 || !hasDifferentLetters(name)) {
            showMessage('#rent_form_name', '����������, ������� ���������� ���.')
            $('#rent_form_name').focus();
            return false;
        }

        var phone = $.trim($('#rent_form_phone').val());
        if (!phone || (phone.match(/\d/g) ? phone.match(/\d/g).length : 0) < 10) {
            showMessage('#rent_form_phone', '����������, ������� ���� ������� � �����.<br />��������: (495) 134-23-53.');
            $('#rent_form_phone').focus();
            return false;
        }

        if (name && phone) {
            $.post('/public/js/jquery.ajax.order.rent.php', { 'name': name, 'name_en': convertRuLettersToEn(name), 'phone': phone, 'phone_en': convertRuLettersToEn(phone), 'url': window.location.href }, function(data) {
                if (data) {
                    $('#rent_modal #myModalLabel').html('���� ������ ����������!');
                    $('#rent_modal .modal-footer').html('');
                    $('#rent_modal .modal-body').html(data);
                    // ���� ��� �������
                    yaCounter22280926.reachGoal('request-data');
                }
            });
        }
    }); // /��������� ���� "�������� ������". �������������

    // ****************************************************************************************

    // ��������� ���� "�������� �����". ���������� ������� ������� Enter
    $('#feedback_form_name, #feedback_form_activity').keypress(function(e) {
        if (e.which == 13) { $('#feedback_form_submit_button').click(); return false; }
    });

    // ��������� ���� "�������� �����". �������������
    $('#feedback_form_submit_button').click(function() {
        // setting container for ajax preloader
        setAjaxStatus('#feedback_form_ajax_preloader');

        var name = $.trim($('#feedback_form_name').val());
        if (!name || name.length < 3 || !hasDifferentLetters(name)) {
            showMessage('#feedback_form_name', '����������, ������� ���������� ���.')
            $('#feedback_form_name').focus();
            return false;
        }

        var activity = $.trim($('#feedback_form_activity').val());
        if (!activity) {
            showMessage('#feedback_form_activity', '����������, ������� ����� ������������.')
            $('#feedback_form_activity').focus();
            return false;
        }

        var text = $.trim($('#feedback_form_text').val());
        if (!text) {
            showMessage('#feedback_form_text', '����������, ������� ��� �����.')
            $('#feedback_form_text').focus();
            return false;
        }

        if (name && activity && text) {
            $.post('/public/js/jquery.ajax.feedback.add.php', { 'name': name, 'name_en': convertRuLettersToEn(name), 'activity': activity, 'activity_en': convertRuLettersToEn(activity), 'text': text, 'text_en': convertRuLettersToEn(text), 'url': window.location.href }, function(data) {
                if (data) {
                    $('#review_modal #myModalLabel').html('��� ����� ���������!');
                    $('#review_modal .modal-footer').html('');
                    $('#review_modal .modal-body').html(data);
                    // ���� ��� �������
                    yaCounter22280926.reachGoal('review-data');
                }
            });
        }
    }); // /��������� ���� "�������� �����". �������������

    // ****************************************************************************************

    // ����� "������ ������" � ������� "��������". ���������� ������� ������� Enter
    $('#contacts_form_name, #contacts_form_phone').keypress(function(e) {
        if (e.which == 13) { $('#contacts_form_submit_button').click(); return false; }
    });

    // ����� "������ ������" � ������� "��������". �������������
    $('#contacts_form_submit_button').click(function() {
        // setting container for ajax preloader
        setAjaxStatus('#contacts_form_ajax_preloader');

        var name = $.trim($('#contacts_form_name').val());
        if (!name || name.length < 3 || !hasDifferentLetters(name)) {
            showMessage('#contacts_form_name', '����������, ������� ���������� ���.')
            $('#contacts_form_name').focus();
            return false;
        }

        var phone = $.trim($('#contacts_form_phone').val());
        if (!phone || (phone.match(/\d/g) ? phone.match(/\d/g).length : 0) < 10) {
            showMessage('#contacts_form_phone', '����������, ������� ���� ������� � �����.<br />��������: (495) 134-23-53.');
            $('#contacts_form_phone').focus();
            return false;
        }

        var text = $.trim($('#contacts_form_text').val());
        if (!text) {
            showMessage('#contacts_form_text', '����������, ������� ��� ������.')
            $('#contacts_form_text').focus();
            return false;
        }

        if (name && phone && text) {
            $.post('/public/js/jquery.ajax.contacts.php', { 'name': name, 'name_en': convertRuLettersToEn(name), 'phone': phone, 'phone_en': convertRuLettersToEn(phone), 'text': text, 'text_en': convertRuLettersToEn(text), 'url': window.location.href }, function(data) {
                if (data) {
                    $('#contacts_form #contacts_form_label').html('��� ������ ���������!');
                    $('#contacts_form #contacts_form_body').html(data);
                    // ���� ��� �������
                    yaCounter22280926.reachGoal('contacts-data');
                }
            });
        }
    }); // /����� "������ ������" � ������� "��������"

    // ****************************************************************************************

    // ��������� ���� "��������� ������ �����-����". ���������� ������� ������� Enter
    $('#full_price_modal_name, #full_price_modal_email, #full_price_modal_phone').keypress(function(e) {
        if (e.which == 13) { $('#full_price_modal_submit_button').click(); return false; }
    });

    // ��������� ���� "��������� ������ �����-����". �������������
    $('#full_price_modal_submit_button').click(function() {
        // setting container for ajax preloader
        setAjaxStatus('#rent_form_ajax_preloader');

        var name = $.trim($('#full_price_modal_name').val());
        if (!name || name.length < 3 || !hasDifferentLetters(name)) {
            showMessage('#full_price_modal_name', '����������, ������� ���������� ���.')
            $('#full_price_modal_name').focus();
            return false;
        }

        // E-mail
        var email = $.trim($('#full_price_modal_email').val());
        if (!email || !/@/.test(email) || !isEmailValid(email)) {
            // ������������
            $('html, body').animate({ scrollTop: $('#full_price_modal_email').offset().top - 150 }, 100);
            showMessage('#full_price_modal_email', '����������, ������� ���� E-mail');
            $('#full_price_modal_email').focus();
            return false;
        }

        var phone = $.trim($('#full_price_modal_phone').val());
        if (!phone || (phone.match(/\d/g) ? phone.match(/\d/g).length : 0) < 10) {
            showMessage('#full_price_modal_phone', '����������, ������� ���� ������� � �����.<br />��������: (495) 134-23-53.');
            $('#full_price_modal_phone').focus();
            return false;
        }

        if (name && email && phone) {
            $.post('/public/js/jquery.ajax.full.price.php', { 'name': name, 'name_en': convertRuLettersToEn(name), 'email': email, 'email_en': convertRuLettersToEn(email), 'phone': phone, 'phone_en': convertRuLettersToEn(phone), 'url': window.location.href }, function(data) {
                if (data) {
                    $('#full_price_modal_title').html('���� ������ ����������!');
                    $('#full_price_modal_body').html(data);
                    $('#full_price_modal_footer').html('');
                    // ���� ��� �������
                    // yaCounter22280926.reachGoal('request-data');
                }
            });
        }
    }); // /��������� ���� "��������� ������ �����-����". �������������

    // ****************************************************************************************

    // ����� "������ �� �������������". ���������� ������� ������� Enter
    $('#request_form_name, #request_form_company, #request_form_city, #request_form_email, #request_form_phone').keypress(function(e) {
        if (e.which == 13) { $('#request_form_submit_button').click(); return false; }
    });

    // ����� "������ �� �������������". �������������
    $('#request_form_submit_button').on('click', function() {
        // setting container for ajax preloader
        setAjaxStatus('#request_form_ajax_preloader');
        
        // ��� ��������������
        var heatExchangerType = $('input[name=request_form_heat_exchanger_type]:checked').val();
        /* if (!heatExchangerType) {
            // ������������
            $('html, body').animate({
                scrollTop: $('.heat_exchanger_type:first').offset().top - 250,
                finish: showMessageTop('.heat_exchanger_type:first', '����������, �������� ��� ��������������.')
            }, 100);
            return false;
        } */

        // ������ �������
        var airSpanding = $.trim($('#request_form_air_spending').val());
        /* if (!airSpanding) {
            showMessage('#request_form_air_spending', '����������, ������� ������ �������.')
            $('#request_form_air_spending').focus();
            return false;
        } */

        // ������ �������������
        var coolantSpanding = $.trim($('#request_form_coolant_spending').val());
        /* if (!coolantSpanding) {
            showMessage('#request_form_coolant_spending', '����������, ������� ������ �������������.')
            $('#request_form_coolant_spending').focus();
            return false;
        } */

        // ����������� ������� �� �����
        var inputAirTemperature = $.trim($('#request_form_input_air_temperature').val());

        // ����������� ������� �� ������
        var outputAirTemperature = $.trim($('#request_form_output_air_temperature').val());

        // ����������� ������������� �� �����
        var inputCoolantTemperature = $.trim($('#request_form_input_coolant_temperature').val());

        // ����������� ������������� �� ������
        var outputCoolantTemperature = $.trim($('#request_form_output_coolant_temperature').val());

        // ��������� ��������
        var power = $.trim($('#request_form_power').val());

        // ����� FTA
        var ftaLength = $.trim($('#request_form_fta_length').val());

        // ������ FTB
        var ftbHength = $.trim($('#request_form_ftb_height').val());

        // ������ S
        var sWidth = $.trim($('#request_form_s_width').val());

        // ������� ���������� ��������� �� ����� C
        var inputCdiameter = $.trim($('#request_form_input_s_diameter').val());

        // ������� ���������� ��������� �� ������ C
        var outputCdiameter = $.trim($('#request_form_output_s_diameter').val());

        // ���� ������������� (�������)
        var unit = $.trim($('#request_form_unit').is(':checked'));

        // ���
        var name = $.trim($('#request_form_name').val());
        if (!name || name.length < 3 || !hasDifferentLetters(name)) {
            // ������������
            $('html, body').animate({ scrollTop: $('#request_form_name').offset().top - 150 }, 100);
            showMessage('#request_form_name', '����������, ������� ���������� ���.')
            $('#request_form_name').focus();
            return false;
        }

        // ��������
        var company = $.trim($('#request_form_company').val());

        // �����
        var city = $.trim($('#request_form_city').val());

        // E-mail
        var email = $.trim($('#request_form_email').val());
        if (!email || !/@/.test(email) || !isEmailValid(email)) {
            // ������������
            $('html, body').animate({ scrollTop: $('#request_form_email').offset().top - 150 }, 100);
            showMessage('#request_form_email', '����������, ������� ���� E-mail');
            $('#request_form_email').focus();
            return false;
        }

        // �������
        var phone = $.trim($('#request_form_phone').val());
        if (!phone || (phone.match(/\d/g) ? phone.match(/\d/g).length : 0) < 10) {
            // ������������
            $('html, body').animate({ scrollTop: $('#request_form_phone').offset().top - 150 }, 100);
            showMessage('#request_form_phone', '����������, ������� ���� ������� � �����.<br />��������: (495) 134-23-53.');
            $('#request_form_phone').focus();
            return false;
        }

        // ����������
        var notes = $.trim($('#request_form_notes').val());

        if (name && email && phone) {
            $.post('/public/js/jquery.ajax.request.heat.exchanger.php', {
                'heatExchangerType': heatExchangerType,
                    'heatExchangerTypeEn': convertRuLettersToEn(heatExchangerType),
                'airSpanding': airSpanding,
                    'airSpandingEn': convertRuLettersToEn(airSpanding),
                'coolantSpanding': coolantSpanding,
                    'coolantSpandingEn': convertRuLettersToEn(coolantSpanding),
                'inputAirTemperature': inputAirTemperature,
                    'inputAirTemperatureEn': convertRuLettersToEn(inputAirTemperature),
                'outputAirTemperature': outputAirTemperature,
                    'outputAirTemperatureEn': convertRuLettersToEn(outputAirTemperature),
                'inputCoolantTemperature': inputCoolantTemperature,
                    'inputCoolantTemperatureEn': convertRuLettersToEn(inputCoolantTemperature),
                'outputCoolantTemperature': outputCoolantTemperature,
                    'outputCoolantTemperatureEn': convertRuLettersToEn(outputCoolantTemperature),
                'power': power,
                    'powerEn': convertRuLettersToEn(power),
                'ftaLength': ftaLength,
                    'ftaLengthEn': convertRuLettersToEn(ftaLength),
                'ftbHength': ftbHength,
                    'ftbHengthEn': convertRuLettersToEn(ftbHength),
                'sWidth': sWidth,
                    'sWidthEn': convertRuLettersToEn(sWidth),
                'inputCdiameter': inputCdiameter,
                    'inputCdiameterEn': convertRuLettersToEn(inputCdiameter),
                'outputCdiameter': outputCdiameter,
                    'outputCdiameterEn': convertRuLettersToEn(outputCdiameter),
                'unit': unit,
                    'unitEn': convertRuLettersToEn(unit),
                'name': name,
                    'nameEn': convertRuLettersToEn(name),
                'company': company,
                    'companyEn': convertRuLettersToEn(company),
                'city': city,
                    'cityEn': convertRuLettersToEn(city),
                'email': email,
                    'emailEn': convertRuLettersToEn(email),
                'phone': phone,
                    'phoneEn': convertRuLettersToEn(phone),
                'notes': notes,
                    'notesEn': convertRuLettersToEn(notes),
                'url': window.location.href
                }, function(data) {
                if (data) {
                    // ������������
                    $('html, body').animate({ scrollTop: $('#h1').offset().top - 150 }, 100);
                    $('#h1').html('���� ������ ����������!');
                    $('#request_form').html(data);
                    // ���� ��� �������
                    yaCounter22280926.reachGoal('to-data');
                }
            });
        }
    });

    // ****************************************************************************************

    // ����� "������ �������� �����������". ���������� ������� ������� Enter
    $('#water_heater_form_name, #water_heater_form_company, #water_heater_form_city, #water_heater_form_email, #water_heater_form_phone').keypress(function(e) {
        if (e.which == 13) { $('#water_heater_form_submit_button').click(); return false; }
    });

    // ����� "������ �������� �����������". �������������
    $('#water_heater_form_submit_button').on('click', function() {
        // setting container for ajax preloader
        setAjaxStatus('#water_heater_form_ajax_preloader');

        // ������ �� ��������: FTA, ��
        var sizesFTA = $('#water_heater_form_fta').val();
        // ������ �� ��������: FTB, ��
        var sizesFTB = $('#water_heater_form_ftb').val();
        // ������ �� ��������: A, ��
        var sizesA = $('#water_heater_form_a').val();
        // ������ �� ��������: B, ��
        var sizesB = $('#water_heater_form_b').val();
        // ������ �� ��������: S, ��
        var sizesS = $('#water_heater_form_s').val();
        // ������ �� ��������: ������� E
        var sizesDiameterE = $('#water_heater_form_e_diameter').val();
        // ������ �� ��������: ������� U
        var sizesDiameterU = $('#water_heater_form_input_u_diameter').val();
        // ������ �� ��������: ��������
        var sizesLane = $('#water_heater_form_lane').val();
        // ������ �� ��������: ��� ������, ��
        var sizesLamellaStep = $('#water_heater_form_lamella_step').val();
        
        // ���������: �������� ������
        var tubeMaterial = $('#water_heater_form_tube_material').val();
        // ���������: �������� �������
        var lamellaMaterial = $('#water_heater_form_lamella_material').val();

        // ����������� �������: ������ �������
        var airSpending = $('#water_heater_form_air_spending').val();
        // ����������� �������: ����������� ������� �� �����
        var inputAirTemperature = $('#water_heater_form_input_air_temperature').val();
        // ����������� �������: ����������� ������� �� ������
        var outputAirTemperature = $('#water_heater_form_output_air_temperature').val();
        // ����������� �������: ��� �������������
        var coolantType = $('#water_heater_form_coolant_type').val();
        // ����������� �������: ����������� ������������� �� �����
        var inputCoolantTemperature = $('#water_heater_form_input_coolant_temperature').val();
        // ����������� �������: ����������� ������������� �� ������
        var outputCoolantTemperature = $('#water_heater_form_output_coolant_temperature').val();
        // ����������� �������: ��������
        var power = $('#water_heater_form_power').val();
        // ����������� �������: �������������� ����������
        var notes = $('#water_heater_form_notes').val();

        // ���
        var name = $.trim($('#water_heater_form_name').val());
        if (!name || name.length < 3 || !hasDifferentLetters(name)) {
            // ������������
            $('html, body').animate({ scrollTop: $('#water_heater_form_name').offset().top - 150 }, 100);
            showMessage('#water_heater_form_name', '����������, ������� ���������� ���.')
            $('#water_heater_form_name').focus();
            return false;
        }

        // ��������
        var company = $.trim($('#water_heater_form_company').val());

        // �����
        var city = $.trim($('#water_heater_form_city').val());

        // E-mail
        var email = $.trim($('#water_heater_form_email').val());
        if (!email || !/@/.test(email) || !isEmailValid(email)) {
            // ������������
            $('html, body').animate({ scrollTop: $('#water_heater_form_email').offset().top - 150 }, 100);
            showMessage('#water_heater_form_email', '����������, ������� ���� E-mail');
            $('#water_heater_form_email').focus();
            return false;
        }

        // �������
        var phone = $.trim($('#water_heater_form_phone').val());
        if (!phone || (phone.match(/\d/g) ? phone.match(/\d/g).length : 0) < 10) {
            // ������������
            $('html, body').animate({ scrollTop: $('#water_heater_form_phone').offset().top - 150 }, 100);
            showMessage('#water_heater_form_phone', '����������, ������� ���� ������� � �����.<br />��������: (495) 134-23-53.');
            $('#water_heater_form_phone').focus();
            return false;
        }

        if (name && email && phone) {
            $.post('/public/js/jquery.ajax.request.water.heater.php', {
                'sizesFTA': sizesFTA,
                    'sizesFTAEn': convertRuLettersToEn(sizesFTA),
                'sizesFTA': sizesFTA,
                    'sizesFTAEn': convertRuLettersToEn(sizesFTA),
                'sizesFTB': sizesFTB,
                    'sizesFTBEn': convertRuLettersToEn(sizesFTB),
                'sizesA': sizesA,
                    'sizesAEn': convertRuLettersToEn(sizesA),
                'sizesB': sizesB,
                    'sizesBEn': convertRuLettersToEn(sizesB),
                'sizesS': sizesS,
                    'sizesSEn': convertRuLettersToEn(sizesS),
                'sizesDiameterE': sizesDiameterE,
                    'sizesDiameterEEn': convertRuLettersToEn(sizesDiameterE),
                'sizesDiameterU': sizesDiameterU,
                    'sizesDiameterUEn': convertRuLettersToEn(sizesDiameterU),
                'sizesLane': sizesLane,
                    'sizesLaneEn': convertRuLettersToEn(sizesLane),
                'sizesLamellaStep': sizesLamellaStep,
                    'sizesLamellaStepEn': convertRuLettersToEn(sizesLamellaStep),
                'tubeMaterial': tubeMaterial,
                    'tubeMaterialEn': convertRuLettersToEn(tubeMaterial),
                'lamellaMaterial': lamellaMaterial,
                    'lamellaMaterialEn': convertRuLettersToEn(lamellaMaterial),
                'airSpending': airSpending,
                    'airSpendingEn': convertRuLettersToEn(airSpending),
                'inputAirTemperature': inputAirTemperature,
                    'inputAirTemperatureEn': convertRuLettersToEn(inputAirTemperature),
                'outputAirTemperature': outputAirTemperature,
                    'outputAirTemperatureEn': convertRuLettersToEn(outputAirTemperature),
                'coolantType': coolantType,
                    'coolantTypeEn': convertRuLettersToEn(coolantType),
                'inputCoolantTemperature': inputCoolantTemperature,
                    'inputCoolantTemperatureEn': convertRuLettersToEn(inputCoolantTemperature),
                'outputCoolantTemperature': outputCoolantTemperature,
                    'outputCoolantTemperatureEn': convertRuLettersToEn(outputCoolantTemperature),
                'power': power,
                    'powerEn': convertRuLettersToEn(power),
                'notes': notes,
                    'notesEn': convertRuLettersToEn(notes),
                'name': name,
                    'nameEn': convertRuLettersToEn(name),
                'company': company,
                    'companyEn': convertRuLettersToEn(company),
                'city': city,
                    'cityEn': convertRuLettersToEn(city),
                'email': email,
                    'emailEn': convertRuLettersToEn(email),
                'phone': phone,
                    'phoneEn': convertRuLettersToEn(phone),
                'notes': notes,
                    'notesEn': convertRuLettersToEn(notes),
                'url': window.location.href
                }, function(data) {
                if (data) {
                    // ������������
                    $('html, body').animate({ scrollTop: $('#h1').offset().top - 150 }, 100);
                    $('#h1').html('���� ������ ����������!');
                    $('#water_heater_form').html(data);
                    $('.water_heater_desc').remove();
                    // ���� ��� �������
                    yaCounter22280926.reachGoal('vn-data');
                }
            });
        }
    });

    // ****************************************************************************************

    // ����� "������ �������� ����������". ���������� ������� ������� Enter
    $('#water_cooler_form_name, #water_cooler_form_company, #water_cooler_form_city, #water_cooler_form_email, #water_cooler_form_phone').keypress(function(e) {
        if (e.which == 13) { $('#water_cooler_form_submit_button').click(); return false; }
    });

    // ����� "������ �������� ����������". �������������
    $('#water_cooler_form_submit_button').on('click', function() {
        // setting container for ajax preloader
        setAjaxStatus('#water_cooler_form_ajax_preloader');

        // ������ �� ��������: FTA, ��
        var sizesFTA = $('#water_cooler_form_fta').val();
        // ������ �� ��������: FTB, ��
        var sizesFTB = $('#water_cooler_form_ftb').val();
        // ������ �� ��������: A, ��
        var sizesA = $('#water_cooler_form_a').val();
        // ������ �� ��������: B, ��
        var sizesB = $('#water_cooler_form_b').val();
        // ������ �� ��������: S, ��
        var sizesS = $('#water_cooler_form_s').val();
        // ������ �� ��������: ������� E
        var sizesDiameterE = $('#water_cooler_form_e_diameter').val();
        // ������ �� ��������: ������� U
        var sizesDiameterU = $('#water_cooler_form_input_u_diameter').val();
        // ������ �� ��������: ��������
        var sizesLane = $('#water_cooler_form_lane').val();
        // ������ �� ��������: ��� ������, ��
        var sizesLamellaStep = $('#water_cooler_form_lamella_step').val();
        // ������ �� ��������: ������ � ��������������
        var tray = $('#water_heater_tray').val();

        // ���������: �������� ������
        var tubeMaterial = $('#water_cooler_form_tube_material').val();
        // ���������: �������� �������
        var lamellaMaterial = $('#water_cooler_form_lamella_material').val();

        // ����������� �������: ������ �������
        var airSpending = $('#water_cooler_form_air_spending').val();
        // ����������� �������: ��������� �������, %
        var airHumidity = $('#water_cooler_form_air_humidity').val();
        // ����������� �������: ��� �������������
        var coolantType = $('#water_cooler_form_coolant_type').val();
        // ����������� �������: ����������� ������� �� �����
        var inputAirTemperature = $('#water_cooler_form_input_air_temperature').val();
        // ����������� �������: ����������� ������� �� ������
        var outputAirTemperature = $('#water_cooler_form_output_air_temperature').val();
        // ����������� �������: ����������� ������������� �� �����
        var inputCoolantTemperature = $('#water_cooler_form_input_coolant_temperature').val();
        // ����������� �������: ����������� ������������� �� ������
        var outputCoolantTemperature = $('#water_cooler_form_output_coolant_temperature').val();
        // ����������� �������: ��������
        var power = $('#water_cooler_form_power').val();
        // ����������� �������: �������������� ����������
        var notes = $('#water_cooler_form_notes').val();

        // ���
        var name = $.trim($('#water_cooler_form_name').val());
        if (!name || name.length < 3 || !hasDifferentLetters(name)) {
            // ������������
            $('html, body').animate({ scrollTop: $('#water_cooler_form_name').offset().top - 150 }, 100);
            showMessage('#water_cooler_form_name', '����������, ������� ���������� ���.')
            $('#water_cooler_form_name').focus();
            return false;
        }

        // ��������
        var company = $.trim($('#water_cooler_form_company').val());

        // �����
        var city = $.trim($('#water_cooler_form_city').val());

        // E-mail
        var email = $.trim($('#water_cooler_form_email').val());
        if (!email || !/@/.test(email) || !isEmailValid(email)) {
            // ������������
            $('html, body').animate({ scrollTop: $('#water_cooler_form_email').offset().top - 150 }, 100);
            showMessage('#water_cooler_form_email', '����������, ������� ���� E-mail');
            $('#water_cooler_form_email').focus();
            return false;
        }

        // �������
        var phone = $.trim($('#water_cooler_form_phone').val());
        if (!phone || (phone.match(/\d/g) ? phone.match(/\d/g).length : 0) < 10) {
            // ������������
            $('html, body').animate({ scrollTop: $('#water_cooler_form_phone').offset().top - 150 }, 100);
            showMessage('#water_cooler_form_phone', '����������, ������� ���� ������� � �����.<br />��������: (495) 134-23-53.');
            $('#water_cooler_form_phone').focus();
            return false;
        }

        if (name && email && phone) {
            $.post('/public/js/jquery.ajax.request.water.cooler.php', {
                'sizesFTA': sizesFTA,
                    'sizesFTAEn': convertRuLettersToEn(sizesFTA),
                'sizesFTA': sizesFTA,
                    'sizesFTAEn': convertRuLettersToEn(sizesFTA),
                'sizesFTB': sizesFTB,
                    'sizesFTBEn': convertRuLettersToEn(sizesFTB),
                'sizesA': sizesA,
                    'sizesAEn': convertRuLettersToEn(sizesA),
                'sizesB': sizesB,
                    'sizesBEn': convertRuLettersToEn(sizesB),
                'sizesS': sizesS,
                    'sizesSEn': convertRuLettersToEn(sizesS),
                'sizesDiameterE': sizesDiameterE,
                    'sizesDiameterEEn': convertRuLettersToEn(sizesDiameterE),
                'sizesDiameterU': sizesDiameterU,
                    'sizesDiameterUEn': convertRuLettersToEn(sizesDiameterU),
                'sizesLane': sizesLane,
                    'sizesLaneEn': convertRuLettersToEn(sizesLane),
                'sizesLamellaStep': sizesLamellaStep,
                    'sizesLamellaStepEn': convertRuLettersToEn(sizesLamellaStep),
                'tray': tray,
                    'trayEn': convertRuLettersToEn(tray),
                'tubeMaterial': tubeMaterial,
                    'tubeMaterialEn': convertRuLettersToEn(tubeMaterial),
                'lamellaMaterial': lamellaMaterial,
                    'lamellaMaterialEn': convertRuLettersToEn(lamellaMaterial),
                'airSpending': airSpending,
                    'airSpendingEn': convertRuLettersToEn(airSpending),
                'airHumidity': airHumidity,
                    'airHumidityEn': convertRuLettersToEn(airHumidity),
                'inputAirTemperature': inputAirTemperature,
                    'inputAirTemperatureEn': convertRuLettersToEn(inputAirTemperature),
                'outputAirTemperature': outputAirTemperature,
                    'outputAirTemperatureEn': convertRuLettersToEn(outputAirTemperature),
                'coolantType': coolantType,
                    'coolantTypeEn': convertRuLettersToEn(coolantType),
                'inputCoolantTemperature': inputCoolantTemperature,
                    'inputCoolantTemperatureEn': convertRuLettersToEn(inputCoolantTemperature),
                'outputCoolantTemperature': outputCoolantTemperature,
                    'outputCoolantTemperatureEn': convertRuLettersToEn(outputCoolantTemperature),
                'power': power,
                    'powerEn': convertRuLettersToEn(power),
                'notes': notes,
                    'notesEn': convertRuLettersToEn(notes),
                'name': name,
                    'nameEn': convertRuLettersToEn(name),
                'company': company,
                    'companyEn': convertRuLettersToEn(company),
                'city': city,
                    'cityEn': convertRuLettersToEn(city),
                'email': email,
                    'emailEn': convertRuLettersToEn(email),
                'phone': phone,
                    'phoneEn': convertRuLettersToEn(phone),
                'notes': notes,
                    'notesEn': convertRuLettersToEn(notes),
                'url': window.location.href
                }, function(data) {
                if (data) {
                    // ������������
                    $('html, body').animate({ scrollTop: $('#h1').offset().top - 150 }, 100);
                    $('#h1').html('���� ������ ����������!');
                    $('#water_cooler_form').html(data);
                    // $('.water_heater_desc').remove();
                    // ���� ��� �������
                    yaCounter22280926.reachGoal('vo-data');
                }
            });
        }
    });

    // ****************************************************************************************

    // ����� "������ � ������ ����������". ���������� ������� ������� Enter
    $('#evaporator_form_name, #evaporator_form_company, #evaporator_form_city, #evaporator_form_email, #evaporator_form_phone').keypress(function(e) {
        if (e.which == 13) { $('#evaporator_form_submit_button').click(); return false; }
    });

    // ����� "������ � ������ ����������". �������������
    $('#evaporator_form_submit_button').on('click', function() {
        // setting container for ajax preloader
        setAjaxStatus('#evaporator_form_ajax_preloader');

        // ������ �� ��������: FTA, ��
        var sizesFTA = $('#evaporator_form_fta').val();
        // ������ �� ��������: FTB, ��
        var sizesFTB = $('#evaporator_form_ftb').val();
        // ������ �� ��������: A, ��
        var sizesA = $('#evaporator_form_a').val();
        // ������ �� ��������: B, ��
        var sizesB = $('#evaporator_form_b').val();
        // ������ �� ��������: S, ��
        var sizesS = $('#evaporator_form_s').val();
        // ������ �� ��������: ������� E
        var sizesDiameterE = $('#evaporator_form_e_diameter').val();
        // ������ �� ��������: ������� U
        var sizesDiameterU = $('#evaporator_form_input_u_diameter').val();
        // ������ �� ��������: ��������
        var sizesLane = $('#evaporator_form_lane').val();
        // ������ �� ��������: ��� ������, ��
        var sizesLamellaStep = $('#evaporator_form_lamella_step').val();
        // ������ �� ��������: ������ � ��������������
        var tray = $('#water_heater_tray').val();

        // ���������: �������� ������
        var tubeMaterial = $('#evaporator_form_tube_material').val();
        // ���������: �������� �������
        var lamellaMaterial = $('#evaporator_form_lamella_material').val();

        // ����������� �������: ������ �������
        var airSpending = $('#evaporator_form_air_spending').val();
        // ����������� �������: ��������� �������, %
        var airHumidity = $('#evaporator_form_air_humidity').val();
        // ����������� �������: ����������� ������� �� �����
        var inputAirTemperature = $('#evaporator_form_input_air_temperature').val();
        // ����������� �������: ����������� ������� �� ������
        var outputAirTemperature = $('#evaporator_form_output_air_temperature').val();
        // ����������� �������: ��� ������
        var freonType = $('#evaporator_form_freon_type').val();
        // ����������� �������: ����������� ��������� ������, �C
        var freonEvaporationTemperature = $('#evaporator_form_freon_evaporation_temperature').val();
        // ����������� �������: ��������
        var power = $('#evaporator_form_power').val();
        // ����������� �������: �������������� ����������
        var notes = $('#evaporator_form_notes').val();

        // ���
        var name = $.trim($('#evaporator_form_name').val());
        if (!name || name.length < 3 || !hasDifferentLetters(name)) {
            // ������������
            $('html, body').animate({ scrollTop: $('#evaporator_form_name').offset().top - 150 }, 100);
            showMessage('#evaporator_form_name', '����������, ������� ���������� ���.')
            $('#evaporator_form_name').focus();
            return false;
        }

        // ��������
        var company = $.trim($('#evaporator_form_company').val());

        // �����
        var city = $.trim($('#evaporator_form_city').val());

        // E-mail
        var email = $.trim($('#evaporator_form_email').val());
        if (!email || !/@/.test(email) || !isEmailValid(email)) {
            // ������������
            $('html, body').animate({ scrollTop: $('#evaporator_form_email').offset().top - 150 }, 100);
            showMessage('#evaporator_form_email', '����������, ������� ���� E-mail');
            $('#evaporator_form_email').focus();
            return false;
        }

        // �������
        var phone = $.trim($('#evaporator_form_phone').val());
        if (!phone || (phone.match(/\d/g) ? phone.match(/\d/g).length : 0) < 10) {
            // ������������
            $('html, body').animate({ scrollTop: $('#evaporator_form_phone').offset().top - 150 }, 100);
            showMessage('#evaporator_form_phone', '����������, ������� ���� ������� � �����.<br />��������: (495) 134-23-53.');
            $('#evaporator_form_phone').focus();
            return false;
        }

        if (name && email && phone) {
            $.post('/public/js/jquery.ajax.request.evaporator.php', {
                'sizesFTA': sizesFTA,
                    'sizesFTAEn': convertRuLettersToEn(sizesFTA),
                'sizesFTA': sizesFTA,
                    'sizesFTAEn': convertRuLettersToEn(sizesFTA),
                'sizesFTB': sizesFTB,
                    'sizesFTBEn': convertRuLettersToEn(sizesFTB),
                'sizesA': sizesA,
                    'sizesAEn': convertRuLettersToEn(sizesA),
                'sizesB': sizesB,
                    'sizesBEn': convertRuLettersToEn(sizesB),
                'sizesS': sizesS,
                    'sizesSEn': convertRuLettersToEn(sizesS),
                'sizesDiameterE': sizesDiameterE,
                    'sizesDiameterEEn': convertRuLettersToEn(sizesDiameterE),
                'sizesDiameterU': sizesDiameterU,
                    'sizesDiameterUEn': convertRuLettersToEn(sizesDiameterU),
                'sizesLane': sizesLane,
                    'sizesLaneEn': convertRuLettersToEn(sizesLane),
                'sizesLamellaStep': sizesLamellaStep,
                    'sizesLamellaStepEn': convertRuLettersToEn(sizesLamellaStep),
                'tray': tray,
                    'trayEn': convertRuLettersToEn(tray),
                'tubeMaterial': tubeMaterial,
                    'tubeMaterialEn': convertRuLettersToEn(tubeMaterial),
                'lamellaMaterial': lamellaMaterial,
                    'lamellaMaterialEn': convertRuLettersToEn(lamellaMaterial),
                'airSpending': airSpending,
                    'airSpendingEn': convertRuLettersToEn(airSpending),
                'airHumidity': airHumidity,
                    'airHumidityEn': convertRuLettersToEn(airHumidity),
                'inputAirTemperature': inputAirTemperature,
                    'inputAirTemperatureEn': convertRuLettersToEn(inputAirTemperature),
                'outputAirTemperature': outputAirTemperature,
                    'outputAirTemperatureEn': convertRuLettersToEn(outputAirTemperature),
                'freonType': freonType,
                    'freonTypeEn': convertRuLettersToEn(freonType),
                'freonEvaporationTemperature': freonEvaporationTemperature,
                    'freonEvaporationTemperatureEn': convertRuLettersToEn(freonEvaporationTemperature),
                'power': power,
                    'powerEn': convertRuLettersToEn(power),
                'notes': notes,
                    'notesEn': convertRuLettersToEn(notes),
                'name': name,
                    'nameEn': convertRuLettersToEn(name),
                'company': company,
                    'companyEn': convertRuLettersToEn(company),
                'city': city,
                    'cityEn': convertRuLettersToEn(city),
                'email': email,
                    'emailEn': convertRuLettersToEn(email),
                'phone': phone,
                    'phoneEn': convertRuLettersToEn(phone),
                'notes': notes,
                    'notesEn': convertRuLettersToEn(notes),
                'url': window.location.href
                }, function(data) {
                if (data) {
                    // ������������
                    $('html, body').animate({ scrollTop: $('#h1').offset().top - 150 }, 100);
                    $('#h1').html('���� ������ ����������!');
                    $('#evaporator_form').html(data);
                    // $('.water_heater_desc').remove();
                    // ���� ��� �������
                    yaCounter22280926.reachGoal('i-data');
                }
            });
        }
    });

    // ****************************************************************************************

    // ����� "������ � ������ ������������". ���������� ������� ������� Enter
    $('#refrigerator_form_name, #refrigerator_form_company, #refrigerator_form_city, #refrigerator_form_email, #refrigerator_form_phone').keypress(function(e) {
        if (e.which == 13) { $('#refrigerator_form_submit_button').click(); return false; }
    });

    // ����� "������ � ������ ������������". �������������
    $('#refrigerator_form_submit_button').on('click', function() {
        // setting container for ajax preloader
        setAjaxStatus('#refrigerator_form_ajax_preloader');

        // ������ �� ��������: FTA, ��
        var sizesFTA = $('#refrigerator_form_fta').val();
        // ������ �� ��������: FTB, ��
        var sizesFTB = $('#refrigerator_form_ftb').val();
        // ������ �� ��������: A, ��
        var sizesA = $('#refrigerator_form_a').val();
        // ������ �� ��������: B, ��
        var sizesB = $('#refrigerator_form_b').val();
        // ������ �� ��������: S, ��
        var sizesS = $('#refrigerator_form_s').val();
        // ������ �� ��������: ������� E
        var sizesDiameterE = $('#refrigerator_form_e_diameter').val();
        // ������ �� ��������: ������� U
        var sizesDiameterU = $('#refrigerator_form_input_u_diameter').val();
        // ������ �� ��������: ��������
        var sizesLane = $('#refrigerator_form_lane').val();
        // ������ �� ��������: ��� ������, ��
        var sizesLamellaStep = $('#refrigerator_form_lamella_step').val();
        // ������ �� ��������: ������ � ��������������
        var tray = $('#water_heater_tray').val();

        // ���������: �������� ������
        var tubeMaterial = $('#refrigerator_form_tube_material').val();
        // ���������: �������� �������
        var lamellaMaterial = $('#refrigerator_form_lamella_material').val();

        // ����������� �������: ������ �������
        var airSpending = $('#refrigerator_form_air_spending').val();
        // ����������� �������: ��������� �������, %
        var airHumidity = $('#refrigerator_form_air_humidity').val();
        // ����������� �������: ����������� ������� �� �����
        var inputAirTemperature = $('#refrigerator_form_input_air_temperature').val();
        // ����������� �������: ����������� ������� �� ������
        var outputAirTemperature = $('#refrigerator_form_output_air_temperature').val();
        // ����������� �������: ��� ������
        var freonType = $('#refrigerator_form_freon_type').val();
        // ����������� �������: ����������� ��������� ������, �C
        var freonEvaporationTemperature = $('#refrigerator_form_freon_evaporation_temperature').val();
        // ����������� �������: ��������
        var power = $('#refrigerator_form_power').val();
        // ����������� �������: �������������� ����������
        var notes = $('#refrigerator_form_notes').val();

        // ���
        var name = $.trim($('#refrigerator_form_name').val());
        if (!name || name.length < 3 || !hasDifferentLetters(name)) {
            // ������������
            $('html, body').animate({ scrollTop: $('#refrigerator_form_name').offset().top - 150 }, 100);
            showMessage('#refrigerator_form_name', '����������, ������� ���������� ���.')
            $('#refrigerator_form_name').focus();
            return false;
        }

        // ��������
        var company = $.trim($('#refrigerator_form_company').val());

        // �����
        var city = $.trim($('#refrigerator_form_city').val());

        // E-mail
        var email = $.trim($('#refrigerator_form_email').val());
        if (!email || !/@/.test(email) || !isEmailValid(email)) {
            // ������������
            $('html, body').animate({ scrollTop: $('#refrigerator_form_email').offset().top - 150 }, 100);
            showMessage('#refrigerator_form_email', '����������, ������� ���� E-mail');
            $('#refrigerator_form_email').focus();
            return false;
        }

        // �������
        var phone = $.trim($('#refrigerator_form_phone').val());
        if (!phone || (phone.match(/\d/g) ? phone.match(/\d/g).length : 0) < 10) {
            // ������������
            $('html, body').animate({ scrollTop: $('#refrigerator_form_phone').offset().top - 150 }, 100);
            showMessage('#refrigerator_form_phone', '����������, ������� ���� ������� � �����.<br />��������: (495) 134-23-53.');
            $('#refrigerator_form_phone').focus();
            return false;
        }

        if (name && email && phone) {
            $.post('/public/js/jquery.ajax.request.refrigerator.php', {
                'sizesFTA': sizesFTA,
                    'sizesFTAEn': convertRuLettersToEn(sizesFTA),
                'sizesFTA': sizesFTA,
                    'sizesFTAEn': convertRuLettersToEn(sizesFTA),
                'sizesFTB': sizesFTB,
                    'sizesFTBEn': convertRuLettersToEn(sizesFTB),
                'sizesA': sizesA,
                    'sizesAEn': convertRuLettersToEn(sizesA),
                'sizesB': sizesB,
                    'sizesBEn': convertRuLettersToEn(sizesB),
                'sizesS': sizesS,
                    'sizesSEn': convertRuLettersToEn(sizesS),
                'sizesDiameterE': sizesDiameterE,
                    'sizesDiameterEEn': convertRuLettersToEn(sizesDiameterE),
                'sizesDiameterU': sizesDiameterU,
                    'sizesDiameterUEn': convertRuLettersToEn(sizesDiameterU),
                'sizesLane': sizesLane,
                    'sizesLaneEn': convertRuLettersToEn(sizesLane),
                'sizesLamellaStep': sizesLamellaStep,
                    'sizesLamellaStepEn': convertRuLettersToEn(sizesLamellaStep),
                'tray': tray,
                    'trayEn': convertRuLettersToEn(tray),
                'tubeMaterial': tubeMaterial,
                    'tubeMaterialEn': convertRuLettersToEn(tubeMaterial),
                'lamellaMaterial': lamellaMaterial,
                    'lamellaMaterialEn': convertRuLettersToEn(lamellaMaterial),
                'airSpending': airSpending,
                    'airSpendingEn': convertRuLettersToEn(airSpending),
                'airHumidity': airHumidity,
                    'airHumidityEn': convertRuLettersToEn(airHumidity),
                'inputAirTemperature': inputAirTemperature,
                    'inputAirTemperatureEn': convertRuLettersToEn(inputAirTemperature),
                'outputAirTemperature': outputAirTemperature,
                    'outputAirTemperatureEn': convertRuLettersToEn(outputAirTemperature),
                'freonType': freonType,
                    'freonTypeEn': convertRuLettersToEn(freonType),
                'freonEvaporationTemperature': freonEvaporationTemperature,
                    'freonEvaporationTemperatureEn': convertRuLettersToEn(freonEvaporationTemperature),
                'power': power,
                    'powerEn': convertRuLettersToEn(power),
                'notes': notes,
                    'notesEn': convertRuLettersToEn(notes),
                'name': name,
                    'nameEn': convertRuLettersToEn(name),
                'company': company,
                    'companyEn': convertRuLettersToEn(company),
                'city': city,
                    'cityEn': convertRuLettersToEn(city),
                'email': email,
                    'emailEn': convertRuLettersToEn(email),
                'phone': phone,
                    'phoneEn': convertRuLettersToEn(phone),
                'notes': notes,
                    'notesEn': convertRuLettersToEn(notes),
                'url': window.location.href
                }, function(data) {
                if (data) {
                    // ������������
                    $('html, body').animate({ scrollTop: $('#h1').offset().top - 150 }, 100);
                    $('#h1').html('���� ������ ����������!');
                    $('#refrigerator_form').html(data);
                    // $('.water_heater_desc').remove();
                    // ���� ��� �������
                    yaCounter22280926.reachGoal('c-data');
                }
            });
        }
    });

    // ****************************************************************************************

    // ����� "������ �������� �����������". ���������� ������� ������� Enter
    $('#steam_heat_exchanger_form_name, #steam_heat_exchanger_form_company, #steam_heat_exchanger_form_city, #steam_heat_exchanger_form_email, #steam_heat_exchanger_form_phone').keypress(function(e) {
        if (e.which == 13) { $('#steam_heat_exchanger_form_submit_button').click(); return false; }
    });

    // ����� "������ �������� �����������". �������������
    $('#steam_heat_exchanger_form_submit_button').on('click', function() {
        // setting container for ajax preloader
        setAjaxStatus('#steam_heat_exchanger_form_ajax_preloader');

        // ������ �� ��������: FTA, ��
        var sizesFTA = $('#steam_heat_exchanger_form_fta').val();
        // ������ �� ��������: FTB, ��
        var sizesFTB = $('#steam_heat_exchanger_form_ftb').val();
        // ������ �� ��������: A, ��
        var sizesA = $('#steam_heat_exchanger_form_a').val();
        // ������ �� ��������: B, ��
        var sizesB = $('#steam_heat_exchanger_form_b').val();
        // ������ �� ��������: S, ��
        var sizesS = $('#steam_heat_exchanger_form_s').val();
        // ������ �� ��������: ������� E
        var sizesDiameterE = $('#steam_heat_exchanger_form_e_diameter').val();
        // ������ �� ��������: ������� U
        var sizesDiameterU = $('#steam_heat_exchanger_form_input_u_diameter').val();
        // ������ �� ��������: ��������
        var sizesLane = $('#steam_heat_exchanger_form_lane').val();
        // ������ �� ��������: ��� ������, ��
        var sizesLamellaStep = $('#steam_heat_exchanger_form_lamella_step').val();

        // ���������: �������� ������
        var tubeMaterial = $('#steam_heat_exchanger_form_tube_material').val();
        // ���������: �������� �������
        var lamellaMaterial = $('#steam_heat_exchanger_form_lamella_material').val();

        // ����������� �������: ������ �������
        var airSpending = $('#steam_heat_exchanger_form_air_spending').val();
        // ����������� �������: ����������� ������� �� �����
        var inputAirTemperature = $('#steam_heat_exchanger_form_input_air_temperature').val();
        // ����������� �������: ����������� ������� �� ������
        var outputAirTemperature = $('#steam_heat_exchanger_form_output_air_temperature').val();
        // ����������� �������: ����������� ����
        var steamTemperature = $('#steam_heat_exchanger_form_steam_temperature').val();
        // ����������� �������: ��������
        var power = $('#steam_heat_exchanger_form_power').val();
        // ����������� �������: �������������� ����������
        var notes = $('#steam_heat_exchanger_form_notes').val();

        // ���
        var name = $.trim($('#steam_heat_exchanger_form_name').val());
        if (!name || name.length < 3 || !hasDifferentLetters(name)) {
            // ������������
            $('html, body').animate({ scrollTop: $('#steam_heat_exchanger_form_name').offset().top - 150 }, 100);
            showMessage('#steam_heat_exchanger_form_name', '����������, ������� ���������� ���.')
            $('#steam_heat_exchanger_form_name').focus();
            return false;
        }

        // ��������
        var company = $.trim($('#steam_heat_exchanger_form_company').val());

        // �����
        var city = $.trim($('#steam_heat_exchanger_form_city').val());

        // E-mail
        var email = $.trim($('#steam_heat_exchanger_form_email').val());
        if (!email || !/@/.test(email) || !isEmailValid(email)) {
            // ������������
            $('html, body').animate({ scrollTop: $('#steam_heat_exchanger_form_email').offset().top - 150 }, 100);
            showMessage('#steam_heat_exchanger_form_email', '����������, ������� ���� E-mail');
            $('#steam_heat_exchanger_form_email').focus();
            return false;
        }

        // �������
        var phone = $.trim($('#steam_heat_exchanger_form_phone').val());
        if (!phone || (phone.match(/\d/g) ? phone.match(/\d/g).length : 0) < 10) {
            // ������������
            $('html, body').animate({ scrollTop: $('#steam_heat_exchanger_form_phone').offset().top - 150 }, 100);
            showMessage('#steam_heat_exchanger_form_phone', '����������, ������� ���� ������� � �����.<br />��������: (495) 134-23-53.');
            $('#steam_heat_exchanger_form_phone').focus();
            return false;
        }

        if (name && email && phone) {
            $.post('/public/js/jquery.ajax.request.steam.heat.exchanger.php', {
                'sizesFTA': sizesFTA,
                    'sizesFTAEn': convertRuLettersToEn(sizesFTA),
                'sizesFTA': sizesFTA,
                    'sizesFTAEn': convertRuLettersToEn(sizesFTA),
                'sizesFTB': sizesFTB,
                    'sizesFTBEn': convertRuLettersToEn(sizesFTB),
                'sizesA': sizesA,
                    'sizesAEn': convertRuLettersToEn(sizesA),
                'sizesB': sizesB,
                    'sizesBEn': convertRuLettersToEn(sizesB),
                'sizesS': sizesS,
                    'sizesSEn': convertRuLettersToEn(sizesS),
                'sizesDiameterE': sizesDiameterE,
                    'sizesDiameterEEn': convertRuLettersToEn(sizesDiameterE),
                'sizesDiameterU': sizesDiameterU,
                    'sizesDiameterUEn': convertRuLettersToEn(sizesDiameterU),
                'sizesLane': sizesLane,
                    'sizesLaneEn': convertRuLettersToEn(sizesLane),
                'sizesLamellaStep': sizesLamellaStep,
                    'sizesLamellaStepEn': convertRuLettersToEn(sizesLamellaStep),
                'tubeMaterial': tubeMaterial,
                    'tubeMaterialEn': convertRuLettersToEn(tubeMaterial),
                'lamellaMaterial': lamellaMaterial,
                    'lamellaMaterialEn': convertRuLettersToEn(lamellaMaterial),
                'airSpending': airSpending,
                    'airSpendingEn': convertRuLettersToEn(airSpending),
                'inputAirTemperature': inputAirTemperature,
                    'inputAirTemperatureEn': convertRuLettersToEn(inputAirTemperature),
                'outputAirTemperature': outputAirTemperature,
                    'outputAirTemperatureEn': convertRuLettersToEn(outputAirTemperature),
                'steamTemperature': steamTemperature,
                    'steamTemperatureEn': convertRuLettersToEn(steamTemperature),
                'power': power,
                    'powerEn': convertRuLettersToEn(power),
                'notes': notes,
                    'notesEn': convertRuLettersToEn(notes),
                'name': name,
                    'nameEn': convertRuLettersToEn(name),
                'company': company,
                    'companyEn': convertRuLettersToEn(company),
                'city': city,
                    'cityEn': convertRuLettersToEn(city),
                'email': email,
                    'emailEn': convertRuLettersToEn(email),
                'phone': phone,
                    'phoneEn': convertRuLettersToEn(phone),
                'notes': notes,
                    'notesEn': convertRuLettersToEn(notes),
                'url': window.location.href
                }, function(data) {
                if (data) {
                    // ������������
                    $('html, body').animate({ scrollTop: $('#h1').offset().top - 150 }, 100);
                    $('#h1').html('���� ������ ����������!');
                    $('#steam_heat_exchanger_form').html(data);
                    $('.steam_heat_exchanger_desc').remove();
                    // ���� ��� �������
                    yaCounter22280926.reachGoal('pn-data');
                }
            });
        }
    });

    // ****************************************************************************************

}); // /jquery ready