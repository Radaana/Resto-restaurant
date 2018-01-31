let RatingWidget = (function () {
  let starList = function (amount) {
    let starsArray = [];

    for (var i = 0; i < 5; i++) {
      let starClass = (i < amount) 
                    ? 'rating__star rating__star--filled' 
                    : 'rating__star';
      let star = $('<li>', {
        class : starClass,
      });
      starsArray.push(star);

    }

    return starsArray;
  };

  let markupGenerator =  function(amount, elementToAppend) {
    let stars = starList(amount);
    let ul = $('<ul>', {
      class : 'rating__list',
      html : stars
    })
    elementToAppend.append(ul);

  };

return {
    init: function() {
      $('.rating').each(function() {
        let $this = $(this);
        let ratingAmount = $this.data('rating');
        markupGenerator(ratingAmount , $this );
        
      });
    }
  }
}());

$(document).ready(function() {
  if ($('.rating').length) {
      RatingWidget.init();
  }

});