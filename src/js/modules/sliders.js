import $ from 'jquery';
import slick from 'slick-carousel';

export const sliders = () => {
  $('.slider').slick({
    fade: true,
    prevArrow: $('.slick-prev'),
    nextArrow: $('.slick-next'),
    swipe: false
  });

  const titleArr = $('.slide-info__title'); // коллекция заглавий
  const titleLength = titleArr.length;
  let NUMBER_PREV = titleLength - 1; // начальное значение индекса предыдущего слайда
  let NUMBER_NEXT = 1; // начальное значение индекса следующего слайда
  let textNamePrev = $(titleArr[NUMBER_PREV]).text();
  let textNameNext = $(titleArr[NUMBER_NEXT]).text();

  const slickBtn = $('.slick-arrow'); // коллекция кнопок

  $('.slick-arrow__name_prev').text(textNamePrev); // изминение текста кнопок при загрузке страницы
  $('.slick-arrow__name_next').text(textNameNext);

  slickBtn.on('click', function () {
    const item = $(this);

    if (item.hasClass('slick-next')) {
      // если кнопка = "следующий слайд", прибавляем +1 к индексу
      NUMBER_PREV += 1;
      NUMBER_NEXT += 1;
      // если индексы больше длины массива, обнуляем индекс
      if (NUMBER_NEXT === titleLength) {
        NUMBER_NEXT = 0;
      }
      if (NUMBER_PREV === titleLength) {
        NUMBER_PREV = 0;
      }
      // функция изминение текста кнопок
      changeButtonText(NUMBER_PREV, NUMBER_NEXT);
    } else {
      // если кнопка = "предыдущий слайд", отнимаем -1 от индекса
      NUMBER_PREV -= 1;
      NUMBER_NEXT -= 1;
      // если индексы меньше 0, возвращаем начальное значение
      if (NUMBER_PREV < 0) {
        NUMBER_PREV = titleLength - 1;
      }
      if (NUMBER_NEXT < 0) {
        NUMBER_NEXT = titleLength - 1;
      }
      // функция изминение текста кнопок
      changeButtonText(NUMBER_PREV, NUMBER_NEXT);
    }

    function changeButtonText(NUMBER_PREV, NUMBER_NEXT) {
      item.attr('disabled', ''); // убираем возможность повторного клика до смены слайда
      let nextText = $(titleArr[NUMBER_NEXT]).text();
      $('.slick-arrow__name_next').text(nextText);

      let prevText = $(titleArr[NUMBER_PREV]).text();
      $('.slick-arrow__name_prev').text(prevText);
      $('.slider').on('afterChange', function () {
        item.removeAttr('disabled'); // после события смены слайда - возвращаем кликабельность кнопке
      });
    }
  });
};
