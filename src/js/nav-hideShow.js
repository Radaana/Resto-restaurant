$(document).ready(function() { 
        let nav = $('.nav');
        let ham = $('#hamburger-menu');
        let reqHeight;
        

    ham.on('click touchstart', e =>{
        e.preventDefault();
        if (nav.outerWidth() > 480) {
            reqHeight = 55;
        } else {
            reqHeight = 110;
        }

        if (ham.hasClass('hamburger-menu--close')) {
            ham.removeClass('hamburger-menu--close');
            nav.css({
              'height' : 0
            });

        } else {
            ham.addClass('hamburger-menu--close');
            nav.css({
              'height': reqHeight
            });
            console.log(reqHeight);
        }

    }); //click END

});