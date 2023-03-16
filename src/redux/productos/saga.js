/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  getStorage,
  ref,
  uploadString,
  // eslint-disable-next-line no-unused-vars
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
// eslint-disable-next-line no-unused-vars
import { doc, setDoc, collection, deleteDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
// import { getDateWithFormat } from '../../helpers/Utils';
import { database } from '../../helpers/Firebase';
import { PRODUCTO_ADD, PRODUCTO_UPDATE, PRODUCTO_DELETE } from '../actions';
import { addProductoSuccess } from './actions';

// ********** DELETE PRODCUTO ***********
function deleteProductoFirestore(idProducto) {
  return deleteDoc(doc(database, 'productos', idProducto));
}
function* deleteProductoItem(payload) {
  const { idProducto, fullPath } = payload.payload;
  try {
    yield call(deleteProductoFirestore, idProducto);
    // Create a reference to the file to delete
    const deleteRef = ref(getStorage(), fullPath);
    // Delete the file
    deleteObject(deleteRef);
  } catch (error) {
    console.log(error);
  }
}
export function* watchDeleteProducto() {
  yield takeEvery(PRODUCTO_DELETE, deleteProductoItem);
}

// ************ UPDATE PRODUCTO *************************
function updateProductoFirestore(idProducto, data) {
  return setDoc(doc(database, 'productos', idProducto), data);
}

function* updateProductoItem(payload) {
  const idProducto = payload.payload.id;
  const producto = payload.payload.data;
  try {
    yield call(updateProductoFirestore, idProducto, producto);
  } catch (error) {
    console.log('error');
    console.log(error);
  }
}
export function* watchUpdateProducto() {
  yield takeLatest(PRODUCTO_UPDATE, updateProductoItem);
}
// *******************************************************
// ************* ADD PRODUCTO *******************
function addImagen(storageRef, imageBase64) {
  return uploadString(storageRef, imageBase64, 'data_url');
}
function getUrl(storageRef) {
  return getDownloadURL(storageRef);
}
function addProductoFirestore(nuevoProductoRef, producto) {
  return setDoc(nuevoProductoRef, producto);
}

function* addProductoItem(payload) {
  const { producto, imageBase64, toggleModal, resetForm, resetImage } =
    payload.payload;

  try {
    const storage = getStorage();
    const imageId = v4();
    const storageRef = ref(storage, `productos/${imageId}`);
    const imagenResponse = yield call(addImagen, storageRef, imageBase64);
    const { fullPath } = imagenResponse.metadata;
    const imageStorageActual = ref(storage, imagenResponse.metadata.fullPath);
    const urlImage = yield call(getUrl, imageStorageActual);

    // Ahora debemos añadir un documento
    const docData = {
      nombre: producto.nombre,
      refLocalComercial: producto.refLocalComercial,
      refCategoria: producto.refCategoria,
      refImagen: urlImage,
      fullPath,
      habilitado: false,
      precio: 29900,
    };
    const nuevoProductoRef = doc(collection(database, 'productos'));
    // eslint-disable-next-line no-unused-vars
    const responseAddCategoria = yield call(
      addProductoFirestore,
      nuevoProductoRef,
      docData
    );

    resetForm();
    resetImage();
    toggleModal();
    yield put(addProductoSuccess());
  } catch (error) {
    console.log('error');
    console.log(error);
    // yield put(getCategoriaListError(error));
  }
}

export function* watchAddProducto() {
  yield takeLatest(PRODUCTO_ADD, addProductoItem);
}
// *************** FORKEANDO LOS OYENTES ******************
export default function* rootSaga() {
  yield all([
    fork(watchAddProducto),
    fork(watchUpdateProducto),
    fork(watchDeleteProducto),
  ]);
}
