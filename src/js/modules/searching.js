/* eslint-disable func-names */
import $ from 'jquery';

export const searching = () => {
  $('.search-form__input').on('input', function () {
    let valueI = $(this).val().trim();
    if (valueI.length > 2) {
      $.ajax('./files/json/goods.json', {
        success: function (data) {
          const products = data.products;
          for (let i = 0; i < products.length; i += 1) {
            if (products[i].title.search(RegExp(valueI, 'gi')) !== -1) {
              if ($(`#result${products[i].id}`)) {
                $(`#result${products[i].id}`).remove();
              }
              let li = $('<li class="modal-search__item">');
              li.html(`
                <a href="#" data-popup="#product" class="modal-search__link _product-popup" data-id="${products[i].id}" id="result${products[i].id}">${products[i].title}</a>
              `);
              $('.modal-search__list').append(li);
            }
          }
        }
      });
    } else {
      $('.modal-search__list').html('');
    }
  });
};
