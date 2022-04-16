/* ================================================================================ */
/* ================================== КОНТАКТЫ ==================================== */
/* ================================================================================ */

/* =========================== ПРИ ЗАГРУЗКИ СТРАНИЦЫ ============================== */

$(".js-form").on("submit", function (e){

  e.preventDefault();

  const formData = {

    name: this.name.value,

    email: this.email.value,

    messages: this.messages.value

  }  // обьект всех полей формы и их значения

  const res = validateForm.call(this,formData); // валидилиет поля

  if(res){

    const options = {
      method: 'post',
      headers : {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch(`https://portfolionikolay.herokuapp.com/sendmail`,options).then(res => {

      console.log(res)

      // обрабатываем ответ от сервера
      if(res.ok){

        // возвращаем json
        return res.json();

      }

      throw new Error("Сервер ответил ошибкой на запрос: вывести список проектов из портфолио");

    })
    .then(data => {

      console.log(data)

    })
    .catch(err => {

      // если есть ошибка
      console.warn(err)

    })

  }

})

$(".form__input, .form__textarea").on("focus", function (e){

  $(this).removeClass("form__input--error form__textarea--error")

})


// Проверяет форму на пустые поля
function validateForm(formData){

  let flag = true

  Object.keys(formData).forEach(val => {

    if(!formData[val]){

      if($(this[val]).hasClass("form__input")){

        $(this[val]).addClass("form__input--error")

      }else {

        $(this[val]).addClass("form__textarea--error")

      }

      flag = false

    }

  });

  return flag

}