$(function() {

  function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
  }


  AOS.init({
    duration: 1200, 
  });

  new Glide('#red-bc', {
    autoplay: 5000
	}).mount()
  new Glide('#silver-bc', {
    autoplay: 5000
	}).mount()
  new Glide('#villa-bc', {
    autoplay: 5000
	}).mount()
  new Glide('#cherry-bc', {
    autoplay: 5000
	}).mount()

  // $('.c-burger').click(function(){
  //   $(this).toggleClass('is-active')
  //
  // })

  $('input[name="phone"]').mask("+7-(999)-999-9999"); 


  $(".js-toggle-modal").click(function(e){
    e.preventDefault()
    $target = $(this).attr('data-modal')
    $modal  = document.getElementById($target)
    $modal.style.display = 'block'
    $modal.getElementsByClassName('c-modal__close')[0].onclick = function(e){
      $modal.style.display = 'none'
    }
    window.onclick = function (event) {
      if (event.target == $modal){
        $modal.style.display = 'none'
      }
    }
  })

  $('.c-form').submit(function (e) {
    var form = $(this);
    var url = form.attr('action');
    var modalSendSuccess = document.getElementById('send-success')
    // console.log($.map($('input[name="sq"]:checked'), function(c){return c.value; }).join('; '))
    // console.log($.map($('input[name="typesquare"]:checked'), function(c){return c.value; }).join('; '))
    e.preventDefault()

    $.post('/mail/callbackSale.php', { 

      name: form.find('input[name="name"]').val(),
      phone: form.find('input[name="phone"]').val(),
      time: formatDate(new Date()),
      sale: 'Rent',
      square : $.map(form.find('input[name="sq"]:checked'), function(c){return c.value; }).join('; '),
      typesquare: $.map(form.find('input[name="typesquare"]:checked'), function(c){return c.value; }).join('; ')


    }, function(data){        
      //console.log(data);
      if (1)
      {
        console.log('Success send')

        $(".c-modal").css('display','none')

        modalSendSuccess.style.display = 'block'
        modalSendSuccess.getElementsByClassName('c-modal__close')[0].onclick = function(e){
          modalSendSuccess.style.display = 'none'
        }

        window.onclick = function (event) {
          if (event.target == modalSendSuccess){
            modalSendSuccess.style.display = 'none'
          }
        }
      }
      else
      {
        console.log('Fail send')
      }

    });
  })





});
