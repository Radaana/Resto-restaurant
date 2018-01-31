  $(document).ready(function () {
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 60,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  });