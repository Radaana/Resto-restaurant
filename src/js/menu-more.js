$(document).ready(function() {
  $('.more').on('click touchstart', function(e) {
        e.preventDefault();
        let $this = $(this);
        let menu = $this.prev();
        let hidden = 'menu__list--hidden';

        if (menu.hasClass(hidden)) {
          menu.slideDown('400', function() {
            menu.removeClass(hidden);
            $this.children().addClass('more__link--opened');
          });
        } else {
          menu.slideUp('400', function() {
            menu.addClass(hidden);
            $this.children().removeClass('more__link--opened');
          });
        }
    }); // more END
    
  }); // ready END
  

