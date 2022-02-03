export const showPassword = () => {
  const showBtn = document.querySelectorAll('.form__show-password');
  const passwordInputs = document.querySelectorAll('._password');
  passwordInputs.forEach((item) => {
    item.addEventListener('focus', () => {
      item.previousElementSibling.style.display = 'block';
    });
    item.addEventListener('blur', () => {
      if (item.value === '') {
        item.previousElementSibling.style.display = 'none';
      }
    });
  });
  showBtn.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('_show');
      const input = item.nextElementSibling;
      if (input.getAttribute('type') === 'password') {
        input.setAttribute('type', 'text');
      } else {
        input.setAttribute('type', 'password');
      }
    });
  });
};
