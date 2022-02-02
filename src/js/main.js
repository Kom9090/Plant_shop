import $ from 'jquery';

import { isWebp } from './modules/isWebp.js';
isWebp();

import { isMobile } from './modules/isMobile.js';

import { getActiveClass } from './modules/activeClass.js';

getActiveClass('.header__person', '.header__sign-group');

import { sliders } from './modules/sliders.js';
sliders();

import { fixedHeader } from './modules/fixedHeader.js';
fixedHeader();

import { tooltips } from './modules/tooltips.js';
if (!isMobile()) {
  tooltips();
}

import { modal } from './modules/modal.js';
modal();

import { products } from './modules/products.js';
products();

import { addProduct } from './modules/addProduct.js';
addProduct();

import { deleteProduct } from './modules/deleteProduct.js';
deleteProduct();

import { quantity } from './modules/quantity.js';
quantity();

import { searching } from './modules/searching.js';
searching();

import { formValidation } from './modules/formValidation.js';
formValidation('signUp');
formValidation('signIn');
