
/* вызываем слайдер */

$(".js-carousel").slick({
  arrows: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: false,
  swipe: false,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 400,
      }
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
