import publicControllers from './public';
import privateControllers from './private';

export const controllers = {
  ...publicControllers,
  ...privateControllers
}

export default controllers;