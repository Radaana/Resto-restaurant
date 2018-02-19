  $(document).ready(function () {

    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 60,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        // when window width is <= 400px
        400: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        // when window width is <= 500px
        480: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is <= 800px
        800: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    }); // swiperInit END
  }); // ready END