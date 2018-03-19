$(function() {

    /********
     Calendar
     *********/

    var $selectedDay,
        $monthNow;

    function Calendar(month, year) {
        var now = new Date();

        // labels for week days and months
        var days_labels = ['пон.', 'вт.', 'ср.', 'чет.', 'пят.', 'суб.', 'вск.'],
            months_labels = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        // test if input date is correct, instead use current month
        this.month = (isNaN(month) || month == null) ? now.getMonth() + 1 : month;
        this.year = (isNaN(year) || year == null) ? now.getFullYear() : year;

        var logical_month = this.month - 1;

        // get first day of month and first week day
        var first_day = new Date(this.year, logical_month, 1),
            first_day_weekday = first_day.getDay() == 0 ? 7 : first_day.getDay();

        // find number of days in month
        var month_length = new Date(this.year, this.month, 0).getDate(),
            previous_month_length = new Date(this.year, logical_month, 0).getDate();

        // calendar header
        var html = '<p class="calendar-header">' + months_labels[logical_month] + '</p>';
            $monthNow = months_labels[logical_month];

        // calendar content
        html += '<table class="calendar-table">';

        // week days labels row
        html += '<thead>';
        html += '<tr class="week-days">';
        for (var i = 0; i <= 6; i++) {
            html += '<th class="day">';
            html += days_labels[i];
            html += '</th>';
        }
        html += '</tr>';
        html += '</thead>';

        // define default day variables
        var day  = 1, // current month days
            prev = 1, // previous month days
            next = 1; // next month days

        html += '<tbody>';
        html += '<tr class="week">';
        // weeks loop (rows)
        for (var i = 0; i < 9; i++) {
            // weekdays loop (cells)
            for (var j = 1; j <= 7; j++) {
                if (day <= month_length && (i > 0 || j >= first_day_weekday)) {
                    // current month
                    html += '<td class="day">';
                    html += day;
                    html += '</td>';
                    day++;
                } else {
                    if (day <= month_length) {
                        // previous month
                        html += '<td class="day other-month">';
                        html += previous_month_length - first_day_weekday + prev + 1;
                        html += '</td>';
                        prev++;
                    } else {
                        // next month
                        html += '<td class="day other-month">';
                        html += next;
                        html += '</td>';
                        next++;
                    }
                }
            }

            // stop making rows if it's the end of month
            if (day > month_length) {
                html += '</tr>';
                break;
            } else {
                html += '</tr><tr class="week">';
            }
        }
        html += '</tbody>';
        html += '</table>';

        return html;
    }

    // document.getElementById('calendar').innerHTML = Calendar(12, 2015);
    document.getElementById('calendar').innerHTML = Calendar();


    $(".week .day:not(.other-month)").click(function(){
        $(".week .day").removeClass("selected");
        $(this).addClass("selected");

        $selectedDay = $(this).text();
        $('#calendar-input').val($monthNow + ', ' + $selectedDay + ' число')

    });

    $(".select-room .room-class .button").click(function(){
        $(".select-room .room-class .button").removeClass("is-active");
        $(this).addClass("is-active");
        var target = $(this).data("select");
        $(".room-card").fadeOut();
        $(".room-card." + target).delay(300).fadeIn();
    });

    $(".select-room .room-class .button").each(function(){
        if ($(this).hasClass("is-active")){
            var target = $(this).data("select");
            $(".room-card").fadeOut();
            $(".room-card." + target).delay(300).fadeIn();
        }
    });


    //Get offers

    var CODE = 'CHR',
        favoriteOne = '45494',
        favoriteTwo = '45330';



    //$.ajaxSetup({xhrFields: { withCredentials: true  } });
    $.ajax({
        type: "GET",
        url: 'http://office-arendator.ru/freerooms/freerooms.xml',
        dataType: "xml",
        success: function (data) {
            $cherry_data =  $(data).find('object[code="' + CODE + '"]').find('room')


            $cherry_data.each(function(index, element){
                var room = $(element)

                var square = room.find('square').text(),
                    type_name = room.find('type_name').text(),
                    type_code = room.find('type_code').text().toLowerCase(),
                    description = room.find('description').text(),
                    price = room.find('price').text(),
                    img = room.find('photo').text(),
                    id = room.find('id').text();


                $cut = 350
                $isAppend = true

                if (id == favoriteOne ){
                    $('.js-favorite-one').find('.about').text(description)
                    $('.js-favorite-one').find('img').attr('src',img)
                    $('.js-favorite-one').find('.title').text(type_name)

                    $isAppend = false
                }

                if (id == favoriteTwo){
                    $('.js-favorite-two').find('.about').text(description)
                    $('.js-favorite-two').find('img').attr('src',img)
                    $('.js-favorite-two').find('.title').text(type_name)

                    $isAppend = false
                }

                if ($isAppend){
                    if (description.length > $cut){
                        description = description.substr(0, $cut) + '...'
                    }

                    $(".cards").append('<div class="card" data-square="' + square  + '" data-type="' + type_code  +  '"data-id="' + id  + '"><div class="card-img"><img src=' + img + '></div>' + '<div class="card-info"><p class="square">' + type_name + " помещение " + square + "м<sup>2</sup>" + '</p>'+ '<p class="description" >' + description  + '</p>'+ '<p class="price">' + price + ' руб/м' + '</p>' + '<p class="send-mail"><button class="button is-circle is-white">оставить заявку</button></p></div></div>');
                }

            })



            //Get image in sidebar

            $.fn.random = function() {
                  return this.eq(Math.floor(Math.random() * this.length));

            }

            // console.log($('.cards').find('.card').random().data('id'))

            $sideImages = $('.small-rental')
            $usedImages = [];
            $usedImages.push(favoriteOne);
            $usedImages.push(favoriteTwo);

            $sideImages.each(function(){
               $isSelected = false
                while (!$isSelected){
                    $randomCard = $('.cards').find('.card').random().data('id');
                    if ($usedImages.indexOf($randomCard) <  0){

                        $usedImages.push($randomCard);
                        $src = $('.cards').find('[data-id="' + $randomCard + '"]').find('img').attr('src');
                        console.log($src);
                        $(this).find('img').attr('src', $src);
                        $isSelected = true;

                    }
                }
            })


        }

    });



    $getMoreCardButton = $("#get-more-cards");

    $getMoreCardButton.click(function(){
        $getMoreCardButton.hide();
        $('.filter').fadeIn();
        $('.cards').find('.card').fadeIn().addClass('visible');
        $selectedDay

      $('.cards').find('.card button').click(function(){
        $("#get-more").modal({
              fadeDuration: 200
        });
    })
    })


    $filter = $('.filter');
    $filterType = $filter.find('.js-type');
    $filterSquare = $filter.find('.js-square');

    $activeType = 'all';
    $activeSquareStart = 0;
    $activeSquareEnd = 10000;


    $filterType.change(function(){
        $activeType = $(this).find("option:selected").val();
        console.log($activeType);

        filterCards($activeType, $activeSquareStart, $activeSquareEnd);
    });

    $filterSquare.change(function(){
        $activeSquareStart = $(this).find("option:selected").data('start');
        $activeSquareEnd   = $(this).find("option:selected").data('end');
        console.log($activeSquareStart, $activeSquareEnd);

        filterCards($activeType, $activeSquareStart, $activeSquareEnd);
    });


    function filterCards($type, $squareStart, $squareEnd){
        $cards = $('.cards').find('.card');
        $cards.removeClass('visible').fadeOut();


        $cards.each(function(){
            $card_type  = $(this).data('type');
            $card_squre = $(this).data('square');

            $eqType = false;
            $eqSqure = false;

            if ($type == 'all'){
                $eqType = true
            }
            else{
                if ($type == $card_type){
                    $eqType = true
                }
            }


            if ($card_squre >= $squareStart && $card_squre <= $squareEnd){
                $eqSqure = true
            }

            if ($eqType && $eqSqure){
                $(this).fadeIn().addClass('visible');

            }

        })

    }


    $('.big-rental button, .room-card button, .more-space button').click(function(){
        $("#get-more").modal({
              fadeDuration: 200
        });
    })

    $('.phone-mask').mask('+7 (999) 999-99-99');


    $('form').submit(function(e){
        e.preventDefault();
        $url = "/mail";
        $data = $(this).serialize();

        $.ajax({
            type: "POST",
            url: $url,
            data: $data,
            success: function(response)
            {
                $('form').find('input').val('');
                $.modal.close();

                $("#thanks").modal({
                    fadeDuration: 200
                });
            }
        });

    });

});
