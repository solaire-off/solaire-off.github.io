$(function() {

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
