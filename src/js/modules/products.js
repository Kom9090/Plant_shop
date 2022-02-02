/* eslint-disable indent */
import $ from 'jquery';
function sortType(arr, type) {
  if (type === 'title') {
    arr.sort((a, b) => (a.title > b.title ? 1 : -1));
  } else if (type === 'price') {
    arr.sort((a, b) => (a.price > b.price ? 1 : -1));
  } else if (type === 'reverse') {
    arr.sort((a, b) => (b.price > a.price ? 1 : -1));
  }
}

function renderCards(arr, part, type) {
  sortType(arr, type);
  const goodsList = document.querySelector('.goods__list');
  goodsList.innerHTML = '';
  for (let i = part; i < part + 20; i += 1) {
    if (arr[i]) {
      let li = document.createElement('li');
      li.className = 'goods__product product';
      li.innerHTML = `
        <article class="product__article" data-id="product${arr[i].id}">
          <div class="product__img-wrapper">
              <picture>
                  <source srcset="${arr[i].src.replace(
                    'jpg',
                    'webp'
                  )}" media="(max-width: 0px)" type="image/webp">
                  <img class="product__img" src="${
                    arr[i].src
                  }" alt="kaktus" loading="lazy" width="216.2" height="213">
              </picture> 
          </div>
          <h3 class="product__title">
              <a href="#" class="product__link _product-popup" data-popup="#product">
                ${arr[i].title}
              </a>
          </h3>
          <span class="product__price">${arr[i].price}$</span>
          <button class="product__btn _add-to-cart _main-button" type="button">Add to cart</button>
        </article>
      `;
      goodsList.append(li);
    }
  }
}

function paginationLoad(arr) {
  const pagination = $('.pagination');
  let len = arr.length / 20;
  if (len > 3) {
    len = 6;
  } else if (Math.round(len) === 3) {
    len = 5;
  } else if (Math.round(len) === 2) {
    len = 4;
  } else {
    len = 0;
  }
  pagination.innerHTML = '';
  for (let i = 0; i < len; i += 1) {
    let value = '';
    let classN = '';
    if (i === 0 && len !== 0) {
      value = 'Prev';
      classN = 'prev';
    } else if (i === 4 && len > 5) {
      value = '...';
    } else if (i === 5 || i === 4) {
      value = 'Next';
      classN = 'next';
    } else if (i !== 0) {
      value = i;
      classN = 'part';
    }
    let paginationBtn = document.createElement('button');
    paginationBtn.className = `pagination__button ${classN}`;
    paginationBtn.innerHTML = `${value}`;
    pagination.append(paginationBtn);
  }
}

function paginationChange(part, arr) {
  if (part < 20) {
    $('.prev').attr('disabled', '');
  } else {
    $('.prev').removeAttr('disabled');
  }
  if (part === arr.length - (arr.length % 20)) {
    $('.next').attr('disabled', '');
  } else {
    $('.next').removeAttr('disabled');
  }
}

export const products = () => {
  $(function () {
    $.ajax('./files/json/goods.json', {
      success: function (data) {
        let part = 0;
        let type = 'title';
        const products = JSON.parse(JSON.stringify(data.products));
        renderCards(products, part, type);
        paginationLoad(products);
        const pagination = $('.pagination');
        const select = $('.goods__select');
        pagination.on('click', function (e) {
          if (e.target.closest('.prev')) {
            part -= 20;
            console.log(type);
            renderCards(products, part, type);
            paginationChange(part, products);
          } else if (e.target.closest('.next')) {
            part += 20;
            renderCards(products, part, type);
            paginationChange(part, products);
          } else if (e.target.closest('.part')) {
            part = +e.target.textContent * 20 - 20;
            renderCards(products, part, type);
            paginationChange(part, products);
          }
        });
        select.on('change', function () {
          if (select.find(':selected').val() === 'Alphabet') {
            type = 'title';
            renderCards(products, part, type);
          } else if (select.find(':selected').val() === 'Cheaper first') {
            type = 'price';
            renderCards(products, part, type);
          } else if (select.find(':selected').val() === 'Rich first') {
            type = 'reverse';
            renderCards(products, part, type);
          }
        });
      }
    });
  });
};
