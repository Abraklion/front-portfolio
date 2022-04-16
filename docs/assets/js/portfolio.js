/* ================================================================================ */
/* ================================= ПОРТФОЛИО ==================================== */
/* ================================================================================ */

// отпрвляем fetch запрос на сервер и выводим привью проектов
fetch(config.requestAllProject,{method: 'get'})
  .then(res => {

    // погрузчик
    $('.portfolio')
      .find('.portfolio__tab')
      .after('<div class="loader"></div>');

    // обрабатываем ответ от сервера
    if(res.ok){

      // возвращаем json
      return res.json();

    }

    throw new Error("Сервер ответил ошибкой на запрос: вывести список проектов из портфолио");

  })
  .then(data =>{

    // отрабатываем данные пришедшие от сервера
    const html = data.map(post => renderPost(post))

    // удаляем погрузчик
    $('.portfolio')
      .find('.loader')
      .remove();

    // добавляем посты на страницу
    $('.portfolio__list')
      .prepend(html.join(' '))


    // если массив с постами не пустой
    if(html.length){

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
      listPortfolio.slice(0, numToShowDefault).fadeIn(300);

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

          // классу по которому произошел клик добавляем класс и атрибут tabindex
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
      
        // отпрвляем fetch запрос на сервер и выводим подробнно проект
        fetch(`${config.requestAllProject}${this.dataset.id}`,{method: 'get'})
          .then(res => {
      
            // погрузчик
            $('.modal')
              .find('.container')
              .prepend('<div class="loader loader--center"></div>');
      
            // обрабатываем ответ от сервера
            if (res.ok) {
      
              // возвращаем json
              return res.json();
      
            }
      
            throw new Error("Сервер ответил ошибкой на запрос: вывести проект подробно");
      
          })
          .then(data => {
      
            // отрабатываем данные пришедшие от сервера
            const html = renderFullPost(data)
      
            // удаляем погрузчик
            $('.modal')
              .find('.loader')
              .remove();
      
            // добавляем категории на страницу
            $('.modal__inner')
              .prepend(html)
      
          })
          .catch(err => {
      
            // если есть ошибка
            console.warn(err);
      
          });
      });
      
      // скрываем модальное окно
      $(".button__modal").on("click",function (e){
      
        e.preventDefault();
      
        $("body").removeClass("body-overflow");
        $(".modal").removeClass("modal--active");
        $(".modal__title,.modal__box,.modal__info").remove();
      
        $("a:not(.menu__link,.header__logo,.modal__link,.modal__team-link), button:not(.button__modal), input, textarea, .skills__slider-bar:not(.slider-bar--off)").attr("tabindex","0");
      
        focusTrigger.focus();
      });
      
      
      /* отрисовывает пост подробно */
      function renderFullPost(fullPost, options = {}) {
      
        // путь до картинок
        const [webpImgAll,webpImgAllx2,webpImgAllx3,webpImgXl,webpImgXlx2,webpImgXlx3] = fullPost.img.webp
        const [pngImgAll,pngImgAllx2,pngImgAllx3,pngImgXl,pngImgXlx2,pngImgXlx3] = fullPost.img.png
      
        // организация
        const organization = fullPost.p_organization.trim() ?
          `<li class="modal__item modal__item--company" title="Заказчик">${fullPost.p_organization}</li>` :
          ''
      
        // ссылка на репозиторий
        const projectGit = fullPost.p_git.trim() ?
          `<li class="modal__item modal__item--github">
             <a class="modal__link" href="${fullPost.p_git}" target="_blank">Ссылка на репозиторий</a>
          </li` :
          ''
      
        // список навыков
        const skills = fullPost.skills.map(skill => {
      
          return `<li class="modal__technology-item">${skill}</li>`
      
        })
      
        // список команды
        const teams = fullPost.team_link.map(team => {
      
          return `
            <li class="modal__team-item">
              <a class="modal__team-link" href="${team.b_link}" target="_blank">${team.b_name} (${team.b_post})</a>
            </li>
          `
      
        })
      
        // проверяем если ли команда
        const teamList = fullPost.team_link.length !== 0 ?
          `
            <li class="modal__info-list">
              <div class="modal__info-subtitle">Принимали участие:</div>
              <ul class="modal__team">
                ${ teams.join(' ') }
              </ul>
            </li>
          ` :
          ''
      
        // Шаблон
        return `
          <h2 class="modal__title">${fullPost.p_name}</h2>
          <div class="modal__box">
            <div class="modal__img">
              <picture>
                <source media="(min-width: 768px) and (max-width: 991px)" srcset="https://portfolionikolay.herokuapp.com/${webpImgXl}, https://portfolionikolay.herokuapp.com/${webpImgXlx2} 2x, https://portfolionikolay.herokuapp.com/${webpImgXlx3} 3x" type="image/webp">
                <source media="(min-width: 768px) and (max-width: 991px)" srcset="https://portfolionikolay.herokuapp.com/${pngImgXl}, https://portfolionikolay.herokuapp.com/${pngImgXlx2} 2x, https://portfolionikolay.herokuapp.com/${pngImgXlx3} 3x" type="image/png">
                <source media="(max-width: 767px), (min-width: 992px)" srcset="https://portfolionikolay.herokuapp.com/${webpImgAll}, https://portfolionikolay.herokuapp.com/${webpImgAllx2} 2x, https://portfolionikolay.herokuapp.com/${webpImgAllx3} 3x" type="image/webp">
                <img src="https://portfolionikolay.herokuapp.com/${pngImgAll}" srcset="https://portfolionikolay.herokuapp.com/${pngImgAllx2} 2x, https://portfolionikolay.herokuapp.com/${pngImgAllx3} 3x" loading="lazy" alt="">
              </picture>
            </div>
            <ul class="modal__list">
              ${organization}
              <li class="modal__item modal__item--type" title="Тип сайта">${fullPost.view}</li>
              <li class="modal__item modal__item--internet">
                <a class="modal__link" href="${fullPost.p_link}" target="_blank">Ссылка на проект</a>
              </li>
              ${projectGit}
            </ul>
          </div>
          <ul class="modal__info">
            <li class="modal__info-list">
              <div class="modal__info-subtitle">Кратко о проекте:</div>
              <p class="modal__info-text">${fullPost.p_description}</p>
            </li>
            <li class="modal__info-list">
              <div class="modal__info-subtitle">Что было сделано мной:</div>
              <p class="modal__info-text">${fullPost.p_i_did}</p>
            </li>
            <li class="modal__info-list modal__info-list--mb">
              <div class="modal__info-subtitle">Использовал Технологии:</div>
              <ul class="modal__technology">
                ${ skills.join(' ') }
              </ul>
            </li>
            ${teamList}
          </ul>
        `
      }
    }

  })
  .catch(err => {

    // если есть ошибка
    console.warn(err);

  });

/* отрисовывает пост */
function renderPost(post, options = {}) {

  // путь до картинок
  const [webpImgAll,webpImgAllx2,webpImgAllx3,webpImgXl,webpImgXlx2,webpImgXlx3] = post.img.webp
  const [pngImgAll,pngImgAllx2,pngImgAllx3,pngImgXl,pngImgXlx2,pngImgXlx3] = post.img.png

  // Шаблон
  return `
    <li class="portfolio__item portfolio__item--hide" data-tabs="${post.category}">
      <article class="card">
        <header class="card__header">
          <h2 class="visually-hidden">${post.p_name}</h2>
          <div class="card__images">
            <picture>
              <source media="(min-width: 1200px)" srcset="https://portfolionikolay.herokuapp.com/${webpImgXl}, https://portfolionikolay.herokuapp.com/${webpImgXlx2} 2x, https://portfolionikolay.herokuapp.com/${webpImgXlx3} 3x" type="image/webp"/>
              <source media="(min-width: 1200px)" srcset="https://portfolionikolay.herokuapp.com/${pngImgXl}, https://portfolionikolay.herokuapp.com/${pngImgXlx2} 2x, https://portfolionikolay.herokuapp.com/${pngImgXlx3} 3x" type="image/png"/>
              <source media="(max-width: 1199px)" srcset="https://portfolionikolay.herokuapp.com/${webpImgAll}, https://portfolionikolay.herokuapp.com/${webpImgAllx2} 2x, https://portfolionikolay.herokuapp.com/${webpImgAllx3} 3x" type="image/webp"/>
              <img class="card__img" src="https://portfolionikolay.herokuapp.com/${pngImgAll}" srcset="https://portfolionikolay.herokuapp.com/${pngImgAllx2} 2x, https://portfolionikolay.herokuapp.com/${pngImgAllx3} 3x" loading="lazy" alt=""/>
            </picture>
            <div class="card__category">${post.category}</div>
          </div>
        </header>
        <footer class="card__footer">
          <a class="card__link" href="${post.p_link}" target="_blank">На сайт</a>
          <a class="card__link js-card__link" href="#" data-id="${post.id_project}">Подробнее</a>
        </footer>
      </article>
    </li>
  `
}