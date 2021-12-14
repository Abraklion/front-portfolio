/* ================================================================================ */
/* ============================= МОДАЛЬНОЕ ОКНО =================================== */
/* ================================================================================ */

let focusTrigger;

// показываем модальное окно
$(".js-card__link").on("click",function (e){

  e.preventDefault();

  setTimeout(()=>{
    $("body").addClass("body-overflow");
  },400)

  $(".modal").addClass("modal--active");

  $("a:not(.menu__link,.header__logo,.modal__link,.modal__team-link), button:not(.button__modal), input, textarea, .skills__slider-bar:not(.slider-bar--off)").attr("tabindex","-1");

  focusTrigger = this;
});

// скрываем модальное окно
$(".button__modal").on("click",function (e){

  e.preventDefault();

  $("body").removeClass("body-overflow");
  $(".modal").removeClass("modal--active");

  $("a:not(.menu__link,.header__logo,.modal__link,.modal__team-link), button:not(.button__modal), input, textarea, .skills__slider-bar:not(.slider-bar--off)").attr("tabindex","0");

  focusTrigger.focus();
});
