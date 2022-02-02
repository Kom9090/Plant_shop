import $ from 'jquery';
import { helperInfo } from './helperInfo.js';
export function deleteProduct() {
  const cartBody = $('.modal-cart__list');

  cartBody.on('click', function (e) {
    if ($(e.target).hasClass('cart-item__delete')) {
      let item = $(e.target);
      let deleteId = item.parent().data('id');
      item.parent().parent().remove();

      let totallAll = $(document).find('.total__price');
      let thisPrice = item
        .parent()
        .find('.cart-item__total-price')
        .text(function (index, text) {
          return text.replace('$', '');
        })
        .text();
      totallAll.text(String(Number(totallAll.text()) - Number(thisPrice)));

      helperInfo();
      let cartNumber = $('.cart-item').length;
      if (cartNumber === 0) {
        $('.total').replaceWith(`<p class="modal-cart__empty">Your cart is empty</p>`);
      }

      $('._add-to-cart').each(function () {
        let goodItem = $(this).parent().parent().data('id');
        if (deleteId === goodItem) {
          $(this).removeClass('_hold');
          return;
        }
      });
    }
  });
}
