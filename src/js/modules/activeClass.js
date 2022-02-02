import $ from 'jquery';

export const getActiveClass = (class1, class2) => {
  $(class1).on('click', () => {
    $(class2).toggleClass('_active');
  });
  $(document).on('click', (e) => {
    if ($(e.target).closest(class1).length === 0) {
      $(class2).removeClass('_active');
    }
  });
};
