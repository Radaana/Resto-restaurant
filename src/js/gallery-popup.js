$(document).ready(function() { 

  $(".gallery__img").click(function(){  
    if ($('.maincontent').outerWidth() > 768) {
      let img = $(this); 
      let src = img.attr('src').slice(0, -4); 
      $(".gallery__list").append("<div class='popup'>"+ 
                      "<div class='popup_bg'></div>"+ 
                      "<img src='"+src+"-big.png' class='popup_img' />"+ 
                      "</div>");

      $(".popup").fadeIn(400); 
      $(".popup_bg").add('.popup').click(function(){ 
        $(".popup").fadeOut(400);
        setTimeout(function() {
          $(".popup").remove(); 
        }, 400);
      });
    }
    
  }); // Click END
}); // ready END