export const platform = 'Optimizely';
export { SHARED } from 'oli/shared-global';
export const utils = (window.CRO_PJS && window.CRO_PJS.utils) || window.optimizely.get('utils');
export const log = (utils.log && utils.log.bind(window, `[${TAG}]`)) || console.warn.bind(window, `[cro] [${TAG}]`);
export const error = (utils.error && utils.error.bind(window, TAG)) || console.error.bind(window, `[cro] [${TAG}]`);
export const init = (variation, page, el = document.documentElement) => {
  el.classList.add(TAG);
  el.classList.add(TAG + variation);
  log(`Variation ${variation}, page ${page}`);
};
export { sendEvent } from 'cromedics/optimizely/events';
