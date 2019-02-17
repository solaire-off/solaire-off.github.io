$(function() {
  // new fullpage('#fullpage', {
  //   //options here
  //   autoScrolling: true,
  //   scrollHorizontally: true,
  //   // verticalCentered: true,
  //   sectionSelector: '.section',
  //   scrollOverflow: true,
  //   onLeave: function(origin, destination, direction){
  //     if (destination.anchor === 'contact-mobile'){
  //       if (!window.matchMedia("(max-width: 768px)").matches) {
  //         return false;
  //       }
  //     }
  //   }
  // });
  //



  $(window).bind('scroll', function () {
    if ($(window).scrollTop() > 200) {
      $('.fixed-menu').addClass('is-active');
    } else {
      $('.fixed-menu').removeClass('is-active');
    }
  });

  function getShuffleListFromTo(max){
    list = []
    randList = []
    for (var i = 0; i < max; i++) {
      list.push(i);
    }
    while( list.length ) {
      index = Math.floor( Math.random()*list.length );
      randList.push(list[index])
      list.splice( index, 1 ); // Remove the item from the array
    }
    return randList
  }

  function checkSize(){
    if (window.matchMedia("(max-width: 768px)").matches)
    {
      if (!$('.row.md-slider').hasClass('slick-initialized'))
      {
        $('.row.md-slider').slick();
      }
    }
    else
    {
      if ($('.row.md-slider').hasClass('slick-initialized'))
      {
        $('.row.md-slider').slick('unslick');
      }
    }
  }

  $(window).on('resize', function(){
    checkSize()
  });

  $(".hamburger").click(function(){
    $(this).toggleClass("is-active");
    $('.header > nav').toggleClass("is-active");
  });

  // On load
  checkSize()

  $cardsRow = $(".js-cards")
  $cardsLastIndex = 0;
  $cardsActiveIndex = null;
  $cardsIsRandomOrder = $cardsRow.hasClass("js-cards--random")
  $cardsRandomOrderList = []
  $cardsHasCount = $cardsRow.hasClass("js-cards--count")


  // Change count

  if ($cardsHasCount){
    $cardsCols = $cardsRow.find("> [class*='col']")
    $count = parseInt($cardsRow.attr("data-count"))
    while ($cardsCols.length > $count){
      
      $cardsCols.eq([Math.floor(Math.random()*$cardsCols.length)]).remove()
      $cardsCols = $cardsRow.find("> [class*='col']")
    }
  }
  // Random order

  if ($cardsIsRandomOrder){
    $cardsCols = $cardsRow.find("> [class*='col']")
    $cardsRandomOrderList = getShuffleListFromTo($cardsCols.length)
    $cardsCols.each(function(index,el){
      $position = $cardsRandomOrderList[index]
      $(el).css("order", $position).attr('data-positon', $position)
    });
  }

  


  if ($cardsRow.length){
    $cards = $cardsRow.find('.card')
    $cards.each(function(index,el){
      $colIndex = $(el).parent().attr('data-positon')
      $index = $cardsIsRandomOrder ? $colIndex : index;
      $(el)
        .attr('data-number', $index)
        .find('.js-card-get-more-info')
        .attr('data-number', $index)
      $cardsLastIndex = $cardsLastIndex < $index ? $index : $cardsLastIndex;
    })



    if ($("#js-random-right-card").length){
      $someRandomFirstCard = $cards.eq(0)
      $someRandomFirstCard.parent().addClass("d-block d-md-none")
      $("#js-random-right-card").append($someRandomFirstCard)
    }


    $cardModal = $('#card-info')
    $cardModalContent = $cardModal.find('.container')

    $('.js-card-get-more-info').click(function(e){
      e.preventDefault()

      $cardNumber  = $(this).attr('data-number')
      $cardContent = null;
      $cardsActiveIndex = $cardNumber;

      $cards.each(function(index,el){
        if ($(el).attr('data-number') === $cardNumber){
          $cardContent = $(el).find('.js-card-more-info').html()
        }
      })
      $cardModalContent.html($cardContent)
      $cardModal.modal()
    })

    function getNextCard(){
      $cardsActiveIndex = $cardsActiveIndex == $cardsLastIndex ? 0 : parseInt($cardsActiveIndex) + 1 ;
      $cardNumber  = $cardsActiveIndex;

      $cardContent = null;
      $cards.each(function(index,el){
        if ($(el).attr('data-number') == $cardNumber){
          $cardContent = $(el).find('.js-card-more-info').html()
          console.log('select card:' + $(el).attr('data-number'))
        }
      })
      $.modal.close();

      $cardModalContent.html($cardContent)

      $cardModal.modal()
    }


    window.getNextCard = getNextCard
    $cardModalContent.on("click", ".js-card-next-info", function(e) {
      getNextCard()
    })

    // Open modal && Add addon name to hidden input into modal
    // For moduls
    function getThisAddon(el){
      $name = $(el).parent().parent().parent().find(".modal-title").html()
      console.log($name)
      $inputHidden =  $("#addon_name_input")
      $inputHidden.attr('value',"Модуль: " + $name)
      $.modal.close();
      $("#order-addon").modal()
    }
    window.getThisAddon = getThisAddon
    $cardModalContent.on("click", ".js-get-this-addon", function(e) {
      getThisAddon(this)
    })


    // $(".js-append-random-card-from").each(function(){
    //   $idFrom = $(this).attr("data-id-from")
    //   $cards = $("#"+$idFrom).find('.card')
    //   $card = $cards[Math.floor(Math.random()*$cards.length)]
    //   $(this).html($card)
    // })
  }

  $('label[data-caption="Телефон"] input').mask("+7 (999) 999-99-99");

  $(".jumbotron.with-img-bg.is-slider").bxSlider({
      mode : 'fade',
      auto: true,
      controls : false,
      randomStart : true,
      stopAutoOnClick : true
  });



});
