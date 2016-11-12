(function () {
    $(window).load(function () {
        startAnimations();
    });
    $('.home').bind('click', function () {
        if (!$(".nav-custom").hasClass("activeMain")) {
            startAnimations();
        }
    });
    $('.listlink').bind('click', function () {
        $(".nav-custom").removeClass("activeMain");
    });

    function startAnimations() {
        $(".nav-custom").css({
            'transition-property': 'none'
            , 'opacity': '0'
            , 'transform': 'translate(0px,-70px)'
        });
        setTimeout(function () {
            $(".landingpage").css({
                'opacity': '1'
            });
        }, 300);
        setTimeout(function () {
            $(".nav-custom").css({
                'transition': 'all 0.7s ease-in-out'
                , 'transform': 'translate(0px,0px)'
                , 'opacity': '1'
            });
        }, 500);
        setTimeout(function () {
            $(".hero").css({
                'transform': 'translate(0px,0px)'
                , 'opacity': '0.9'
            });
        }, 900);
        setTimeout(function () {
            $(".logo").css({
                'opacity': '1'
            });
        }, 1400);
        $(".nav-custom").addClass("activeMain");
    }
})();