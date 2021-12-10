/* ================================================================================ */
/* ================================= МЕНЮ ========================================= */
/* ================================================================================ */


/* ============================= ПРИ ПРОКРУТКИ ==================================== */

/* красим нужный пункт меню при попадении на соответствующий ему блок при скроле */

$(window).on("scroll load",function (){

  // отбираем блокм у который есть пункт меню
  const block = $("#info, #biography, #portfolio, #skills, #contacts");

  // проходимся в цикле по блокам
  block.each(function (index,element) {

    // если блок с id == portfolio
    if($(this).attr("id") === "portfolio"){

      // вызываем функцию
      pageScroll(this,0,1);

    }
    // если блок с id == skills
    else if($(this).attr("id") === "skills"){

      // вызываем функцию
      pageScroll(this,0,250);

    }
    // если блок с id == contacts
    else if($(this).attr("id") === "contacts"){

      // вызываем функцию
      pageScroll(this,250,0);

    }
    // для всех остальных блоков
    else{

      // вызываем функцию
      pageScroll(this,0,0);

    }

  });
});

/*
*   примимает 3 параметра:
*
*   1. elem - блок
*   2. top - за какое расстояния до блока сверху красить пункт меню
*   2. bottom - сколько нужно заступить в блок снизу пробы покрасить пункт меню
*
* */

function pageScroll(elem,top = 0,bottom = 0) {

  // находим id элемента как строку сохраняем в link
  const link = $(elem).attr("id");

  // Если скролл больше или равен верхний границы элемента (- top) и если скролл меньше нижний границы елемента (- bottom)
  if(pageYOffset >= ($(elem).offset().top - top) && pageYOffset <= ($(elem).offset().top + $(elem).outerHeight(true) - bottom)){

    // красим пункт меню соответствующий этому блоку
    $('.menu__link[href="#'+ link +'"]').addClass("menu__link--active");

  }
  // иначе
  else{

    const linkItem = $('.menu__link[href="#'+ link +'"]');

    // удаляем цвет
    linkItem.removeClass("menu__link--active");

    // удаляем фокус
    linkItem.blur();
  }

}

/* ============================== ПРИ КЛИКЕ =================================== */

/* при нажатии на пункт скролит в соответствующему этому пункту блоку */

$('a[href^="#"]').on("click",function (e){

  // отменяем поведения по умолчанию
  e.preventDefault();

  //находим значения атрибута href
  const nameBox = $(this).attr("href");

  //находим координаты блока относительно верха страницы
  const coordinatesBox = $(nameBox).offset().top;


  // скролим к этому блоку
  $("html, body").animate({
    scrollTop: coordinatesBox
  },{
    duration: 300,   // по умолчанию «400»
    easing: "linear" // по умолчанию «swing»
  })

  // улаляем всплывающию подсказку
  $(".menu__hint").remove();

  // отбираем шапку сайта
  const header = $("#header");

  // если у шапки есть класс header--active
  if(header.hasClass("header--active") ){

    // удаляем header--active и burger--active
    $(header).removeClass("header--active");
    $(".js-burger").removeClass("burger--active");
  }

  // если открыто модальное окно "Подробнее"
  if($(".modal").hasClass("modal--active") ){

    //закрываем окно
    $(".button__modal").trigger("click");

  }

});

/* ============================== ПРИ НАВЕДЕНИИ =================================== */

const linkMenu = $(".menu__link");

// курсор наводится на элемент
$(linkMenu).on("mouseenter",function (e){

  const nameItemMenu = $(this).attr("aria-label");

  $(this).append(`<span class="menu__hint">${nameItemMenu}</span>`);
  $(this).find(".menu__svg").addClass("menu__svg--pointerEvents");

});

// курсор перемещается по элементу
$(linkMenu).on("mousemove",function (e){

  $(this).find(".menu__hint").css({
    top: e.offsetY + 15 +"px",
    left: e.offsetX + 15 + "px"
  });
});

// курсор покидает элемент
$(linkMenu).on("mouseleave",function (e){

  $(".menu__hint").remove();
  $(".menu__svg").removeClass("menu__svg--pointerEvents");

});

