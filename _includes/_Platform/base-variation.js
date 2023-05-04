export { SHARED } from 'oli/shared-global';
const utils = window.optimizely.get('utils');
export const error = utils.error && utils.error.bind(window, TAG) || console.error.bind(window, `[cro] [${TAG}]`);
