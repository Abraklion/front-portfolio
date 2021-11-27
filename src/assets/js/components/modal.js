
$(".js-card__link").on("click",function (e){

  e.preventDefault();

  setTimeout(()=>{
    $("body").addClass("body-overflow");
  },400)

  $(".modal").addClass("modal--active");

});

$(".button__modal").on("click",function (e){

  e.preventDefault();

  $("body").removeClass("body-overflow");
  $(".modal").removeClass("modal--active");

});
