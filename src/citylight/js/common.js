$(function() {

  $("#block-preview").bgswitcher({
    images: [
             // "/img/preview-default.png",
             "/img/preview-red.png",
             "/img/preview-all.png",
             "/img/preview-orange.png",
             "/img/preview-all.png",
            ],

            interval: 6500,
            effect: 'clip',
            duration: 5500,
  });


  function ChangeAnimation(){
    if ($( window ).width() < 900){
        $("#block-preview").bgswitcher({
          effect: 'fade',
        })
      }
    else{
        $("#block-preview").bgswitcher({
          effect: 'clip',
        })
    }
  }
  $( window ).resize(function() {

    ChangeAnimation();

  });

  ChangeAnimation();



  $('.scrollTo, #block-contact .menu a').smoothScroll({
      speed: 1000
      });

  $('.header .menu a').smoothScroll({
      offset: -100,
      speed: 1000
      });


  $('.header .menu a').click(function(){
    if ($('.burger-menu').is(':checked')) {
      $('.burger-menu').prop('checked', false)
    }
  });

});
