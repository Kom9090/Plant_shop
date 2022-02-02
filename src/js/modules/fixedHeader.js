import $ from 'jquery';

export const fixedHeader = () => {
  $(window).on('scroll', () => {
    const header = $('.header');
    const top = $('.top').outerHeight() / 2;

    const scrollDistance = $(window).scrollTop();

    if (scrollDistance >= top) {
      header.addClass('_scrolling');
    } else {
      header.removeClass('_scrolling');
    }
  });
};
