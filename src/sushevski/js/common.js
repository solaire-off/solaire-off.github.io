$(function() {


	var mobileOffset;

	$( ".cross" ).hide();
	$( ".menu-mobile").css('display',"none");
	$( ".hamburger" ).click(function() {
		$( ".menu-mobile" ).slideToggle( "slow", function() {
			$( ".hamburger" ).hide();
			$( ".cross" ).show();
		});
	});

	$( ".cross" ).click(function() {
		$( ".menu-mobile" ).slideToggle( "slow", function() {
			$( ".cross" ).hide();
			$( ".hamburger" ).show();
		});
	});



	$(".menu-mobile a").click(function(){
		$(".cross").click();
		mobileOffset = $(".menu-mobile").outerHeight()
	});


	$('.menu a, .menu-mobile a ').click(function (event) {
		event.preventDefault();

		elementClick = $(this).attr("href");
		destination = $(elementClick).position().top - mobileOffset;
		$('html,body').stop().animate( { scrollTop: destination }, 1100 );
		mobileOffset = 0;


	});

});
