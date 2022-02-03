/* eslint-disable indent */
import $ from 'jquery';
export const modal = () => {
  const modalClose = $('[data-close]');

  $('[data-popup]').on('click', function (e) {
    e.preventDefault();
    let item = $(this);

    let modalId = item.data('popup');
    const lockPaddingValue = $(window).outerWidth() - $('.content').outerWidth();
    $('.popup._open').removeClass('_open');
    $(modalId).addClass('_open');
    $('body').addClass('_lock').css('padding-right', lockPaddingValue);
    $('.header').css('padding-right', lockPaddingValue);

    setTimeout(function () {
      $(modalId).find('.popup__content').css('opacity', 1);
    }, 200);
    if (modalId === '#searchModal') {
      $('.search-form__input').focus();
    } else if (modalId === '#signIn') {
      $('#email_signIn').focus();
    } else if (modalId === '#signUp') {
      $('#name').focus();
    }

    if (e.target.closest('.slide-info__link')) {
      $('.modal-product__body').html('');
      $('.modal-product__title').html(
        `${$(e.target).parent().parent().find('.slide-info__title').text()}`
      );
      let div = $('<div class="modal-product__item">');
      div.html(` 
      <div class="modal-product__img-wrapper">
        <picture>
          <source srcset="${$(e.target)
            .parent()
            .parent()
            .parent()
            .find('.top-img__img')
            .attr('src')
            .replace('jpg', 'webp')}" media="(max-width: 0px)" type="image/webp" />
          <img
            class="modal-product__img"
            src="${$(e.target).parent().parent().parent().find('.top-img__img').attr('src')}"
            alt="plant"
            loading="lazy"
            width="300"
            height="300"
          />
        </picture>
      </div>
      <div class="modal-product__info">
        <p class="modal-product__text">
          ${$(e.target).parent().parent().find('.slide-info__text').text()}
        </p>
        <span class="modal-product__price"
          >Price: <span class="modal-product__number">${$(e.target)
            .parent()
            .find('.slide-info__price')
            .text()}</span></span
        >
        <button class="modal-product__btn _main-button _add-to-cart" type="button">Add to cart</button>
      </div>
      `);
      $('.modal-product__body').append(div);
    }
  });

  $(document).on('click', function (e) {
    if (e.target.closest('._product-popup')) {
      e.preventDefault();
      let item = $(e.target);
      const lockPaddingValue = $(window).outerWidth() - $('.content').outerWidth();
      $('.popup._open').removeClass('_open');
      $('#product').addClass('_open');
      $('body').addClass('_lock').css('padding-right', lockPaddingValue);
      $('.header').css('padding-right', lockPaddingValue);
      setTimeout(function () {
        $('#product').find('.popup__content').css('opacity', 1);
      }, 200);
      let itemId = item.hasClass('modal-search__link')
        ? item.data('id')
        : item.parent().parent().data('id').replace(/\D/g, '');
      $.ajax('./files/json/goods.json', {
        success: function (data) {
          const products = data.products;
          $('.modal-product__body').html('');
          $('.modal-product__title').html(`${products[itemId].title}`);
          let div = $('<div class="modal-product__item">');
          div.html(`
          <div class="modal-product__img-wrapper">
              <picture>
                <source srcset="${products[itemId].src.replace(
                  'jpg',
                  'webp'
                )}" media="(max-width: 0px)" type="image/webp" />
                <img
                    class="modal-product__img"
                    src="${products[itemId].src}"
                    alt="plant"
                    loading="lazy"
                    width="300"
                    height="300"
                  />
              </picture>
            </div>
            <div class="modal-product__info">
                <p class="modal-product__text">
                  ${products[itemId].description}
                </p>
                <span class="modal-product__price"
                  >Price: <span class="modal-product__number">${
                    products[itemId].price
                  }$</span></span
                >
                <button class="modal-product__btn _main-button _add-to-cart" type="button">Add to cart</button>
            </div>
          `);
          $('.modal-product__body').append(div);
        }
      });
    }
  });

  modalClose.on('click', function (e) {
    e.preventDefault();

    let item = $(this);
    let modalParent = item.parents('.popup');

    modalParent.find('.popup__content').css('opacity', 0);

    setTimeout(function () {
      modalParent.removeClass('_open');
      $('body').removeClass('_lock').css('padding-right', 0);
      $('.header').css('padding-right', 0);
    }, 200);
  });

  $('.popup').on('click', function (e) {
    if (!e.target.closest('.popup__content') && !e.target.closest('.cart-item__delete')) {
      let item = $(this);
      item.find('.popup__content').css('opacity', 0);

      setTimeout(function () {
        item.removeClass('_open');
        $('body').removeClass('_lock').css('padding-right', 0);
        $('.header').css('padding-right', 0);
      }, 200);
    }
  });
};
