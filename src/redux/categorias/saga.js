import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
  delay,
} from 'redux-saga/effects';
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  query,
  getDocs,
  where,
} from 'firebase/firestore';
import { v4 } from 'uuid';
import { database } from '../../helpers/Firebase';
import {
  CATEGORIA_ADD,
  CATEGORIA_DELETE,
  CATEGORIA_UPDATE,
  MOSTRAR_PRODUCTOS_CATEGORIA,
  MOSTRAR_PRODUCTOS_CATEGORIA_SUCCESS,
  CATEGORIA_DELETE_GROUP,
} from '../actions';
import { deleteProductoItem } from '../productos/actions';
import { addCategoriaSuccess } from './actions';

// *********** ADD CATEGORIA *************
function getUrl(storageRef) {
  return getDownloadURL(storageRef);
}
function addImagen(storageRef, imageBase64) {
  return uploadString(storageRef, imageBase64, 'data_url');
}
function addCategoriaFirestore(nuevaCategoriaRef, categoria) {
  return setDoc(nuevaCategoriaRef, categoria);
}
function* addCategoriaItem(payload) {
  const {
    // eslint-disable-next-line no-unused-vars
    categoria,
    imageBase64,
    resetImage,
    resetForm,
    toggleModal,
  } = payload.payload;

  try {
    const storage = getStorage();
    const imageId = v4();
    const storageRef = ref(storage, `categorias/${imageId}`);
    const imagenResponse = yield call(addImagen, storageRef, imageBase64);
    const { fullPath } = imagenResponse.metadata;
    const imageStorageActual = ref(storage, imagenResponse.metadata.fullPath);
    const urlImage = yield call(getUrl, imageStorageActual);

    // Ahora debemos añadir un documento
    const docData = {
      nombre: categoria.nombre,
      refLocalComercial: categoria.refLocalComercial,
      refImagen: urlImage,
      fullPath,
      habilitado: false,
      cantidadProductos: 0,
    };
    const nuevaCategoriaRef = doc(collection(database, 'categorias'));
    // eslint-disable-next-line no-unused-vars
    const responseAddCategoria = yield call(
      addCategoriaFirestore,
      nuevaCategoriaRef,
      docData
    );
    resetForm();
    resetImage();
    toggleModal();
    yield put(addCategoriaSuccess());
  } catch (error) {
    console.log('error');
    console.log(error);
    // yield put(getCategoriaListError(error));
  }
}
export function* watchAddCategoria() {
  yield takeLatest(CATEGORIA_ADD, addCategoriaItem);
}

// ********* DELETE CATEGORIA *************
function querySnapshot(q) {
  return getDocs(q);
}

function deleteCategoriaFirestore(idCategoria) {
  return deleteDoc(doc(database, 'categorias', idCategoria));
}

function* deleteCategoriaItem(payload) {
  const idCategoria = payload.payload.id;
  const fullPathCategoria = payload.payload.fullPath;
  const { setSelectedItems } = payload.payload;

  try {
    // BUSCAR TODOS LOS PRODUCTOS DE LA CATEGORIA
    const q = query(
      collection(database, 'productos'),
      where('refCategoria', '==', idCategoria)
    );
    // eslint-disable-next-line no-unused-vars
    const productosCategoria = [];
    const snapShot = yield call(querySnapshot, q);
    snapShot.forEach((producto) => {
      const idProducto = producto.id;
      const { fullPath } = producto.data();
      productosCategoria.push({ idProducto, fullPath });
    });
    // HACER UN BUCLE Y ELIMINAR CADA PRODUCTO
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < productosCategoria.length; i++) {
      yield put(
        deleteProductoItem(
          productosCategoria[i].idProducto,
          productosCategoria[i].fullPath
        )
      );
      yield delay(1000);
    }
    // COMO ULTIMO SE DEBE ELIMINAR LA CATEGORIA DESDE FIRESTORE
    yield call(deleteCategoriaFirestore, idCategoria);
    // SE DEBE ELIMINAR LA FOTO DE LA CATEGORIA
    // Create a reference to the file to delete
    const deleteRef = ref(getStorage(), fullPathCategoria);
    // Delete the file
    deleteObject(deleteRef);
    // Dejamos los items seleccionados como vacio.
    setSelectedItems([]);
  } catch (error) {
    console.log('error');
    console.log(error);
  }
}
export function* watchDeleteCategoria() {
  yield takeEvery(CATEGORIA_DELETE, deleteCategoriaItem);
}
// *********** UPDATE CATEGORIA ***********
function updateCategoriaFirestore(idCategoria, data) {
  return setDoc(doc(database, 'categorias', idCategoria), data);
}

function* updateCategoriaItem(payload) {
  const idCategoria = payload.payload.id;
  const categoria = payload.payload.data;
  try {
    yield call(updateCategoriaFirestore, idCategoria, categoria);
    console.log('Updateada correctamente');
  } catch (error) {
    console.log('error');
    console.log(error);
  }
}
export function* watchUpdateCategoria() {
  yield takeLatest(CATEGORIA_UPDATE, updateCategoriaItem);
}
// ******** MOSTRAR PRODUCTOS CATEGORIA *************
function* mostrarProductosCategoria(payload) {
  const { idCategoria, nombre, path, history } = payload.payload;
  try {
    const actionPut = {
      type: MOSTRAR_PRODUCTOS_CATEGORIA_SUCCESS,
      payload: {
        idCategoria,
        nombre,
      },
    };
    yield put(actionPut);
    history.push(path);
  } catch (error) {
    console.log('error');
    console.log(error);
  }
}
export function* watchMostrarProductosCategoria() {
  yield takeLatest(MOSTRAR_PRODUCTOS_CATEGORIA, mostrarProductosCategoria);
}
// *********** DELETE A GROUP CATEGORIA ***************
function* categoriaDeleteGroup(payload) {
  const { list, setIsLoaded, setSelectedItems } = payload.payload;
  try {
    setIsLoaded(false);
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const i in list) {
      console.log(`Eliminando categoria${list[i].id}`);
      const idCategoria = list[i].id;
      const fullPathCategoria = list[i].data.fullPath;
      // BUSCAR TODOS LOS PRODUCTOS DE LA CATEGORIA
      const q = query(
        collection(database, 'productos'),
        where('refCategoria', '==', idCategoria)
      );
      // eslint-disable-next-line no-unused-vars
      const productosCategoria = [];
      const snapShot = yield call(querySnapshot, q);
      snapShot.forEach((producto) => {
        const idProducto = producto.id;
        const { fullPath } = producto.data();
        productosCategoria.push({ idProducto, fullPath });
      });
      // HACER UN BUCLE Y ELIMINAR CADA PRODUCTO
      // eslint-disable-next-line no-plusplus
      for (let a = 0; a < productosCategoria.length; a++) {
        console.log(
          `Eliminando el producto ${productosCategoria[a].idProducto}`
        );
        yield put(
          deleteProductoItem(
            productosCategoria[a].idProducto,
            productosCategoria[a].fullPath
          )
        );
        yield delay(1000);
      }
      // COMO ULTIMO SE DEBE ELIMINAR LA CATEGORIA DESDE FIRESTORE
      yield call(deleteCategoriaFirestore, idCategoria);
      // SE DEBE ELIMINAR LA FOTO DE LA CATEGORIA
      // CREAMOS LA REFERENCIA AL STORE
      const deleteRef = ref(getStorage(), fullPathCategoria);
      // BORRAMOS LA IMAGEN DEL STORE
      deleteObject(deleteRef);
      yield delay(1000);
    }
    setIsLoaded(true);
    setSelectedItems([]);
  } catch (error) {
    console.log('error');
    console.log(error);
  }
}
export function* watchDeleteGroupCategoria() {
  yield takeLatest(CATEGORIA_DELETE_GROUP, categoriaDeleteGroup);
}

export default function* rootSaga() {
  yield all([
    fork(watchAddCategoria),
    fork(watchDeleteCategoria),
    fork(watchUpdateCategoria),
    fork(watchMostrarProductosCategoria),
    fork(watchDeleteGroupCategoria),
  ]);
}
