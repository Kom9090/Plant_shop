import $ from 'jquery';
export function helperInfo() {
  const cartLabel = $('.cart__label');
  let cartNumber = $('.cart-item').length;
  $('.cart__label').text(cartNumber);
  $('.cart__label').text(cartNumber).css('display', 'flex');
  $('#tooltip-3').text('in cart ' + cartNumber + ' product(s)');
  if (cartNumber === 0) {
    cartLabel.css('display', 'none');
    $('#tooltip-3').text('cart');
    $('.total').replaceWith(`<p class="modal-cart__empty">Your cart is empty</p>`);
  }
}
