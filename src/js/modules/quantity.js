import $ from 'jquery';
export const quantity = () => {
  $(function () {
    const modalCart = $('.modal-cart__list'); //находим родителя блока кнопок
    const MAX_PRODUCTS = 10; //устанавливаем ограничение на максимальное колличество товаров

    modalCart.on('input', function (e) {
      if ($(e.target).closest('.quantity__input').length === 1) {
        //отлавливаем события при потери фокуса поля ввода

        let item = $(e.target);

        item.val(function (index, value) {
          return value.replace(/\D/g, ''); //запрещаем вводить символы кроме целых цифр
        });

        let priceInitial = item.parent().parent().parent().find('.cart-item__price').clone(true); //клонируем значение цены товара
        let priceTotal = item.parent().parent().parent().find('.cart-item__total-price');

        if (item.val() < 2) {
          hideMinus(item);
          showPlus(item);
          priceTotal.text(priceInitial.text());
          getTotalPrice();
        } else if (item.val() >= MAX_PRODUCTS) {
          item.val('10');
          hidePlus(item);
          showMinus(item);
          let priceInitialNew = priceInitial.text(function (index, text) {
            return text.replace('$', '');
          });
          priceTotal.text(String(Number(priceInitialNew.text()) * MAX_PRODUCTS) + '$');
          getTotalPrice();
        } else {
          showMinus(item);
          showPlus(item);
          let priceInitialNew = priceInitial.text(function (index, text) {
            return text.replace('$', '');
          });
          priceTotal.text(String(Number(priceInitialNew.text()) * item.val()) + '$');
          getTotalPrice();
        }
      }
    });
    modalCart.on('focusout', function (e) {
      if ($(e.target).closest('.quantity__input').length === 1) {
        //отлавливаем события при потери фокуса поля ввода

        let item = $(e.target);

        let priceInitial = item.parent().parent().parent().find('.cart-item__price').clone(true); //клонируем значение цены товара
        let priceTotal = item.parent().parent().parent().find('.cart-item__total-price');

        if (item.val() === '' || item.val() < 2) {
          item.val('1');
          hideMinus(item);
          showPlus(item);
          priceTotal.text(priceInitial.text());
          getTotalPrice();
        }
      }
    });
    modalCart.on('click', function (e) {
      if ($(e.target).closest('.quantity__plus').length === 1) {
        let item = $(e.target);
        let priceTotal = item.parent().parent().find('.cart-item__total-price');
        let priceInitial = item.parent().parent().find('.cart-item__price').clone(true);
        let priceInitialNew = priceInitial.text(function (index, text) {
          return text.replace('$', '');
        });
        let input = item.prev().children();
        item.parent().find('.quantity__minus').removeClass('_no-active').removeAttr('tabindex');
        input[0].stepUp();
        if (Number(input.val()) === MAX_PRODUCTS) {
          item.addClass('_no-active').attr('tabindex', '-1').blur();
        }

        priceTotal.text(String(Number(input.val()) * Number(priceInitialNew.text())) + '$');
        getTotalPrice();
      } else if ($(e.target).closest('.quantity__minus').length === 1) {
        let item = $(e.target);
        let priceTotal = item.parent().parent().find('.cart-item__total-price');
        let priceInitial = item.parent().parent().find('.cart-item__price').clone(true);
        let priceInitialNew = priceInitial.text(function (index, text) {
          return text.replace('$', '');
        });
        let input = item.next().children();
        item.parent().find('.quantity__plus').removeClass('_no-active').removeAttr('tabindex');
        input[0].stepDown();
        if (Number(input.val()) === 1) {
          item.addClass('_no-active').attr('tabindex', '-1').blur();
        }

        priceTotal.text(String(Number(input.val()) * Number(priceInitialNew.text())) + '$');
        getTotalPrice();
      }
    });

    function getTotalPrice() {
      let totallAll = $(document).find('.total__price');
      let inputValue = $(document).find('.cart-item__total-price').clone(true);
      let inputValueNew = inputValue.text(function (index, text) {
        return text.replace('$', '');
      });
      totallAll.text('0');
      inputValueNew.each(function () {
        totallAll.text(Number(totallAll.text()) + Number($(this).text()));
      });
    }
    function hideMinus(item) {
      item.parent().prev().addClass('_no-active').attr('tabindex', '-1').blur();
    }
    function hidePlus(item) {
      item.parent().next().addClass('_no-active').attr('tabindex', '-1').blur();
    }
    function showMinus(item) {
      item.parent().prev().removeClass('_no-active').removeAttr('tabindex');
    }
    function showPlus(item) {
      item.parent().next().removeClass('_no-active').removeAttr('tabindex');
    }
  });
};
