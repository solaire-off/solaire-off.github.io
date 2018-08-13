$(function() {

  var methods = {
    init : function( options ) {


      // Default options
      var settings = $.extend({
        cover: true,
        autoplay: false,
      }, options );


      this.each(function( ){

        var self = $(this);

        var currentSlide = 0;
        var countThumbnails = lastThumbnails = 3;
        var autoplay = false;

        $(this).addClass('awesome-slider').children().wrap('<div class="awesome-slider_item"></div>');
        var slide = $(this).find('.awesome-slider_item');


        var countSlide = slide.length;

        $(this).wrap('<div class="awesome-wrap"></div>');

        $('<div class="awesome-slider_navigation"></div>' ).insertAfter($(this));

        var nav = $(this).parent().find('.awesome-slider_navigation');

        nav.append('<div class="awesome-slider_thumbnails-viewport"><div class="awesome-slider_thumbnails-list"></div></div>');
        var thumbnailsList = nav.find('.awesome-slider_thumbnails-list');


        nav.append('<span class="awesome-slider_arrow awesome-slider_arrow__right">&#8250;</span>')
          nav.find('.awesome-slider_arrow__right').click(function(){
            self.awesomeSlider('nextThumbnails');
          });

        nav.append('<span class="awesome-slider_arrow awesome-slider_arrow__left">&#8249;</span>')
          nav.find('.awesome-slider_arrow__left').click(function(){
            self.awesomeSlider('prevThumbnails');
          });


        slide.each(function(index,el){
          image = $(el).find('img');
          thumbnailsList.append('<img data-index="' + index + '"  class="awesome-slider_thumbnail" src="' + $(image).attr('src') + '">')
        })

        var thumbnails = thumbnailsList.find('.awesome-slider_thumbnail');

        self.data('awesomeslider', {
          currentSlide: currentSlide,
          thumbnails: thumbnails,
          lastThumbnails : lastThumbnails,
          countThumbnails : countThumbnails,
          thumbnailsList : thumbnailsList,
          countSlide : countSlide,
          slide : slide,
          autoplay : autoplay,
          autoPlayInterval : null,
        });

        thumbnails.click(function(){
          self.awesomeSlider('getCurrentSlide', $(this).attr('data-index'))
        })

        // Apply options
        if (settings.cover === true) slide.addClass('awesome-slider_item__cover');
        if (settings.autoplay == true){
          self.awesomeSlider('autoPlay');
        }




      });

    },
    nextThumbnails : function( ) {
      return this.each(function() {
        var data = $(this).data('awesomeslider');

        if (data.lastThumbnails < data.countSlide - 1){
          var lastThumbnails = data.lastThumbnails + 1;
          var translateX = 25 * (lastThumbnails - data.countThumbnails);
          data.thumbnailsList.css('transform','translateX(-' + translateX + '%)');
        }

        $.extend(data,{
          lastThumbnails : lastThumbnails
        });
        $(this).data(data);

      })
    },
    prevThumbnails : function( ) {
      return this.each(function() {
        var data = $(this).data('awesomeslider');

        if (data.lastThumbnails > data.countThumbnails){
          var lastThumbnails = data.lastThumbnails - 1;
          translateX = 25 * (lastThumbnails - data.countThumbnails);
          data.thumbnailsList.css('transform','translateX(-' + translateX + '%)');
        }

        $.extend(data,{
          lastThumbnails : lastThumbnails
        });
        $(this).data(data);

      })
    },
    nextSlide : function( ) {
      return this.each(function() {
        var data = $(this).data('awesomeslider');

        var currentSlide = data.currentSlide +  1;

        data.thumbnails.removeClass('is-active');

        var translateX = 100 * currentSlide;

        if (currentSlide === data.countSlide){
          currentSlide = 0;
          translateX = 0;
        }

        $(data.thumbnails[currentSlide]).addClass('is-active');

        data.slide.each(function() {
            $(this).css('transform','translateX(-' + translateX + '%)');
        });

        $.extend(data,{
          currentSlide : currentSlide
        });
        $(this).data(data);
      });
    },

    prevSlide : function( ) {
      return this.each(function() {
        var data = $(this).data('awesomeslider');

        var currentSlide = data.currentSlide -  1;

        data.thumbnails.removeClass('is-active');

        if (currentSlide < 0 ){
          currentSlide = data.countSlide - 1;
        }

        $(data.thumbnails[currentSlide]).addClass('is-active');

        var translateX = 100 * currentSlide;

        data.slide.each(function() {
          $(this).css('transform','translateX(-' + translateX + '%)');
        });

        $.extend(data,{
          currentSlide : currentSlide
        });
        $(this).data(data);
      });

    },
    autoPlay : function( ){
      return this.each(function() {

        var data = $(this).data('awesomeslider');
        var self = $(this)

        data.thumbnails.removeClass('is-active');

        var autoplay = data.autoplay;
        var autoPlayInterval = data.autoPlayInterval;

        if (autoplay == false){
          autoplay = true;
          autoPlayInterval = setInterval(function () {
            self.awesomeSlider('nextSlide')
          }, 5000);
        }
        else{
          autoplay = false;
          clearInterval(autoPlayInterval);
        }

        $.extend(data,{
          autoplay : autoplay,
          autoPlayInterval: autoPlayInterval
        });

        $(this).data(data);
      });
    },
    getCurrentSlide : function( slideNumber ) {
      return this.each(function() {
        var data = $(this).data('awesomeslider');

        data.thumbnails.removeClass('is-active');

        var currentSlide = slideNumber - 1;

        var translateX = slideNumber * 100;
        $(data.thumbnails[slideNumber]).addClass('is-active');

        data.slide.each(function() {
          $(this).css('transform','translateX(-' + translateX + '%)');
        });

        $.extend(data,{
          currentSlide : currentSlide
        });
        $(this).data(data);

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
