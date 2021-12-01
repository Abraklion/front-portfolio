/* ============ Переменные =============*/

const scrollToHandler = document.querySelector(".js-up");
const scrollToHandlerBtn = scrollToHandler.querySelector(".up__button");
const scrollConsultation = document.querySelector("#biography");

/* ============ Переменные =============*/


/* ============ События =============*/

window.addEventListener("scroll", function (){

  const box = scrollConsultation.getBoundingClientRect().top + pageYOffset;

  if(pageYOffset >= box){

    if(!scrollToHandler.classList.contains("up--active")){
      scrollToHandler.classList.add("up--active");
      scrollToHandler.classList.add("up--show");
    }
  }else{

    if(scrollToHandler.classList.contains("up--active")){
      scrollToHandler.classList.remove("up--show");

      setTimeout(function (){
        scrollToHandler.classList.remove("up--active");
      },400);
    }
  }
});

scrollToHandlerBtn.addEventListener("click",function (){

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});

/* ============ События =============*/
