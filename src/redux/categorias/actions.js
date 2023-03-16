// eslint-disable-next-line import/no-cycle
import {
  CATEGORIA_ADD,
  CATEGORIA_UPDATE,
  CATEGORIA_DELETE,
  CATEGORIA_ADD_SUCCESS,
  MOSTRAR_PRODUCTOS_CATEGORIA,
  CATEGORIA_DELETE_GROUP,
} from '../actions';

export const mostrarProductosCategoria = (
  nombre,
  idCategoria,
  history,
  path
) => ({
  type: MOSTRAR_PRODUCTOS_CATEGORIA,
  payload: {
    nombre,
    idCategoria,
    history,
    path,
  },
});

export const addCategoriaItem = (
  categoria,
  imageBase64,
  toggleModal,
  resetForm,
  resetImage
) => ({
  type: CATEGORIA_ADD,
  payload: {
    categoria,
    imageBase64,
    toggleModal,
    resetForm,
    resetImage,
  },
});

export const addCategoriaSuccess = () => ({
  type: CATEGORIA_ADD_SUCCESS,
});

export const updateCategoriaItem = (categoria) => ({
  type: CATEGORIA_UPDATE,
  payload: categoria,
});

export const deleteCategoria = (
  id,
  fullPath,
  setSelectedItems,
  setIsLoaded
) => ({
  type: CATEGORIA_DELETE,
  payload: { id, fullPath, setSelectedItems, setIsLoaded },
});

export const deleteGroupCategoria = (list, setIsLoaded, setSelectedItems) => ({
  type: CATEGORIA_DELETE_GROUP,
  payload: {
    list,
    setSelectedItems,
    setIsLoaded,
  },
});
