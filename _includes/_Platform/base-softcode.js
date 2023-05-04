import { log } from 'base-pjs';

export const init = (tag, variation, page, el = document.documentElement)=>{
  el.classList.add(tag);
  el.classList.add(tag+variation);
  log(`Variation ${variation}, page ${page}`);
};

const elStyle = document.createElement('style');
export const addCSS = (css)=>{
  elStyle.innerHTML = css;
  document.head.insertAdjacentElement('beforeend', elStyle);
};

