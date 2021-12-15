/* Скролльте в низ что бы увидеть настройки вызова слайдера */

/*  Слайдер  |  https://kenwheeler.github.io/slick/  */
//= ../../../../node_modules/slick-carousel/slick/slick.js

/* вызываем слайдер */

$(".js-carousel").slick({
  arrows: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: false,
  swipe: false,
  mobileFirst: true,
  infinite: false,
  prevArrow: "<button type='button' class='slick-prev'><span class='visually-hidden'>Предыдущий слайдер</span></button>",
  nextArrow: "<button type='button' class='slick-next'><span class='visually-hidden'>Следующий слайдер</span></button>",
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        speed: 500,
      }
    },
    {
      breakpoint: 1499,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        speed: 500,
      }
    },
  ]
});


