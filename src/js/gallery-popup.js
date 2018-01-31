$(document).ready(function() { // Ждём загрузки страницы

  $(".gallery__img").click(function(){  
    let img = $(this);    // Получаем изображение, на которое кликнули
    let src = img.attr('src').slice(0, -4); // Достаем из этого изображения путь до картинки
    $(".gallery__list").append("<div class='popup'>"+ //Добавляем в тело документа разметку всплывающего окна
                    "<div class='popup_bg'></div>"+ // Блок, который будет служить фоном затемненным
                    "<img src='"+src+"-big.png' class='popup_img' />"+ // Само увеличенное фото
                    "</div>");

    $(".popup").fadeIn(400); // Медленно выводим изображение
    $(".popup_bg").add('.popup').click(function(){    // Событие клика на затемненный фон      
      $(".popup").fadeOut(400);    // Медленно убираем всплывающее окно
      setTimeout(function() {    // Выставляем таймер
        $(".popup").remove(); // Удаляем разметку всплывающего окна
      }, 400);
    });
  });
}); // READY end