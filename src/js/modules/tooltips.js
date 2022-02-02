import $ from 'jquery';
export const tooltips = () => {
  $('._tt').on('mousemove', function (e) {
    $(this).children('._tt-content').show();
    $('._tt-content').css('top', e.clientY + 12).css('left', e.clientX + 12);
  }).on('mouseout', function () {
    $('._tt-content').hide();
  });
};
