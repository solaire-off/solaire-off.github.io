// Functions
function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
}

function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

function toggleClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  } else {
    elem.className += ' ' + className;
  }
}

var fade = {
  fade_in_from: 0,
  fade_out_from: 10,
};

function fadeOut(element) {
  var target = document.getElementById(element);

  if (getComputedStyle(target, '')['opacity'] == 0) return;

  var newSetting = fade.fade_out_from / 10;
  target.style.opacity = newSetting;
  fade.fade_out_from--;

  if (fade.fade_out_from == 0) {
    target.style.opacity = 0;
    target.style.display = 'none';

    clearTimeout(loopTimer);

    fade.fade_out_from = 10;
    return false;
  }
  var loopTimer = setTimeout("fadeOut('" + element + "')", 50);
}

function FadeIn(element) {
  var target = document.getElementById(element);
  if (getComputedStyle(target, '')['opacity'] == 1) return;
  target.style.display = 'block';
  var newSetting = fade.fade_in_from / 10;
  target.style.opacity = newSetting;
  fade.fade_in_from++;

  if (fade.fade_in_from == 10) {
    target.style.opacity = 1;
    clearTimeout(loopTimer);
    fade.fade_in_from = 0;
    return false;
  }
  var loopTimer = setTimeout("fadeIn('" + element + "')", 50);
}

// Code
document.addEventListener('DOMContentLoaded', function() {
  window.onload = function() {
    setTimeout(function() {
      AOS.init({
        once: true,
      });
    }, 0);
  };


  var mq = window.matchMedia( "(max-width: 770px)" );
  if (mq.matches) {
    var mobileSlider = new Glider(document.querySelector('.section-slider'), {
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      scrollLock: true,
      scrollLockDelay: 450,
      scrollPropagate: true,
      duration: 10,
    })
  }
  else {
    try{
      mobileSlider.destroy();
    }catch(e){
      //
    }
  }


  $burger = Array.prototype.slice.call(
    document.querySelectorAll('.navigation-toogle'),
  );

  $navigation = document.getElementById('navigation')

  if ($burger.length > 0) {
    $burger.forEach(function($el) {
      if (!hasClass($el, 'has-event')) {
        addClass($el, 'has-event');
        $el.addEventListener('click', function() {
            toggleClass($el, 'active-menu');
            toggleClass($el, 'active');
            toggleClass($navigation, 'active');
        });
      }
    });
  }

  $navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.navigation-menu a'),
  );
  if ($navLinks.length > 0) {
    $navLinks.forEach(function($el) {
      if (!hasClass($el, 'has-event')) {
        addClass($el, 'has-event');
        $el.addEventListener('click', function() {
          var jsBurger =  document.getElementById('nav-burger')
          var jsNav = jsBurger.parentElement
          removeClass(jsBurger, 'active');
          removeClass(jsNav, 'active');
        });
      }
    });
  }



  $glitchList = Array.prototype.slice.call(
    document.querySelectorAll('.glitch'),
  );

  function runGlitchToEnd($el) {
    if (!hasClass($el, 'is-active') && !hasClass($el, 'is-used')) {
      addClass($el, 'is-active');
      var $firstState = $el.dataset.firstimg;
      var $secondState = $el.dataset.secondimg;
      var $thirdState = $el.dataset.thirdimg;

      var $mainImg = $el.querySelector('.glitch__img:first-child');
      setTimeout(function() {
        $mainImg.style.backgroundImage = 'url(' + $secondState + ')';
      }, 250);
      setTimeout(function() {
        $mainImg.style.backgroundImage = 'url(' + $thirdState + ')';
      }, 500);
      setTimeout(function() {
        removeClass($el, 'is-active');
        toggleClass($el, 'is-used');
        if (hasClass($el, 'has-mouseout')) {
          runGlitchToStart($el);
        }
      }, 850);
    }
  }

  function runGlitchToStart($el) {
    if (!hasClass($el, 'is-active') && hasClass($el, 'is-used')) {
      addClass($el, 'is-active');
      var $firstState = $el.dataset.firstimg;
      var $secondState = $el.dataset.secondimg;
      var $thirdState = $el.dataset.thirdimg;

      var $mainImg = $el.querySelector('.glitch__img:first-child');
      setTimeout(function() {
        $mainImg.style.backgroundImage = 'url(' + $secondState + ')';
      }, 250);
      setTimeout(function() {
        $mainImg.style.backgroundImage = 'url(' + $firstState + ')';
      }, 500);
      setTimeout(function() {
        removeClass($el, 'is-active');
        toggleClass($el, 'is-used');
      }, 850);
    }
  }

  if ($glitchList.length > 0) {
    imagesLoaded('.glitch__img', {background: true}, function() {
      $sleep = 500;
      $glitchList.forEach(function($el) {
        setTimeout(function() {
          runGlitchToEnd($el);
        }, $sleep);
        $sleep += 1000;
      });

      $sleepReset = 300;
      setTimeout(function() {
        $glitchList.forEach(function($el) {
          setTimeout(function() {
            runGlitchToStart($el);
          }, $sleepReset);
          $sleepReset += 500;
        });
      }, 3500);

      setTimeout(function() {
        $glitchList.forEach(function($el) {
          $el.addEventListener('mouseover', function(e) {
            addClass($el, 'has-mouseover');
            removeClass($el, 'has-mouseout');

            runGlitchToEnd($el);
            e.preventDefault();
          });
          $el.addEventListener('mouseout', function(e) {
            addClass($el, 'has-mouseout');
            removeClass($el, 'has-mouseover');
            runGlitchToStart($el);
            e.preventDefault();
          });
        });
      }, 4000);
    });
  }
});
