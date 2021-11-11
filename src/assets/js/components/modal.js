
$(".js-card__link").on("click",function (e){

  e.preventDefault();

  $("body").addClass("body-overflow");
  $(".modal").addClass("modal--active");

});

$(".button__modal").on("click",function (e){

  e.preventDefault();

  $(".modal").removeClass("modal--active");
  $("body").removeClass("body-overflow");

});
