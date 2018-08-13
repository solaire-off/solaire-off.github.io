$(function() {

	var methods = {
    init : function( options ) {


			// Default options
			var settings = $.extend({
					cover: true
			}, options );



			// Base

      currentSlide = 0;
      countThumbnails = lastThumbnails = 3;

      $(this).addClass('awesome-slider').children().wrap('<div class="awesome-slider_item"></div>');
      slide = $(this).find('.awesome-slider_item');


      countSlide = slide.length;

      $('<div class="awesome-slider_navigation"></div>' ).insertAfter($(this));

      nav = $('.awesome-slider_navigation');

      nav.append('<div class="awesome-slider_thumbnails-list"></div>');
      thumbnailsList = nav.find('.awesome-slider_thumbnails-list');


      nav.append('<span class="awesome-slider_arrow awesome-slider_arrow__right">&#8250;</span>')
      nav.find('.awesome-slider_arrow__right').click(function(){
        $(this).awesomeSlider('nextThumbnails');
      });

      nav.append('<span class="awesome-slider_arrow awesome-slider_arrow__left">&#8249;</span>')
      nav.find('.awesome-slider_arrow__left').click(function(){
        $(this).awesomeSlider('prevThumbnails');
      });


      slide.each(function(index,el){
        image = $(el).find('img');
        thumbnailsList.append('<img data-index="' + index + '"  class="awesome-slider_thumbnail" src="' + $(image).attr('src') + '">')
      })

      thumbnails = thumbnailsList.find('.awesome-slider_thumbnail');
      thumbnails.first().addClass('is-active');

      thumbnails.click(function(){

        thumbnails.removeClass('is-active');

        $(this).addClass('is-active');

        $(this).awesomeSlider('getCurrentSlide', $(this).attr('data-index'))

      })


			// Apply options

			if (settings.cover === true) slide.addClass('awesome-slider_item__cover');


    },

    nextThumbnails : function( ) {
      if (lastThumbnails < countSlide - 1){
        lastThumbnails += 1;
        // 20 width
        // 2.5 m-x
        // (2.5*2)/20*100=25.0
        translateX = 125 * (lastThumbnails - 3);
        thumbnails.each(function()
        {
          $(this).css('transform','translateX(-' + translateX + '%)');
        });
      }
    },
    prevThumbnails : function( ) {
      if (lastThumbnails => countThumbnails){
        lastThumbnails -= 1;
        translateX = 125 * (lastThumbnails - 3);
        thumbnails.each(function()
        {
          $(this).css('transform','translateX(-' + translateX + '%)');
        });
      }
    },
    nextSlide : function( ) {
      currentSlide += 1;
      translateX = 100 * currentSlide;
      slide.each(function()
      {
        $(this).css('transform','translateX(-' + translateX + '%)');
      });
    },

    prevSlide : function( ) {
      currentSlide -= 1;
      translateX = 100 * currentSlide;
      slide.each(function()
      {
        $(this).css('transform','translateX(-' + translateX + '%)');
      });
    },

    getCurrentSlide : function( slideNumber ) {
      translateX = slideNumber * 100;

      slide.each(function()
      {
        $(this).css('transform','translateX(-' + translateX + '%)');
      });
    }
  };

  $.fn.awesomeSlider = function( method ) {
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.awesomeSlider' );
    }
  };

});
