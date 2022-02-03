import $ from 'jquery';
import { helperInfo } from './helperInfo.js';

function renderProduct(src, name, price, id) {
  if ($('.modal-cart__empty').text() !== '') {
    $('.modal-cart__empty').replaceWith(`
                    <div class="modal-cart__total-block total">
                        <p class="total__info">Total price: <span class="total__price"></span>$</p>
                        <button class="total__btn _main-button" type="button">Checkout</button>
                    </div>
                    `);
  }
  $('.modal-cart__list').append(
    `
                <li class="cart-item" data-id="${id}">
                    <div class="cart-item__img-wrapper">
                        <img class="cart-item__img" src="${src}" alt="kaktus">
                    </div>
                    <div class="cart-item__info">
                        <h3 class="cart-item__title">${name}</h3>
                        <span class="cart-item__price">${price}</span> 
                        <div class="cart-item__quantity quantity">
                            <button class="quantity__minus quantity__btn-n _no-active" type="button" tabindex="-1" aria-label="minus button">
                                <span class="quantity__icon-minus"></span>
                            </button>                                     
                            <label class="quantity__label" for="number" aria-label="Quantity">
                                <input class="quantity__input" type="number" name="number" id="number" placeholder="1" value="1">
                            </label>                                        
                            <button class="quantity__plus quantity__btn-n" type="button" aria-label="plus button">
                                <span class="quantity__icon-plus" ></span>
                            </button>
                        </div>
                        <button class="cart-item__delete" type="button">Delete from cart</button>
                        <span class="cart-item__total-price">${price}$</span>
                    </div>
                    
                </li>`
  );

  let totallAll = $('.total__price');
  totallAll.text(String(Number(totallAll.text()) + Number(price)));
}

function addToCart(item, id) {
  if (!item.hasClass('_hold')) {
    item.addClass('_hold');
    if (item.hasClass('slide-info__btn')) {
      const productName = item.parent().find('.slide-info__title').text();
      const productPrice = item
        .parent()
        .find('.slide-info__price')
        .clone(true)
        .text(function (index, text) {
          return text.replace('$', '');
        })
        .text();
      const productSrc = item.parent().parent().find('.top-img__img').attr('src');
      renderProduct(productSrc, productName, productPrice, id);
    } else if (item.hasClass('modal-product__btn')) {
      const productName = item
        .parent()
        .parent()
        .parent()
        .parent()
        .find('.modal-product__title')
        .text();
      const productPrice = item
        .parent()
        .find('.modal-product__number')
        .clone(true)
        .text(function (index, text) {
          return text.replace('$', '');
        })
        .text();
      const productSrc = item.parent().parent().find('.modal-product__img').attr('src');
      renderProduct(productSrc, productName, productPrice, id);
    } else {
      const productName = item.parent().find('.product__link').text();
      const productPrice = item
        .parent()
        .find('.product__price')
        .clone(true)
        .text(function (index, text) {
          return text.replace('$', '');
        })
        .text();
      const productSrc = item.parent().find('.product__img').attr('src');
      renderProduct(productSrc, productName, productPrice, id);
    }
    helperInfo();
  } else {
    console.log('quantity');
  }
}

export const addProduct = () => {
  $(document).on('click', function (e) {
    if (e.target.closest('._add-to-cart')) {
      let item = $(e.target);
      let productId = item.parent().data('id');
      addToCart(item, productId);
    }
  });
};
