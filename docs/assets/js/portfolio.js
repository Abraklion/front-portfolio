/* ================================================================================ */
/* ================================= ПОРТФОЛИО ==================================== */
/* ================================================================================ */


/* =========================== ПРИ ЗАГРУЗКИ СТРАНИЦЫ ============================== */

// Сколько показывать элементов При загрузки страницы
const numToShowDefault = 5;

// Сколько показывать элементов При нажатии по кнопке "Показать еще"
const numToShow = 4;

// Отбираем в набор все элементы которые будут показывать по клику по кнопки "Показать еще"
let listPortfolio = $(".portfolio__item--hide:not(:last-child)");

// Считаем количество элементов
let numInList = listPortfolio.length;

// Отбираем кнопку показать еще
let buttonMore = $(".js-more__button");

// Если общиее количество элементов больше чем сколько нужно показывать по умолчанию.
if (numInList > numToShowDefault) {

  // показываем блок показать еще
  buttonMore.parent().parent().show();

}

// показываем первые N элементов
listPortfolio.slice(0, numToShowDefault).show();


/* ================================== ПРИ КЛИКЕ ==================================== */

/* при нажатии на таб "Все | На заказ | сортирует какие привью показывать */
$(".portfolio__tab-link").click(function(e) {

  // отменяем действия по умолчанию
  e.preventDefault();

  // получаем дата атрибут активного элемента
  let itemActive = this.dataset.tab;

  // скрываем блок за 100ms и выполняем колбэк функцию
  $(".portfolio__list").fadeOut(100,() => {

    // скрываем блок "показать еще"
    buttonMore.parent().parent().hide();

    // отбираем в набор классы "portfolio__tab-link" и удаляем у них класс portfolio__tab-link--active и атрибут tabindex
    $(".portfolio__tab-link")
      .removeClass("portfolio__tab-link--active")
      .removeAttr("tabindex");

    // классу по которомы произошел клик добавляем класс и атрибут tabindex
    $(this)
      .addClass("portfolio__tab-link--active")
      .attr("tabindex", "-1")
      .blur();

    // скрываем все элементы
    listPortfolio.hide();

    // если в переменная itemActive не равна Все
    if(itemActive !== "Все"){

      // перезаписываем переменную
      listPortfolio = $(".portfolio__item--hide[data-tabs='"+ itemActive +"']");

    }
    // иначе приводим перемнную к первоначальному значению
    else{

      // перезаписываем переменную
      listPortfolio = $(".portfolio__item--hide:not(:last-child)");

    }

    // Считаем количество элементов
    numInList = listPortfolio.length;


    // Если общиее количество элементов больше чем сколько нужно показывать по умолчанию.
    if (numInList > numToShowDefault) {

      // показываем блок показать еще
      buttonMore.parent().parent().show();

    }

    // показываем первые N элементов
    listPortfolio.slice(0, numToShowDefault).show();

  }).fadeIn(300); // Показываем блок за 300ms

});

/* при нажатии на кнопку показать еще */
buttonMore.click(function(e) {

  // отменяем действия по умолчанию
  e.preventDefault();

  // находим все элементы которые видимые
  let showing = listPortfolio.filter(':visible').length;

  // с какого элемента и по какой элемент ( не включительно ) показать
  listPortfolio.slice(showing, showing + numToShow).fadeIn(600);

  // снова находим все элементы которые видимые
  let nowShowing = listPortfolio.filter(':visible').length;

  // если видимых элементов больше или равно всему количеству элементов.
  if (nowShowing >= numInList) {

    // скрываем блок показать еще
    buttonMore.parent().parent().hide();
  }
});