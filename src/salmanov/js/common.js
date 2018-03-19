$(function() {

    $('.slider').slick({
        dots: true,
        infinite: false,
        speed: 300,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    var $root = $('html, body');

    $('.anchor-link').click(function () {
        $(this).blur();
        $url = '#'+$(this).data('anchor')
        $root.animate({
            scrollTop: $($url).offset().top
        }, 700);

        return false;
    });

    $("#contact-form").submit(function(e){
        e.preventDefault()

        $url = "/mail.php";
        $data = $(this).serialize();

        $.ajax({
            type: "POST",
            url: $url,
            data: $data,
            success: function(data)
            {

                $('#contact-form').find("input, textarea").val("");
                $('#send-button').css('background','#34C045').html('Заявка успешно отправлена');

            }
        });
    })
});
