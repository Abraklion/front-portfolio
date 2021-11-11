
/* карточка навыков */

const mapTimeout = new Map(); // хранит значения id setTimeout на 10 сек

$('.element').on("click",function () {

  const elementId = this.dataset.order; // находит порядковый номер карточки

  // если не существует класса element--animationRear
  if(!$(this).hasClass("element--animationRear")){

    const chart = $(this).find(".element__chart"); // находит блок круговой диаграммы
    const diagramValue = this.querySelector(".element__chart").dataset.percent; // находит проценты

    // находим блок количество проектов | выбираем его значения | сбрасываем значения на 0
    const quantityElement = this.querySelector(".element__quantity");
    const quantityValue = quantityElement.innerHTML;
    quantityElement.innerHTML = "0";

    // находим блок количество процентов | сбрасываем значения на 0
    this.querySelector(".element__percent").innerHTML = "0";

    // http://rendro.github.io/easy-pie-chart
    chart.data('easyPieChart').disableAnimation(); // отключаем анимацию
    chart.data('easyPieChart').update(0); // скидываем полосу анимации на 0

    $(this).addClass("element--animationRear");

    // проверяем существует ли класс element--animationFront
    if($(this).hasClass("element--animationFront")){

      $(this).removeClass("element--animationFront");

    }

    // анимация круговой диаграммы
    setTimeout( () => {

      // http://rendro.github.io/easy-pie-chart
      chart.data('easyPieChart').enableAnimation(); // включаем анимацию
      chart.data('easyPieChart').update(diagramValue); // даваем нужный процент из переменной diagramValue

      // счетчики процентов и кол-во проектов
      count(this.querySelector(".element__percent"),diagramValue,(1500 / diagramValue) - (0.13 * (1500 / diagramValue)));
      count(this.querySelector(".element__quantity"),quantityValue,(1500 / quantityValue) - (0.13 * (1500 / quantityValue)));

    },1500);


    // через 10 секунд переворачивает карточку
    let idTimeout = setTimeout( () => {

      if($(this).hasClass("element--animationRear")) {

        $(this).addClass("element--animationFront");
        $(this).removeClass("element--animationRear");

      }

    },10000);

    mapTimeout.set(elementId, idTimeout); // добавляем id setTimeout в Map объект
  }
  // если сушествует класс element--animationRear
  else{

    // отменяет idTimeout
    if(mapTimeout.has(elementId)){
      clearTimeout(mapTimeout.get(elementId));
      mapTimeout.delete(elementId);
    }

    $(this).addClass("element--animationFront");
    $(this).removeClass("element--animationRear");

  }

});

// функция считает от 0 до параметра "number" через интервал заданный параметром "interval"
function count (element,number,interval) {

  let num = +number;

  let item = 0;

  let fun = setInterval(function(){
    item +=1;
    if(item === num){
      clearInterval(fun);
    }
    element.innerHTML = item;
  },interval);
}
