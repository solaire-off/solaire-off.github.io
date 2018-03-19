$(function() {

    var start = 0
    var cut = 4


    //set appart number
    $(".offer-wrap").each(function(){
        var start = 0;
        var number = 0;

        $(this).find(".offer").hide();
        $(this).find(".offer").each(function(){
            if (start<cut){
                $(this).show();
            }
            start++;
        })

        $(this).find(".offer-number").each(function(){
            number++;
            $(this).html(number);
            if (start<10) $(this).html("0"+number);
        })
    })


    var cutForFirstOffers= true;
    var access = true

    function getOffersByType(){
        access = false;
        $(".offer-wrap").fadeOut();
        $(".offer").removeClass("is-down");

        var type_of_offers = $(".select-offers .btn.is-active").first().data("target");
        var blockName = $(".js-"+type_of_offers);
        setTimeout(function(){
            blockName.fadeIn();
        },300);



        if (cutForFirstOffers){
            setTimeout(function(){
                blockName.find(".offer").addClass("is-down");
            },400)
        }

        setTimeout(function(){
            access = true
        },800)
    }

    getOffersByType();



    $(".select-offers .btn.type").click(function(){
        if (access && !$(this).hasClass("is-active")){
            $(".select-offers .btn").removeClass("is-active");
            $(this).addClass("is-active");
            getOffersByType();
        }
    })






    $(".get-more-offers button").click(function(){
        $(this).parent().fadeOut();
        console.log("click");
        getMoreOffers();
    })

    function getMoreOffers(){
        $(".offer").removeClass("is-down");
        $(".offer").each(function(){
            if ($(this).css('display') == 'none'){
                   $(this).fadeIn();
              }

        })
        cutForFirstOffers = false;
    }

});
