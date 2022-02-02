/* eslint-disable no-undef */
import del from 'del';
export const clear = () => {
  return del(app.path.clean);
};
