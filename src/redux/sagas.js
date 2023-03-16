import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import todoSagas from './todo/saga';
import categoriasSagas from './categorias/saga';
import productosSagas from './productos/saga';

export default function* rootSaga() {
  yield all([authSagas(), todoSagas(), categoriasSagas(), productosSagas()]);
}
