import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import todoApp from './todo/reducer';
import categorias from './categorias/reducer';
import productos from './productos/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  todoApp,
  categorias,
  productos,
});

export default reducers;
