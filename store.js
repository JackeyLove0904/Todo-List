import reducers from './reducers.js';
import { createStore } from './core.js';

import logger from './logger.js';

const { attach, connect, dispatch } = createStore(logger(reducers));
window.dispatch = dispatch;
export { attach, connect };
