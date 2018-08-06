$(function() {


    // Dropdown
    $(".has-dropdown").click(function() {
        $(this).toggleClass('is-active');
    });




    // Tabs
    $tab_list = $("#block-about .tab");
    $box_list = $("#block-about .box-innear");


    $box_list.hide().first().show();


    $tab_list.click(function() {

        if (!$(this).hasClass('active')) {

            $tab_list.removeClass('active');
            $(this).addClass('active');

            $tab_target = $(this).data('target');

            $box_list.hide();

            $('#block-about .' + $tab_target).fadeIn();
        }

    });



    // Sign Up


    $step_list = $('#block-sign_up .box-innear');
    $step_list.hide().first().show();

    $('.js-next').click(function() {
        if ($("#input-name").val().length > 0 && $('#input-lastName').val().length > 0) {
            if ($("#id_privacy").is(':checked')) {
                $('.myCheckbox').prop('checked', true);
                yaCounter49538275.reachGoal('step_1');
                console.log('step1');
                $tab_target = $(this).data('target');
                $step_list.hide();
                $('.js-tab-step-2').addClass('active');
                $('.js-tab-step-1').addClass('success');
                $('#block-sign_up .' + $tab_target).fadeIn();
                $('.error.for-privacy').addClass('d-none')
            } else {
                $.each([$("#input-name"), $('#input-lastName')], function() {
                    $(this).removeClass('has-error')
                })
                $('.error.for-privacy').removeClass('d-none')

            }
        } else {
            $.each([$("#input-name"), $('#input-lastName')], function() {
                if ($(this).val().length == 0) {
                    $(this).addClass('has-error')
                } else {
                    $(this).removeClass('has-error')
                }
            })
        }
    })



    // Navigation

    $('.scrollTo').click(function(event) {
        event.preventDefault();
        $tager_id = $(this).data('target');

        $target = document.getElementById($tager_id);

        $('html, body').animate({
            scrollTop: $($target).offset().top
        }, 500);

    });


    $(".navbar-hamburger").click(function() {
        $(this).toggleClass('is-active');
        $('html').toggleClass('overflow-hidden');
    });


    $(".navbar-menu .scrollTo").click(function() {
        if ($(".navbar-hamburger").hasClass('is-active')) {
            $('html').removeClass('overflow-hidden');
            $(".navbar-hamburger").toggleClass('is-active')
        }

    })


    $(".screen-right-woman").click(function() {
        $('#slides').superslides('animate', 'next')
    })

    $(".screen-left-man").click(function() {
        $('#slides').superslides('animate', 'prev')
    })

    $('#slides').superslides({
        animation: "fade",
        play: 7500,

    })

    $(".js-form-sign_up").submit(function(e) {
        e.preventDefault();

        if ($('#input-email').val().length > 0) {

            $("#input-email").removeClass('has-error');



            if ($('#input-password').val().length > 0) {

                $("#input-password").removeClass('has-error');

                if ($('#input-password_confrim').val() === $('#input-password').val()) {

                    $("#input-password_confrim").removeClass('has-error');

                    $.ajax({
                        type: "POST",
                        url: "https://guerbois.com//webMethod.aspx/signUp",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({
                            email: $("#input-email").val(),
                            firstName: $("#input-name").val(),
                            lastName: $("#input-lastName").val(),
                            password: $("#input-password").val()
                        })
                    }).fail(function(t) {


                    }).done(function(t) {
                        if (t.d.status == true) {
                            yaCounter49538275.reachGoal('step_2');
                            console.log('step2');
                            alert(t.d.message);
                            window.location.href = "https://guerbois.com/sign-in";
                        } else {
                            alert(t.d.message);
                            $step_list.hide().first().show();
                            $('.js-tab-step-2').removeClass('active');
                            $('.js-tab-step-1').removeClass('success');
                        }
                    })
                } else {
                    $("#input-password_confrim").addClass('has-error');
                }

            } else {

                $("#input-password").addClass('has-error');

            }

        } else {
            $("#input-email").addClass('has-error');

        }
    })

});
