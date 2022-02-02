export const isWebp = () => {
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = () => {
      callback(webP.height === 2);
    };
    webP.onerror = webP.onload;
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  // eslint-disable-next-line func-names
  testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
};
